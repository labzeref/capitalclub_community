@component('mail::message')
# Welcome

Your password is {{ $password }}

@component('mail::button', ['url' => route('login')])
Login Here
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
