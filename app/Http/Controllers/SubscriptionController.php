<?php

namespace App\Http\Controllers;

use App\Services\ChargeBeeService;
use ChargeBee\ChargeBee\Exceptions\APIError;
use ChargeBee\ChargeBee\Exceptions\InvalidRequestException;
use ChargeBee\ChargeBee\Exceptions\OperationFailedException;
use ChargeBee\ChargeBee\Exceptions\PaymentException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function index(ChargeBeeService $chargeBeeService)
    {
        $user = _user();

        if ($user->subscribed) {
            return to_route('academy');
        }

        $chargeBeeSite = config('chargbee.site');
        $chargeBeePublicKey = config('chargbee.public_key');
        $price = config('chargbee.yearly_item_price');

        $register_page_expiry = Carbon::parse(config('app.registration_expiry'));

        $paymentIntent = $chargeBeeService->createPaymentIntent()->toJson();

        if ($register_page_expiry) {
            $timeDifferenceInSeconds = now()->diffInSeconds($register_page_expiry);
        } else {
            $timeDifferenceInSeconds = now()->diffInSeconds(now()->addDay());
        }

        return inertia('Auth/Payment', compact([
            'price',
            'chargeBeeSite',
            'paymentIntent',
            'chargeBeePublicKey',
            'timeDifferenceInSeconds',
        ]));
    }

    public function store(Request $request, ChargeBeeService $chargeBeeService)
    {
        if (empty($request->paymentIntent)) {
            return back()->with('error', __('Payment intent is missing, try again.'));
        }

        if (! $request->term_and_condition) {
            return back()->with('error', __('Please agree to our terms and conditions.'));
        }

        DB::beginTransaction();

        try {
            $user = $request->user();
            $customerId = $user->charge_bee_id;

            [$chargeBeeSubscription, $card, $chargeBeeInvoice] = $chargeBeeService->createSubscriptionWithItem(
                $customerId,
                config('chargbee.yearly_item_price_id'),
                $request->paymentIntent
            );

            $amount = 0;

            foreach ($chargeBeeSubscription->subscriptionItems as $chargeBeeSubscriptionItem) {
                $amount += $chargeBeeSubscriptionItem->unitPrice;
            }

            $subscription = $user->subscriptions()->create([
                'charge_bee_id' => $chargeBeeSubscription->id,
                'period_unit' => $chargeBeeSubscription->billingPeriodUnit,
                'current_term_start' => $this->formatTimestamp($chargeBeeSubscription->currentTermStart),
                'current_term_end' => $this->formatTimestamp($chargeBeeSubscription->currentTermEnd),
                'next_billing_at' => $this->formatTimestamp($chargeBeeSubscription->nextBillingAt),
                'started_at' => $this->formatTimestamp($chargeBeeSubscription->startedAt),
                'activated_at' => $this->formatTimestamp($chargeBeeSubscription->activatedAt),
                'currency_code' => $chargeBeeSubscription->currencyCode,
                'amount' => $amount,
                'last4' => $card->last4,
                'brand' => $card->cardType,
                'masked_number' => $card->maskedNumber,
                'status' => $chargeBeeSubscription->status,
            ]);

            $user->invoices()->create([
                'subscription_id' => $subscription->id,
                'charge_bee_id' => $chargeBeeInvoice->id,
                'currency_code' => $chargeBeeInvoice->currencyCode,
                'amount_paid' => $chargeBeeInvoice->amountPaid / 100,
                'total' => $chargeBeeInvoice->total / 100,
                'paid_at' => $this->formatTimestamp($chargeBeeInvoice->paidAt),
                'date' => $this->formatTimestamp($chargeBeeInvoice->date),
                'status' => $chargeBeeInvoice->status,
            ]);

            $user->update(['subscribed' => true]);

            logActivity(causedBy: $user, performedOn: $subscription, log: 'You subscribed the plan.');
        } catch (PaymentException $e) {
            DB::rollBack();

            if (Str::contains($e->getMessage(), 'Insufficient funds')) {
                return back()->with('error', 'Insufficient funds.');
            }

            if ('card[number]' == $e->getParam()) {
                return back()->with('error', __('Invalid card information.'));
            } else {
                return back()->with('error', __('Card verification failed. Please use a different card.'));
            }
        } catch (InvalidRequestException $e) {
            DB::rollBack();

            if ('coupon' == $e->getParam()) {
                if ('resource_not_found' == $e->getApiErrorCode()) {
                    return back()->with('error', __('Invalid coupon.'));
                } elseif ('resource_limit_exhausted' == $e->getApiErrorCode()) {
                    return back()->with('error', __('Coupon has expired.'));
                } elseif ('invalid_request' == $e->getApiErrorCode()) {
                    return back()->with('error', __('Coupon is not available with this plan.'));
                } else {
                    return back()->with('error', __('Invalid coupon.'));
                }
            } else {
                return back()->with('error', _serverErrorMessage());
            }
        } catch (OperationFailedException $e) {
            DB::rollBack();

            return back()->with('error', __('Payment service is not available please try again latter.'));
        } catch (APIError|Exception $e) {
            DB::rollBack();

            dd($e);

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        return to_route('preference.glitch-id');
    }

    private function formatTimestamp(int $timestamp)
    {
        return Carbon::createFromTimestamp($timestamp)->format('Y-m-d H:i:s');
    }
}
