<?php

use App\Models\User;
use Aws\CloudFront\UrlSigner;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

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
    $object->url = asset('/assets/img/default-dp.png');

    return $object;
}

function logActivity(?Model $causedBy, ?Model $performedOn, string $log): void
{
    if ($performedOn) {
        activity()
            ->causedBy($causedBy)
            ->performedOn($performedOn)
            ->log(__($log));
    } else {
        activity()
            ->causedBy($causedBy)
            ->log(__($log));
    }

}
