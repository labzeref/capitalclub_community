<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('message-sent.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;

});

/**
 *------------------------
 *  liveStreaming ( multiple stream )
 * -----------------------
 */
Broadcast::channel('live-stream.{id}', function (User $user, $id) {
    return [
        'id' => $user->id,
        'full_name' => $user->full_name,
        'dp' => ['original' => $user->dp()],
    ];
});
