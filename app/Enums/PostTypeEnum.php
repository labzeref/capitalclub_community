<?php

namespace App\Enums;

enum PostTypeEnum: string
{
    case text = 'text';
    case image = 'image';
    case video = 'video';
    case poll = 'poll';
}
