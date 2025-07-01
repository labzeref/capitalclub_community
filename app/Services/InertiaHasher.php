<?php

namespace App\Services;

use Illuminate\Http\Request;
use Spatie\ResponseCache\Hasher\DefaultHasher;

class InertiaHasher extends DefaultHasher
{
    public function getHashFor(Request $request): string
    {
        $baseHash = parent::getHashFor($request);

        $contentType = $request->getContentTypeFormat();

        return "{$baseHash}-{$contentType}";
    }
}
