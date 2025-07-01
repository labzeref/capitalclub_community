<?php

namespace App\Http\Resources\Marketplace;

use App\Models\Marketplace\PartnerProfileBanner;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PartnerProfileBanner */
class PartnerProfileBannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // return [
        //     'id' => $this->id,
        //     'vimeo_url' => $this->when($this->is_vimeo == true, $this->vimeo_url),
        //     'is_vimeo' => $this->is_vimeo,
        //     'order' => $this->order,
        //     'thumbnail' => $this->whenLoaded('thumbnail', function () {
        //         return $this->getFirstMedia('thumbnail')
        //             ? _getSignedUrl($this->getFirstMediaPath('thumbnail'))
        //             : null;
        //     }),
        //     'image' => $this->whenLoaded('media') && !$this->is_vimeo && $this->getFirstMedia('image'),
        //     'image_url' => $this->whenLoaded('media') && !$this->is_vimeo && $this->getFirstMedia('image')
        //         ? _getSignedUrl($this->getFirstMediaPath('image'))
        //         : null,
        //     'mobile_image' => $this->whenLoaded('media') && !$this->is_vimeo && $this->getFirstMedia('mobile_image'),
        //     'mobile_image_url' => $this->whenLoaded('media') && !$this->is_vimeo && $this->getFirstMedia('mobile_image')
        //         ? _getSignedUrl($this->getFirstMediaPath('mobile_image'))
        //         : null,
        // ];
        return [
            'id' => $this->id,
            'vimeo_url' => $this->when($this->is_vimeo == true, $this->vimeo_url),
            'is_vimeo' => $this->is_vimeo,
            'order' => $this->order,
            // 'thumbnail' => $this->getFirstMedia('thumbnail')
            // ? _getSignedUrl($this->getFirstMediaPath('thumbnail'))
            // : null,

            $this->mergeWhen(
                $this->relationLoaded('media'),
                function () {
                    return [
                        'image' => $this->getFirstMedia('image')
                            ? _getSignedUrl($this->getFirstMediaPath('image'))
                            : null,
                        'small' => $this->getFirstMedia('image')
                            ? _getSignedUrl($this->getFirstMediaPath('image','small'))
                            : null,
                    ];
                }
            )
        ];
    }
}
