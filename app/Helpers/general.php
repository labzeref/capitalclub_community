<?php

use App\Models\User;
use Aws\CloudFront\UrlSigner;
use Illuminate\Contracts\Auth\Authenticatable;

/**
 * This files add in autoload and all this function is accessible everywhere in project
 */
function _user(): User|Authenticatable|null
{
    return auth()->user();
}

function _serverErrorMessage(): string
{
    return __('Something went wrong, Internal server error');
}

function _getSignedUrl($path): string
{
    $accessKey = config('cloudfront.key_pair_id');
    $secretKey = base_path(config('cloudfront.private_key_path'));
    $distributionUrl = config('cloudfront.url').'/'.$path;
    $cacheExpiry = config('cloudfront.expiry_time');
    $cloudFontExpiry = time() + $cacheExpiry;

    // Check if the signed URL is already cached
    $cacheKey = 'signed_url_'.$path;
    $signedUrl = Cache::get($cacheKey);

    if ($signedUrl) {
        return $signedUrl;
    }

    $signer = new UrlSigner($accessKey, $secretKey);
    $signedUrl = $signer->getSignedUrl($distributionUrl, $cloudFontExpiry);

    Cache::put($cacheKey, $signedUrl, $cacheExpiry);

    return $signedUrl;
}

function _defaultDp(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/assets/img/avatars/alian.png');

    return $object;
}

function _defaultDesktopImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/desktop-placeholder.png');

    return $object;
}

function _defaultDesktopMediumImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/desktop-medium-placeholder.png');

    return $object;
}

function _defaultDesktopSmallImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/desktop-small-placeholder.png');

    return $object;
}

function _defaultMobileImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/mobile-placeholder.png');

    return $object;
}

function _defaultMobileMediumImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/mobile-medium-placeholder.png');

    return $object;
}

function _defaultMobileSmallImage(): stdClass
{
    $object = new stdClass();
    $object->url = asset('/images/placeholders/mobile-small-placeholder.png');

    return $object;
}

function _getPageRemainingSeconds(): int
{
    $now = now();
    $upcoming = now()->setHour(15)->setMinute(0)->seconds(0);
    if ($upcoming < $now) {
        $upcoming = $upcoming->addDay();
    }

    return $now->diffInSeconds($upcoming, false);
}
