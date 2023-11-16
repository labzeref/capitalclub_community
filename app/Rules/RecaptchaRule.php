<?php

namespace App\Rules;

use Closure;
use Google\ApiCore\ValidationException;
use Google\Cloud\RecaptchaEnterprise\V1\Assessment;
use Google\Cloud\RecaptchaEnterprise\V1\Event;
use Google\Cloud\RecaptchaEnterprise\V1\RecaptchaEnterpriseServiceClient;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Cache;

class RecaptchaRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        return;
        if (request()->recaptcha_version == 3) {
            $key = config('recaptcha.key');
        } else {
            $key = config('recaptcha.key_v2');
        }

        $project = config('recaptcha.project');

        $result = $this->createAssessment($key, $value, $project);

        if (! $result['status']) {
            $fail($result['message']);
        }
    }

    /**
     * Create an assessment to analyze the risk of a UI action.
     *
     * @param  string  $siteKey The key ID for the reCAPTCHA key (See https://cloud.google.com/recaptcha-enterprise/docs/create-key)
     * @param  string  $token The user's response token for which you want to receive a reCAPTCHA score. (See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#retrieve_token)
     * @param  string  $project Your Google Cloud project ID
     *
     * @throws ValidationException
     */
    private function createAssessment(string $siteKey, string $token, string $project): array
    {
        // TODO: To avoid memory issues, move this client generation outside
        // of this example, and cache it (recommended) or call client.close()
        // before exiting this method.
        $client = new RecaptchaEnterpriseServiceClient([
            'credentials' => config('recaptcha.credentials'),
        ]);
        $projectName = $client->projectName($project);

        $event = (new Event())
            ->setSiteKey($siteKey)
            ->setToken($token);

        $assessment = (new Assessment())
            ->setEvent($event);

        try {
            $response = $client->createAssessment(
                $projectName,
                $assessment
            );

            // You can use the score only if the assessment is valid,
            // In case of failures like re-submitting the same token, getValid() will return false
            if (! $response->getTokenProperties()->getValid()) {
                return [
                    'status' => false,
                    'message' => 'The recaptcha is invalid.',
                ];
            } else {
                if (config('recaptcha.score') > $response->getRiskAnalysis()->getScore()) {
                    // if (true) {
                    return [
                        'status' => false,
                        'message' => $response->getRiskAnalysis()->getScore(),
                    ];
                }

                // Optional: You can use the following methods to get more data about the token
                // Action name provided at token generation.
                // printf($response->getTokenProperties()->getAction() . PHP_EOL);
                // The timestamp corresponding to the generation of the token.
                // printf($response->getTokenProperties()->getCreateTime()->getSeconds() . PHP_EOL);
                // The hostname of the page on which the token was generated.
                // printf($response->getTokenProperties()->getHostname() . PHP_EOL);
            }

            $client->close();

            return [
                'status' => true,
                'message' => '',
            ];
        } catch (\Throwable $throwable) {
            $client->close();

            return [
                'status' => false,
                'message' => 'The recaptcha is invalid failed.',
            ];
        }
    }
}
