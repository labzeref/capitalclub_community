<?php

namespace App\Models\Chat;

use App\Enums\ConversationTypeEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $attributes = [
        'type' => ConversationTypeEnum::duo,
    ];

    protected $casts = [
        'type' => ConversationTypeEnum::class,
        'last_update' => 'datetime',
    ];

    public function participants(): HasMany
    {
        return $this->hasMany(ConversationParticipant::class);
    }

    public function opponent(int $authUserId): User
    {
        return $this->participants->where('user_id', '!=', $authUserId)->first()->user;
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function isParticipant(int $userId): bool
    {
        return $this->participants()->where('user_id', $userId)->exists();
    }

    public function isNotParticipant($userId): bool
    {
        return ! $this->participants()->where('user_id', $userId)->exists();
    }

    public static function start(int $senderId, int $receiverId): Conversation
    {
        $conversation = self::with('participants.user.badges')->whereHas(
            'participants',
            fn ($query) => $query->where('user_id', $receiverId)
        )
            ->whereHas(
                'participants',
                fn ($query) => $query->where('user_id', $senderId)
            )
            ->first();

        if (! $conversation) {
            $conversation = self::create();

            $conversation->participants()->create(['user_id' => $senderId]);
            $conversation->participants()->create(['user_id' => $receiverId]);
        }

        return $conversation;
    }
}
