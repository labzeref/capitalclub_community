<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class MarketPlaceCategory extends Model
{
    use SoftDeletes, HasFactory;

    protected $guarded = ['id'];

    public static function boot(): void
    {
        parent::boot();

        self::creating(function (MarketPlaceCategory $category) {
            $category->slug = Str::slug($category->name);
        });

        self::updating(function (MarketPlaceCategory $category) {
            $category->slug = Str::slug($category->name);
        });
    }

    /**
     * ------------------------------------------------------------------------------
     * Relations
     * ------------------------------------------------------------------------------
     */

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MarketPlaceCategory::class, 'parent_id');
    }

    public function subCategories(): HasMany
    {
        return $this->hasMany(MarketPlaceCategory::class, 'parent_id');
    }
}
