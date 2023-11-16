<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf_token" content="{{ csrf_token() }}">


    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


    <title inertia>{{ config('app.name', 'Capital Club') }}</title>


    <link rel="icon" type="image/x-icon" href="{{ asset('assets/favicon.png') }}">

{{--    <script src="https://www.google.com/recaptcha/enterprise.js?render={{config('recaptcha.key')}}"></script>--}}
{{--    <script src="https://www.google.com/recaptcha/enterprise.js?&render=explicit"></script>--}}

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MP2C6FH');</script>
    <!-- End Google Tag Manager -->
{{--    <link--}}
{{--            rel="stylesheet"--}}
{{--            href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css"--}}
{{--    />--}}
{{--    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>--}}
</head>
<body class="font-sans antialiased" style="margin: 0;">
@inertia

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MP2C6FH"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<script>
    window._assets = '{{ asset('') }}';
    window._base_url = '{{ route('welcome') }}';
</script>
<script src="https://js.chargebee.com/v2/chargebee.js"></script>

</body>

</html>
