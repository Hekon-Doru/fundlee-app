<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('story_id')
                ->constrained('stories') // 👈 explicit reference
                ->onDelete('cascade');

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')   // 👈 explicit reference
                ->onDelete('set null');

            $table->string('donor_name');
            $table->decimal('amount', 12, 2);
            $table->timestamps();
            $table->text('comment')->nullable();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
