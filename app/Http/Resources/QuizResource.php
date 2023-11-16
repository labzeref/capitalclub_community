<?php

namespace App\Http\Resources;

use App\Enums\QuizTypeEnum;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Quiz */
class QuizResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'answers' => AnswerResource::collection($this->whenLoaded('answers')),
            'type' => new EnumResource($this->type),
            'question' => $this->question,
            'polls' => $this->when(
                $this->type == QuizTypeEnum::poll,
                fn () => $this->getPolls()
            ),
        ];
    }
}
