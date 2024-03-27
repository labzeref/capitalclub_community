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
<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

<style>
        .preloader{
            height: 100vh;
            width: 100vw;
            position: fixed;
            z-index: 10000;
            background: #0D0D0D;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>

</head>
<body class="font-sans antialiased" style="margin: 0;">

<div id="preloader" class="preloader">
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
    <dotlottie-player id="preloader_lottie" src="/welcome.json" background="transparent" speed="1" style="width: 350px; height: 350px" direction="1" mode="normal" autoplay></dotlottie-player>
</div>

@inertia

<script>

 let animation_preloader = document.getElementById("preloader_lottie");

animation_preloader.addEventListener("complete", () => {
    // console.log('Lottie animation completed');

    if(document.readyState === 'complete'){
        // console.log('loading via document')
        setTimeout(() => {
            $('#preloader').fadeOut();
        }, 500);
    }else{
        // console.log('loading via window')
        window.addEventListener('load', function() {
            setTimeout(() => {
                $('#preloader').fadeOut();
            }, 500);
        });
    }

});

</script>

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MP2C6FH"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<!-- Privado Notice start -->
<script src=“https://www.cdn.privado.ai/8bff03d134124133b97f5269f7850993.js” type=“text/javascript” ></script>
<!-- Privado Notice end -->


<script>
    window._assets = '{{ asset('') }}';
    window._base_url = '{{ route('welcome') }}';
</script>
<script src="https://js.chargebee.com/v2/chargebee.js"></script>
<script>
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://t.capital.club/v1/lst/universal-script?ph=b4826bd3f6cd3cabfc8d900f12a3e8419f100f7e42d86c8c4dc0006604e866f1&tag=!clicked&ref_url=" + encodeURI(document.URL) ;
    head.appendChild(script);
</script>

</body>

</html>
