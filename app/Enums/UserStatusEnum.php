<?php

namespace App\Enums;

enum UserStatusEnum: int
{
    case Active = 1;
    case Flagged = 2;
    case Blocked = 3;
}
