<?php

return [
    'mode' => env('ACTIVE_CAMPAIGN_MODE'),

    'base_url' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
        ? env('ACTIVE_CAMPAIGN_BASE_URL_LIVE')
        : env('ACTIVE_CAMPAIGN_BASE_URL_LOCAL'),

    'token' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
        ? env('ACTIVE_CAMPAIGN_TOKEN_LIVE')
        : env('ACTIVE_CAMPAIGN_TOKEN_LOCAL'),

    'fields' => [
        'GLITCH_NUMBER' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 38
            : 1,
        'TOP_3_INTEREST' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 39
            : 2,
        'DO_YOU_OWN_A_BUSINESS' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 40
            : 3,
        'WHAT_INDUSTRY' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 66
            : 4,
        'BIZ_ANNUAL_REVENUE' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 42
            : 5,
        'DISCORD_USERNAME' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 43
            : 6,
        'LAST_LOGIN_TIMING' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 44
            : 7,
    ],

    'tags' => [
        'CC-Yearly-Members' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 71
            : 1,
        'CC-Cancellations-Refunded' => env('ACTIVE_CAMPAIGN_MODE') == 'live'
            ? 73
            : 2,
    ]
];
