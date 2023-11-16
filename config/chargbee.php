<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Chargebee api keys
    |--------------------------------------------------------------------------
    |
    | These are the keys of chargebee
    */

    'api_key' => env('CHARGEBEE_API_KEY'),
    'public_key' => env('CHARGEBEE_PUBLIC_KEY'),
    'site' => env('CHARGEBEE_SITE'),
    'plan_name' => env('CHARGEBEE_PLAN_NAME'),
    'yearly_item_price_id' => env('CHARGEBEE_YEARLY_ITEM_PRICE_ID'),
    'yearly_item_price' => env('CHARGEBEE_YEARLY_ITEM_PRICE'),
    'webhook_username' => env('CHARGEBEE_WEBHOOK_USERNAME'),
    'webhook_password' => env('CHARGEBEE_WEBHOOK_PASSWORD'),
    '3ds_secure' => env('CHARGEBEE_3D_SECURE', true),
];
