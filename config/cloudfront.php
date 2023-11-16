<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cloudfront keys
    |--------------------------------------------------------------------------
    |
    | These are the keys of cloudfront
    */

    'url' => env('AWS_CLOUDFRONT_URL', ''),
    'key_pair_id' => env('AWS_CLOUDFRONT_KEY_PAIR_ID', ''),
    'private_key_path' => env('AWS_CLOUDFRONT_KEY_PATH', ''),
    'expiry_time' => env('AWS_TEMP_SECONDS', 3600),
    'distribution_id' => env('AWS_CLOUDFRONT_DISTRIBUTION_ID'),
];
