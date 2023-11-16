<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Http\Requests\Chat\ConversationRequest;
use App\Http\Resources\Chat\ConversationResource;
use App\Http\Resources\User\UserResource;
use App\Models\Chat\Conversation;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function index()
    {
        $response = ConversationResource::collection(
            Conversation::with('participants.user')->whereHas(
                'participants',
                fn ($query) => $query->where('user_id', _user()->id)
            )->paginate(20)
        )->resource;

        return $this->sendResponse($response);
    }

    public function conversation_data(\Illuminate\Http\Request $request)
    {
        $conversation = Conversation::find(decrypt($request->conversation_id));
        $opponent = new UserResource($conversation->opponent(_user()->id));
        $data = [
            'opponent' => [
                'id' => ($opponent->id),
                'full_name' => $opponent->full_name,
                'dp' => $conversation->opponent(_user()->id)->dp(),
            ],
            'conversation' => [
                'id' => $conversation->id,
            ],
        ];

        return $this->sendResponse($data);
    }

    public function store(ConversationRequest $request)
    {
        DB::beginTransaction();

        try {
            $conversation = Conversation::start(_user()->id, $request->user_id);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            dd($throwable);

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        $response = new ConversationResource($conversation->load('participants.user'));

        return $this->sendResponse($response);
    }
}
