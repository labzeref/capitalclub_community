<?php

namespace App\Imports;

use App\Models\Invitation;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class InvitationImport implements ToCollection, WithHeadingRow, WithChunkReading
{
    public function __construct(private readonly int $fileId)
    {
    }

    public function collection(Collection $collection): void
    {
        foreach ($collection as $row) {
            Invitation::updateOrCreate([
                'email' => Str::lower($row['email']),
            ], [
                'invitation_file_id' => $this->fileId,
                'code' => $row['invitation_code'],
                'start_at' => Carbon::parse($row['start_date'] . ' ' . $row['start_time']),
                'end_at' => Carbon::parse($row['end_date'] . ' ' . $row['end_time']),
            ]);
        }
    }

    public function chunkSize(): int
    {
        return 10000;
    }
}
