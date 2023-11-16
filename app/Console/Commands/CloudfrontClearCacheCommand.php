<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class CloudfrontClearCacheCommand extends Command
{
    protected $signature = 'cloudfront:clear-cache';

    protected $description = 'This will clear cloud front cache';

    public function handle(): void
    {
        $aws_access_key = config('filesystems.disks.s3.key');
        $aws_secret_key = config('filesystems.disks.s3.secret');
        $distributionId = config('cloudfront.distribution_id');
        $awsCredentials = "AWS_ACCESS_KEY_ID=$aws_access_key AWS_SECRET_ACCESS_KEY=$aws_secret_key";

        $command = "$awsCredentials aws cloudfront create-invalidation --distribution-id $distributionId --paths '/*'";

        $result = Process::run($command);

        if ($result->failed()) {
            $result->throw();
        }
    }
}
