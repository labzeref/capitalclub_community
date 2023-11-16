<?php

namespace App\Services;

use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class DiscordService
{
    private string $discordBaseUrl;

    private string $clientId;

    private string $clientSecret;

    private string $defaultRoleId;

    private string $serverId;

    private string $botToken;

    /**
     * Initialize the properties that will be use in functions
     */
    public function __construct()
    {
        $this->discordBaseUrl = 'https://discord.com/api/v10';
        $this->clientId = config('discord.clientId');
        $this->clientSecret = config('discord.clientSecret');
        $this->defaultRoleId = config('discord.defaultRoleId');
        $this->serverId = config('discord.serverId');
        $this->botToken = config('discord.botToken');
    }

    /**
     * Creates the sso url for authorization
     */
    public function getSSO(): string
    {
        $scopes = urlencode(implode(' ', config('discord.scopes')));

        $clientId = config('discord.clientId');
        $redirectUri = urlencode(route('discord.handle-redirect'));

        $url = 'https://discord.com/oauth2/authorize';
        $url .= "?client_id=$clientId";
        $url .= "&redirect_uri=$redirectUri";
        $url .= '&response_type=code';
        $url .= "&scope=$scopes";

        return $url;
    }

    /**
     * Exchange the token
     */
    public function exchangeToken(string $code): PromiseInterface|Response
    {
        return Http::asForm()
            ->withHeader('Content-Type', 'application/x-www-form-urlencoded')
            ->post("$this->discordBaseUrl/oauth2/token", [
                'grant_type' => 'authorization_code',
                'client_id' => $this->clientId,
                'code' => $code,
                'client_secret' => $this->clientSecret,
                'redirect_uri' => route('discord.handle-redirect'),
            ]);
    }

    /**
     * Get the user from discord
     */
    public function getUser(string $accessToken): PromiseInterface|Response
    {
        return Http::withHeader('Content-Type', 'application/json')
            ->withToken($accessToken)
            ->get("$this->discordBaseUrl/users/@me");
    }

    /**
     * Add member to guild with default role
     */
    public function addGuildMemberWithDefaultRole(string $userDiscordId, string $accessToken): PromiseInterface|Response
    {
        $api = "$this->discordBaseUrl/guilds/{$this->serverId}/members/{$userDiscordId}";

        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->put($api, [
            'access_token' => $accessToken,
            'roles' => [$this->defaultRoleId],
        ]);
    }

    /**
     * Add role to the guild member
     */
    public function addGuildMemberRole(string $userDiscordId, string $roleId): PromiseInterface|Response
    {
        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->put("{$this->discordBaseUrl}/guilds/{$this->serverId}/members/$userDiscordId/roles/$roleId");
    }

    /**
     * Remove role from the guild member
     */
    public function removeGuildMemberRole(string $userDiscordId, string $roleId): PromiseInterface|Response
    {
        $api = "$this->discordBaseUrl/guilds/{$this->serverId}/members/{$userDiscordId}/roles/$roleId";

        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->delete($api);
    }

    /**
     * Remove the member from guild
     */
    public function removeGuildMember(string $userDiscordId): PromiseInterface|Response
    {
        $api = "$this->discordBaseUrl/guilds/{$this->serverId}/members/{$userDiscordId}";

        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->delete($api);
    }

    /**
     * Refresh the user access token of discord
     */
    public function getRefreshToken(string $refreshToken): PromiseInterface|Response
    {
        return Http::asForm()
            ->withHeader('Content-Type', 'application/x-www-form-urlencoded')
            ->post("$this->discordBaseUrl/oauth2/token", [
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'grant_type' => 'refresh_token',
                'refresh_token' => $refreshToken,
            ]);
    }

    /**
     * Get the guild member from discord
     */
    public function getGuildMember(string $userDiscordId): PromiseInterface|Response
    {
        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->get("{$this->discordBaseUrl}/guilds/{$this->serverId}/members/$userDiscordId");
    }

    public function updateUsername(string $userDiscordId, string $username): PromiseInterface|Response
    {
        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bot $this->botToken",
        ])->patch("{$this->discordBaseUrl}/guilds/{$this->serverId}/members/$userDiscordId", [
            'nick' => $username
        ]);
    }
}
