<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Discord keys
    |--------------------------------------------------------------------------
    |
    | These are the keys for discord
    */

    'clientId' => env('DISCORD_CLIENT_ID'),
    'clientSecret' => env('DISCORD_CLIENT_SECRET'),
    'serverId' => env('DISCORD_SERVER_ID'),
    'serverLink' => env('DISCORD_SERVER_LINK'),
    'defaultRoleId' => env('DISCORD_DEFAULT_ROLE_ID'),
    'guestRoleId' => env('DISCORD_GUEST_ROLE_ID'),
    'recurringRoleId' => env('DISCORD_RECURRING_ROLE_ID'),
    'botToken' => env('DISCORD_BOT_TOKEN'),
    'scopes' => ['identify', 'email', 'guilds.join'],
];
