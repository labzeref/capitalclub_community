<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Chunk extends Model
{
    protected $guarded = ['id'];

    /**
     * Delete all chunk file data along with delete of chunk
     */
    public static function boot(): void
    {
        parent::boot();

        static::deleting(function ($chunk) {
            $chunk->deleteS3Files();
            $chunk->deleteDownloadedFiles();
        });
    }

    public function deleteS3Files(): void
    {
        Storage::disk('s3')->deleteDirectory($this->diskDirectory());
    }

    public function deleteDownloadedFiles(): void
    {
        Storage::disk('local')->deleteDirectory($this->downloadDiskDirectory());
    }

    /**
     * This is the path specified for chunks file independent of disk, along with
     * spate media library prefix to keep project files in one place
     */
    public static function baseDiskDirectory(): string
    {
        return config('media-library.prefix').'/chunks';
    }

    /**
     * This is the disk path of chunk directory independent of disk
     */
    public function diskDirectory(): string
    {
        return self::baseDiskDirectory()."/$this->key";
    }

    /**
     * This is the chunk downloads disk directory in which folder chunked
     * files will be downloaded
     */
    public function downloadDiskDirectory(): string
    {
        return self::baseDiskDirectory()."/downloads/$this->key";
    }

    /**
     * This is the chunk downloads storage directory in which folder chunked
     * files will be downloaded, will be used for accessing files
     */
    public function workingStorageDirectory(): string
    {
        return storage_path('app/'.$this->downloadDiskDirectory());
    }

    /**
     * This is the disk path of file which is the combination of chunks
     */
    public function combineFileDiskPath(): string
    {
        return $this->downloadDiskDirectory().'/'.Str::uuid()->toString().'.'.$this->extension;
    }

    /**
     * This will download and combine all the chunks and will return
     * the storage path of that file
     */
    public function combineAndGetPath(): string
    {
        $bucket = config('filesystems.disks.s3.bucket');
        $aws_access_key = config('filesystems.disks.s3.key');
        $aws_secret_key = config('filesystems.disks.s3.secret');
        $awsCredentials = "AWS_ACCESS_KEY_ID=$aws_access_key AWS_SECRET_ACCESS_KEY=$aws_secret_key";

        $chunkDirectory = $this->diskDirectory();
        $workingStorageDirectory = $this->workingStorageDirectory();

        /**
         * Get all files path of chunks in array
         */
        $chunkFiles = Storage::disk('s3')->files($chunkDirectory);

        sort($chunkFiles);

        $combineFileDiskPath = $this->combineFileDiskPath();
        $combineFileStoragePath = storage_path("app/$combineFileDiskPath");

        $this->update(['combined_filename' => basename($combineFileDiskPath)]);

        /**
         * Doing this because it will make file for first time even it is not exist
         */
        Storage::disk('local')->append($combineFileDiskPath, '');
        $mergedFileContent = fopen($combineFileStoragePath, 'ab');

        foreach ($chunkFiles as $chunkFile) {
            $localFilePath = $workingStorageDirectory.'/'.basename($chunkFile);

            /**
             * Download the chunk file from s3 by aws cli sdk
             */
            $command = "$awsCredentials aws s3 cp s3://$bucket/$chunkFile $localFilePath";
            $result = Process::run($command);

            if ($result->successful()) {
                $content = fopen($localFilePath, 'rb');

                while (! feof($content)) {
                    fwrite($mergedFileContent, fread($content, '8192'));
                }

                fclose($content);

                /**
                 * Deleting the merged chunk
                 */
                unlink($localFilePath);
            } else {
                fclose($mergedFileContent);
                $result->throw();
            }
        }

        fclose($mergedFileContent);

        $this->update(['combined' => true]);

        return $combineFileStoragePath;
    }
}
