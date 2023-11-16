<?php

namespace App\Assets;

class VideoAsset
{
    /**
     * Static resource of videos that are use in website
     * getting from s3
     */
    public static function getResource(): array
    {
        $s3Directories = 'capitalclub_videos';

        return [
            'glitch' => _getSignedUrl("$s3Directories/glitch.mp4"),
            'welcome' => _getSignedUrl("$s3Directories/welcome.mp4"),
            'sales' => _getSignedUrl("$s3Directories/sales.mp4"),
        ];
    }
}
