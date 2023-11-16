<?php

return [
    'disk' => 's3',
    'size' => env('CHUNK_SIZE', 1) * 1024 * 1024,
    'path' => env('MEDIA_PREFIX').'/chunks',
];
