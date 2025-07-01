<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use GeoIp2\Exception\AddressNotFoundException;
use Stevebauman\Location\Facades\Location;

class TestLocationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-location-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentUserInfo = null;

        try {
            \Log::info("Attempting to get location for IP: 10.0.1.140");
            $currentUserInfo = Location::get('10.0.1.140');
        } catch (AddressNotFoundException $e) {
            \Log::info("Caught AddressNotFoundException for IP 10.0.1.140: " . $e->getMessage());
        } catch (\Exception $e) {
            \Log::error("An unexpected error occurred for IP 10.0.1.140: " . $e->getMessage());
        }


        if ($currentUserInfo) {
            if ($currentUserInfo->countryName) {
                $attributes['country'] = $currentUserInfo->countryName;
            }

            if ($currentUserInfo->cityName) {
                $attributes['city'] = $currentUserInfo->cityName;
            }

            if ($currentUserInfo->zipCode) {
                $attributes['zip'] = $currentUserInfo->zipCode;
            }
        }

    }
}
