<?php

namespace App\Enums;

enum PostStatusEnum: int
{
    case pending = 1;
    case approve = 2;
    case reject = 3;
}
