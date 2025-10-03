<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'story_id',
        'user_id',
        'donor_name',
        'amount',
    ];

    // Relationships
    public function story()
    {
        return $this->belongsTo(Story::class);
    }
}
