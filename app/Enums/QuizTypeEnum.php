<?php

namespace App\Enums;

enum QuizTypeEnum: int
{
    case poll = 1;
    case multiple_choice = 2;
}
