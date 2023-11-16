<?php

namespace App\Services;

use Spatie\ResponseCache\Hasher\DefaultHasher;
use Illuminate\Http\Request;
class InertiaHasher extends DefaultHasher
{
    public function getHashFor(Request $request): string
    {
        $baseHash = parent::getHashFor($request);

        $contentType = $request->getContentTypeFormat();

        return "{$baseHash}-{$contentType}";
    }

}
