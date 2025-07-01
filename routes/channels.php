<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('discord.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('LiveStream', function ($user) {
    return (int) $user->id;
});
