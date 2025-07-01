<?php

namespace App\Services;

use App\Models\CheckoutChampCard;
use App\Models\CheckoutChampProduct;
use App\Models\CheckoutChampShippingAddress;
use App\Models\PremiumUser;
use App\Models\User;
use AWS\CRT\HTTP\Request;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class CheckoutChampService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('checkout-champ.base_url'), '/');
    }

    public function getAllUsers()
    {

        $loginId = 'membersApi';
        $password = '8JXApZ$QCt4sLR5tkYpm';
        $startDate = now()->subMonths(1)->format('m/d/Y');
        $endDate = now()->format('m/d/Y');

        $requestData = [
            'loginId' => $loginId,
            'password' => $password,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ];
        $response = Http::get('https://api.checkoutchamp.com/customer/query/', $requestData);

        if ($response->successful()) {
            $responseData = $response->json();
            return $responseData;
        } else {
            $errorCode = $response->status();
            $errorMessage = $response->body();
            // You might want to handle or log errors here
            return ['error' => $errorMessage];
        }
    }

    public function getCustomerByCustomerId(string|int $customerId): PromiseInterface|Response
    {
        $params = $this->makeParams(compact('customerId'));

        return Http::post("$this->baseUrl/customer/query/$params");
    }

    public function queryCustomer(array $params): PromiseInterface|Response
    {
        $params = $this->makeParams($params);

        return Http::post("$this->baseUrl/customer/query/$params");
    }

    public function queryOrders(array $params): PromiseInterface|Response
    {
        $params = $this->makeParams($params);

        return Http::post("$this->baseUrl/order/query/$params");
    }

    public function getCustomerByOrderId(string|int $orderId): PromiseInterface|Response
    {
        $params = $this->makeParams(compact('orderId'));

        return Http::post("$this->baseUrl/customer/query/$params");
    }

    public function getPurchase(string|int $orderId): PromiseInterface|Response
    {
        $params = $this->makeParams(compact('orderId'));

        return Http::post("$this->baseUrl/purchase/query/$params");
    }

    public function getOrder(string|int $orderId): PromiseInterface|Response
    {
        $params = $this->makeParams(compact('orderId'));

        return Http::post("$this->baseUrl/order/query/$params");
    }

    public function getProduct(string|int $productId): PromiseInterface|Response
    {
        $params = $this->makeParams(compact('productId'));

        return Http::post("$this->baseUrl/product/query/$params");
    }

    public function cancelOrder(string|int $orderId): PromiseInterface|Response
    {
        $cancelReason = "didn't say, didn't ask";
        $afterNextBill = true;
        $params = $this->makeParams(compact(['orderId', 'cancelReason','afterNextBill']));

        return Http::post("$this->baseUrl/order/cancel/$params");
    }

    public function addCard(
        string $cardNumber,
        string $cardMonth,
        string $cardYear,
        string $cardSecurityCode,
               $paySourceId,
        string $customerId,
    ): PromiseInterface|Response {
        $validateCard = 1;

        if ($paySourceId){

            $params = $this->makeParams(compact(['cardNumber', 'cardMonth', 'cardYear', 'cardSecurityCode', 'paySourceId', 'customerId', 'validateCard']));
        }else{

            $params = $this->makeParams(compact(['cardNumber', 'cardMonth', 'cardYear', 'cardSecurityCode',  'customerId', 'validateCard']));
        }


        return Http::post("$this->baseUrl/customer/cardupdate/$params");
    }

    public function isIpValid($ip): bool
    {
        return true;
//        return $ip === config('checkout-champ.ip_address');
    }

    private function makeParams(array $params): string
    {
        $authenticatedParams = array_merge([
            'loginId' => config('checkout-champ.login_id'),
            'password' => config('checkout-champ.password'),
        ], $params);

        return '?' . http_build_query($authenticatedParams);
    }

    /**
     * -----------------------------------------------------------------
     * Repository functions
     * -----------------------------------------------------------------
     */

    public function getUserCardByLast4(User $user, string $last4): ?CheckoutChampCard
    {
        return $user->cards()->where('last_4', $last4)->first();
    }

    public function createUser(array $attributes, string $password): User
    {
        $premiumUser = PremiumUser::whereEmail($attributes['email'])->whereNotNull('glitch_id')->first();

        if ($premiumUser) {
            $user = User::updateOrCreate([
                'email' => $attributes['email']
            ], [
                'id' => $premiumUser->glitch_id,
                'checkout_champ_id' => $attributes['checkout_champ_id'],
                'country_iso' => $attributes['country_iso'],
                'first_name' => $attributes['first_name'],
                'last_name' => $attributes['last_name'],
                'email' => $attributes['email'],
                'password' => Hash::make($password),
            ]);
        } else {
            $user = User::updateOrCreate([
                'email' => $attributes['email']
            ], [
                'checkout_champ_id' => $attributes['checkout_champ_id'],
                'country_iso' => $attributes['country_iso'],
                'first_name' => $attributes['first_name'],
                'last_name' => $attributes['last_name'],
                'email' => $attributes['email'],
                'password' => Hash::make($password),
            ]);
        }

        if ($user->instructor()->exists()) {
            $user->instructor()->updateOrCreate([
                'country_iso' => $attributes['country_iso'],
                'first_name' => $attributes['first_name'],
                'last_name' => $attributes['last_name'],
            ]);
        }

        return $user;
    }




    // public function createOrUpdateCustomer()
    // {
    //     // Retrieve the authenticated user
    //     $user = _user();
    //     // dd($user);
    //     if ($user) {
    //         // Check if the user exists in Checkout Champ
    //         $existingUserData = [
    //             'loginId' => config('checkout-champ.login_id'),
    //             'password' => config('checkout-champ.password'),
    //             'emailAddress' => $user->email,
    //             'customerId' => $user->id,

    //             // 'startDate' => $user->start_Date,
    //             // 'endDate' => $user->end_date,
    //         ];

    //         $existingUserResponse = Http::get('https://api.checkoutchamp.com/customer/query/', $existingUserData);

    //         if ($existingUserResponse->successful()) {
    //             // User already exists in Checkout Champ
    //             $existingUserData = $existingUserResponse->json();
    //             // dd($existingUserData);

    //             // Compare the user's details with the existing data in Checkout Champ
    //             // Assuming $existingUserData contains user details from Checkout Champ API response
    //             // dd(config('checkout-champ.password'));
    //             if ($this->userDetailsChanged($user, $existingUserData)) {
    //                 // User details have changed, update user in Checkout Champ
    //                 $updateUserData = [
    //                     'loginId' => config('checkout-champ.login_id'),
    //                     'password' => config('checkout-champ.password'),
    //                     'customerId' => $existingUserData['customerId'], // Assuming customerId is returned in the Checkout Champ API response
    //                     'firstName' => $user->first_name,
    //                     'lastName' => $user->last_name,
    //                     'emailAddress' => $user->email,
    //                     'country' => $user->country, // Make sure this matches the field name in the Checkout Champ API
    //                     // Add any other fields as needed
    //                 ];

    //                 $updateUserResponse = Http::post('https://api.checkoutchamp.com/customer/update/', $updateUserData);

    //                 if ($updateUserResponse->successful()) {
    //                     // User updated successfully in Checkout Champ
    //                     $responseData = $updateUserResponse->json();
    //                     // Handle response data if needed
    //                 } else {
    //                     // Handle error updating user in Checkout Champ
    //                     $errorCode = $updateUserResponse->status();
    //                     $errorMessage = $updateUserResponse->body();
    //                 }
    //             } else {
    //                 // User details have not changed, no need to update
    //                 // Handle this case if needed
    //                 return 'User details have not changed';
    //             }
    //         } else {
    //             // User does not exist in Checkout Champ, create user
    //             $newUserData = [
    //                 'loginId' => config('checkout-champ.login_id'),
    //                 'password' => config('checkout-champ.password'),
    //                 'firstName' => $user->first_name,
    //                 'lastName' => $user->last_name,
    //                 'emailAddress' => $user->email,
    //                 // Add any other fields as needed
    //             ];

    //             $createUserResponse = Http::post('https://api.checkoutchamp.com/leads/import/', $newUserData);

    //             if ($createUserResponse->successful()) {
    //                 // User created successfully in Checkout Champ
    //                 $responseData = $createUserResponse->json();
    //                 // Handle response data if needed
    //             } else {
    //                 // Handle error creating user in Checkout Champ
    //                 $errorCode = $createUserResponse->status();
    //                 $errorMessage = $createUserResponse->body();
    //             }
    //         }
    //     } else {
    //         // Handle error - Authenticated user not found
    //     }
    // }

    // private function userDetailsChanged($user, $checkoutChampUserData)
    // {
    //     // dd($checkoutChampUserData);

    //     // Compare user details with the data from Checkout Champ
    //     // You can compare individual fields such as first name, last name, email, country, etc.
    //     // For example, compare the first name
    //     $firstNameChanged = $user->first_name !== $checkoutChampUserData['firstName'];

    //     // Compare the last name
    //     $lastNameChanged = $user->last_name !== $checkoutChampUserData['lastName'];

    //     // Compare the email address
    //     $emailChanged = $user->email !== $checkoutChampUserData['emailAddress'];

    //     // Compare the country
    //     $countryChanged = $user->country !== $checkoutChampUserData['country'];

    //     // If any of the fields have changed, return true
    //     if ($firstNameChanged || $lastNameChanged || $emailChanged || $countryChanged) {
    //         return true;
    //     }

    //     // If none of the fields have changed, return false
    //     return false;
    // }

    public function createOrUpdateCustomer()
    {
        // Retrieve the authenticated user
        $user = _user();

        if (!$user) {
            // Handle error - Authenticated user not found
            return 'Authenticated user not found';
        }

        // Prepare data to check if the user exists in Checkout Champ
        $checkUserData = [
            'loginId' => config('checkout-champ.login_id'),
            'password' => config('checkout-champ.password'),
            'emailAddress' => $user->email,
            'customerId' => $user->id,
        ];

        // Query Checkout Champ to see if user exists
        $existingUserResponse = Http::get('https://api.checkoutchamp.com/customer/query/', $checkUserData);

        if ($existingUserResponse->successful()) {
            // User already exists in Checkout Champ
            $existingUserData = $existingUserResponse->json();

            if ($this->userDetailsChanged($user, $existingUserData)) {
                // User details have changed, update user in Checkout Champ
                return $this->updateUserInCheckoutChamp($user, $existingUserData['customerId']);
            } else {
                // User details have not changed, no update needed
                return 'No update required';
            }
        } else {
            // User does not exist in Checkout Champ, create user
            return $this->createUserInCheckoutChamp($user);
        }
    }

    private function updateUserInCheckoutChamp($user, $customerId)
    {
        $updateUserData = [
            'loginId' => config('checkout-champ.login_id'),
            'password' => config('checkout-champ.password'),
            'customerId' => $customerId,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'emailAddress' => $user->email,
            'country' => $user->country,
        ];

        $updateUserResponse = Http::post('https://api.checkoutchamp.com/customer/update/', $updateUserData);

        if ($updateUserResponse->successful()) {
            // User updated successfully in Checkout Champ
            return 'User updated successfully';
        } else {
            // Handle error updating user
            return 'Error updating user: ' . $updateUserResponse->body();
        }
    }

    private function createUserInCheckoutChamp($user)
    {
        $newUserData = [
            'loginId' => config('checkout-champ.login_id'),
            'password' => config('checkout-champ.password'),
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'emailAddress' => $user->email,
            'customerId' => $user->id,
        ];

        $createUserResponse = Http::post('https://api.checkoutchamp.com/leads/import/', $newUserData);

        if ($createUserResponse->successful()) {
            // User created successfully in Checkout Champ
            return 'User created successfully';
        } else {
            // Handle error creating user
            return 'Error creating user: ' . $createUserResponse->body();
        }
    }

    private function userDetailsChanged($user, $checkoutChampUserData)
    {
        // Compare fields like first name, last name, email, and country
        $fieldsToCheck = ['firstName', 'lastName', 'emailAddress', 'country'];
        foreach ($fieldsToCheck as $field) {
            if (array_key_exists($field, $checkoutChampUserData) && $user->{$field} !== $checkoutChampUserData[$field]) {
                return true;
            }
        }
        return false;
    }

    public function createUserShippingAddress(array $attributes): CheckoutChampShippingAddress
    {
        return CheckoutChampShippingAddress::updateOrCreate([
            'user_id'=>$attributes['user_id'],
            'first_name'=>$attributes['first_name'],
            'last_name'=>$attributes['last_name'],
        ],$attributes);
    }

    public function syncUserCards(User $user, array $cardsData): void
    {
        foreach ($cardsData as $data) {
            $user->cards()->updateOrCreate([
                'pay_source_id' => $data['paySourceId'],
            ], [
                'is_primary' => $data['IsPrimary'],
                'type' => $data['cardType'],
                'last_4' => $data['cardLast4'],
                'year' => $data['cardYear'],
                'month' => $data['cardMonth'],
                'expiry_date' => $data['cardExpiryDate'],
                'ach_routing_number' => $data['achRoutingNumber'] ?? null,
                'ach_account_type' => $data['achAccountType'] ?? null,
                'ach_bank_name' => $data['achBankName'] ?? null,
                'ach_last_4' => $data['achLast4'] ?? null,
            ]);
        }
    }

    public function syncProduct(array $attributes): CheckoutChampProduct
    {
        return CheckoutChampProduct::updateOrCreate([
            'checkout_champ_id' => $attributes['checkout_champ_id'],
        ], [
            'name' => $attributes['name'],
            'description' => "dummy description",
            'cost' => $attributes['cost'],
        ]);
    }

    public function createOrder(User $user, array $attributes): void
    {
        $user->orders()->updateOrCreate([
            'checkout_champ_id' => $attributes['checkout_champ_id'],
        ], [
            'product_id' => $attributes['product_id'],
            'card_id' => $attributes['card_id'],
            'start_at' => $attributes['start_at'],
            'end_at' => $attributes['end_at'],
            'amount' => $attributes['amount'],
            'status' => $attributes['status'],
        ]);
    }

    public function importOrder(array $data): PromiseInterface|Response
    {
        $params = $this->makeParams($data);

        return Http::post("$this->baseUrl/order/import/$params");
    }

    public function updatePurchase(array $data): PromiseInterface|Response
    {
        $params = $this->makeParams($data);

        return Http::post("$this->baseUrl/purchase/update/$params");
    }

    public function reRunDeclinedOrder(array $data): PromiseInterface|Response
    {
        $params = $this->makeParams($data);

        return Http::post("$this->baseUrl/order/rerun/$params");
    }
}
