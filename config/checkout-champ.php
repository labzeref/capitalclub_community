<?php

return [

    'funnel_url' => env('CHECKOUT_FUNNEL_URL', ''),
    'base_url' => env('CHECKOUT_CHAMP_BASE_URL', 'https://api.checkoutchamp.com'),
    'login_id' => env('CHECKOUT_CHAMP_LOGIN_ID', 'membersApi'),
    'password' => env('CHECKOUT_CHAMP_PASSWORD', '8JXApZ$QCt4sLR5tkYpm'),
    'ip_address' => env('CHECKOUT_CHAMP_IP_ADDRESS', '172.71.135.3'),
    'subscription_campaign_id' => env('CHECKOUT_CHAMP_SUBSCRIPTION_CAMPAIGN_ID', 3),
];
