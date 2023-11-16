<?php

namespace App\Jobs;

use App\Events\CreatingSubscriptionEvent;
use App\Models\User;
use App\Services\ChargeBeeService;
use ChargeBee\ChargeBee\Exceptions\APIError;
use ChargeBee\ChargeBee\Exceptions\InvalidRequestException;
use ChargeBee\ChargeBee\Exceptions\OperationFailedException;
use ChargeBee\ChargeBee\Exceptions\PaymentException;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateSubscriptionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private ChargeBeeService $chargeBeeService;

    /**
     * Initializing the chargebee service that contains all function related
     * to chargebee
     *
     * @param int $userId
     * @param array $paymentIntent
     * @param string $coupon
     */
    public function __construct(
        private readonly int    $userId,
        private readonly array  $paymentIntent,
        private readonly string $coupon,
    )
    {
        $this->chargeBeeService = new ChargeBeeService();
    }

    /**
     * Creating the subscription
     *
     * @return void
     */
    public function handle(): void
    {
//        $user = User::find($this->userId);
//
//        if (!$user) {
//            return;
//        }
//
//        DB::beginTransaction();
//
//        try {
//            $customerId = $user->charge_bee_id;
//
//            [$chargeBeeSubscription, $card, $chargeBeeInvoice] = $this->chargeBeeService->createSubscriptionWithItem(
//                $customerId,
//                config('chargbee.yearly_item_price_id'),
//                $this->paymentIntent,
//                $this->coupon
//            );
//
//            $amount = 0;
//
//            foreach ($chargeBeeSubscription->subscriptionItems as $chargeBeeSubscriptionItem) {
//                $amount += $chargeBeeSubscriptionItem->unitPrice;
//            }
//
//            $subscription = $user->subscriptions()->create([
//                'item_price_id' => $chargeBeeSubscription->subscriptionItems[0]->itemPriceId,
//                'charge_bee_id' => $chargeBeeSubscription->id,
//                'period_unit' => $chargeBeeSubscription->billingPeriodUnit,
//                'current_term_start' => $this->formatTimestamp($chargeBeeSubscription->currentTermStart),
//                'current_term_end' => $this->formatTimestamp($chargeBeeSubscription->currentTermEnd),
//                'next_billing_at' => $this->formatTimestamp($chargeBeeSubscription->nextBillingAt),
//                'started_at' => $this->formatTimestamp($chargeBeeSubscription->startedAt),
//                'activated_at' => $this->formatTimestamp($chargeBeeSubscription->activatedAt),
//                'currency_code' => $chargeBeeSubscription->currencyCode,
//                'amount' => $amount,
//                'last4' => $card->last4,
//                'brand' => $card->cardType,
//                'masked_number' => $card->maskedNumber,
//                'status' => $chargeBeeSubscription->status,
//            ]);
//
//            $user->invoices()->create([
//                'subscription_id' => $subscription->id,
//                'charge_bee_id' => $chargeBeeInvoice->id,
//                'currency_code' => $chargeBeeInvoice->currencyCode,
//                'amount_paid' => $chargeBeeInvoice->amountPaid / 100,
//                'total' => $chargeBeeInvoice->total / 100,
//                'paid_at' => $this->formatTimestamp($chargeBeeInvoice->paidAt),
//                'date' => $this->formatTimestamp($chargeBeeInvoice->date),
//                'status' => $chargeBeeInvoice->status,
//            ]);
//
//            $user->update(['subscribed' => true]);
//
//        } catch (PaymentException $e) {
//            DB::rollBack();
//
//            if (Str::contains($e->getMessage(), 'Insufficient funds')) {
//                event(new CreatingSubscriptionEvent(
//                    userId: $this->userId,
//                    success: false,
//                    message: [
//                        'type' => 'error',
//                        'value' => __('Insufficient funds.')
//                    ]
//                ));
//            }
//
//            if ('card[number]' == $e->getParam()) {
//                event(new CreatingSubscriptionEvent(
//                    userId: $this->userId,
//                    success: false,
//                    message: [
//                        'type' => 'error',
//                        'value' => __('Insufficient funds.')
//                    ]
//                ));
//            } else {
//                event(new CreatingSubscriptionEvent(
//                    userId: $this->userId,
//                    success: false,
//                    message: [
//                        'type' => 'error',
//                        'value' => __('Card verification failed. Please use a different card.')
//                    ]
//                ));
//            }
//        } catch (InvalidRequestException $e) {
//            DB::rollBack();
//
//            if ('coupon' == $e->getParam()) {
//                if ('resource_not_found' == $e->getApiErrorCode()) {
//                    event(new CreatingSubscriptionEvent(
//                        userId: $this->userId,
//                        success: false,
//                        message: [
//                            'type' => 'error',
//                            'value' => __('Invalid coupon.')
//                        ]
//                    ));
//                } elseif ('resource_limit_exhausted' == $e->getApiErrorCode()) {
//                    event(new CreatingSubscriptionEvent(
//                        userId: $this->userId,
//                        success: false,
//                        message: [
//                            'type' => 'error',
//                            'value' => __('Coupon has expired.')
//                        ]
//                    ));
//                } elseif ('invalid_request' == $e->getApiErrorCode()) {
//                    event(new CreatingSubscriptionEvent(
//                        userId: $this->userId,
//                        success: false,
//                        message: [
//                            'type' => 'error',
//                            'value' => __('Coupon is not available with this plan.')
//                        ]
//                    ));
//                } else {
//                    event(new CreatingSubscriptionEvent(
//                        userId: $this->userId,
//                        success: false,
//                        message: [
//                            'type' => 'error',
//                            'value' => __('Invalid coupon.')
//                        ]
//                    ));
//                }
//            } elseif (Str::contains($e->getParam(), 'coupons')) {
//                event(new CreatingSubscriptionEvent(
//                    userId: $this->userId,
//                    success: false,
//                    message: [
//                        'type' => 'error',
//                        'value' => __('Invalid coupon.')
//                    ]
//                ));
//            } else {
//                event(new CreatingSubscriptionEvent(
//                    userId: $this->userId,
//                    success: false,
//                    message: [
//                        'type' => 'error',
//                        'value' => _serverErrorMessage()
//                    ]
//                ));
//            }
//        } catch (OperationFailedException $e) {
//            DB::rollBack();
//
//            event(new CreatingSubscriptionEvent(
//                userId: $this->userId,
//                success: false,
//                message: [
//                    'type' => 'error',
//                    'value' => __('Payment service is not available please try again latter')
//                ]
//            ));
//        } catch (APIError|Exception $e) {
//            DB::rollBack();
//
//            event(new CreatingSubscriptionEvent(
//                userId: $this->userId,
//                success: false,
//                message: [
//                    'type' => 'error',
//                    'value' => _serverErrorMessage()
//                ]
//            ));
//        }
//
//        DB::commit();
//
//        event(new CreatingSubscriptionEvent(
//            userId: $user->id,
//            success: true,
//            message: [
//                'type' => 'success',
//                'value' => __('Payment process completed.')
//            ]
//        ));
    }

    /**
     * This function format the timestamps
     *
     * @param int $timestamp
     * @return string
     */
//    private function formatTimestamp(int $timestamp): string
//    {
//        return Carbon::createFromTimestamp($timestamp)->format('Y-m-d H:i:s');
//    }
}
