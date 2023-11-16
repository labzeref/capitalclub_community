<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Recaptcha keys
    |--------------------------------------------------------------------------
    |
    | These are the keys for recaptcha
    */

    'key' => env('RECAPTCHA_SITE_KEY'),
    'key_v2' => env('RECAPTCHA_SITE_KEY_V2'),
    'score' => env('RECAPTCHA_SCORE'),
    'project' => env('RECAPTCHA_PROJECT'),
    'credentials' => base_path(env('RECAPTCHA_CREDENTIALS')),
];
