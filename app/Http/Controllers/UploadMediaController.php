<?php

namespace App\Http\Controllers;

use App\Models\Chunk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadMediaController extends Controller
{
    /**
     * If the file size is less than the chunk size so  file will be
     * received otherwise only request requested and file will not
     * receive, and we provide key on both cases
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function postUpload(Request $request)
    {
        $chunk = Chunk::create(['key' => Str::uuid()->toString()]);
        $file = $request->file('file');

        if ($file) {
            $path = $chunk->diskDirectory();
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            Storage::disk('s3')->putFileAs($path, $file, $fileName);

            $chunk->update([
                'extension' => $extension,
                'singular' => true,
            ]);
        }

        return response()->json($chunk->key);
    }

    /**
     * If file size is greater than chunk size so file will come here with
     * parameters, and we will save it on s3 in chunk key folder and
     * combine it will latter
     *
     * @return void
     */
    public function patchUpload(Request $request)
    {
        $chunkIndex = $request->header('upload-offset');
        $fileName = $request->header('upload-name');
        $key = $request->input('key');
        $content = $request->getContent();

        $extension = pathinfo($fileName, PATHINFO_EXTENSION);
        $fileName = $chunkIndex.'.'.$extension;
        $path = Chunk::baseDiskDirectory()."/$key/$fileName";

        Storage::disk('s3')->put($path, $content);

        /**
         * To execute query only first time to store file extension in chunk
         */
        if ($chunkIndex == 0) {
            Chunk::where('key', $key)->update(['extension' => $extension]);
        }
    }

    public function revert(Request $request)
    {
        //        $key = $request->getContent();
        //        Chunk::where('key', $key)->first()?->delete();
        //
        //        return response()->json("Deleted.");
    }
}
