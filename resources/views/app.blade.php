<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf_token" content="{{ csrf_token() }}">


    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


    <title inertia>{{ config('app.name', 'Capital Club') }}</title>


    <link rel="icon" type="image/x-icon" href="{{ asset('assets/favicon.png') }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

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

{{-- <!-- Privado Notice start -->
<script src=“https://www.cdn.privado.ai/8bff03d134124133b97f5269f7850993.js” type=“text/javascript” ></script>
<!-- Privado Notice end --> --}}


<script>
    window._assets = '{{ asset('') }}';
    window._base_url = '{{ route('welcome') }}';
</script>
<script src="https://js.chargebee.com/v2/chargebee.js"></script>

</body>

</html>
