{{--@component('mail::message')--}}
{{--# Welcome--}}

{{--Your password is {{ $password }}--}}

{{--@component('mail::button', ['url' => route('login')])--}}
{{--Login Here--}}
{{--@endcomponent--}}

{{--Thanks,<br>--}}
{{--{{ config('app.name') }}--}}
{{--@endcomponent--}}

<html>
<head>
    <!--[if (gte mso 9)|(IE)]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
    <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
    <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
    <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
    <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
    <meta name="color-scheme" content="only">
    <title></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;600;800&display=swap" rel="stylesheet">

    <style type="text/css">
        /*Basics*/
        body {margin:0px !important; padding:0px !important; display:block !important; min-width:100% !important; width:100% !important; -webkit-text-size-adjust:none;}
        table {border-spacing:0; mso-table-lspace:0pt; mso-table-rspace:0pt;}
        table td {border-collapse: collapse;mso-line-height-rule:exactly;}
        td img {-ms-interpolation-mode:bicubic; width:auto; max-width:auto; height:auto; margin:auto; display:block!important; border:0px;}
        td p {margin:0; padding:0;}
        td div {margin:0; padding:0;}
        td a {text-decoration:none; color: inherit;}
        /*Outlook*/
        .ExternalClass {width: 100%;}
        .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height:inherit;}
        .ReadMsgBody {width:100%; background-color: #ffffff;}
        /* iOS black LINKS */
        a[x-apple-data-detectors] {color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;}
        /*Gmail black links*/
        u + #body a {color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
        /*Buttons fix*/
        .undoreset a, .undoreset a:hover {text-decoration:none !important;}
        .yshortcuts a {border-bottom:none !important;}
        .ios-footer a {color:#aaaaaa !important;text-decoration:none;}
        /*Responsive-Tablet*/
        @media only screen and (max-width: 799px) and (min-width: 601px) {
            .outer-table.row {width:640px!important;max-width:640px!important;}
            .inner-table.row {width:580px!important;max-width:580px!important;}
        }
        /*Responsive-Mobile*/
        @media only screen and (max-width: 600px) and (min-width: 320px) {
            table.row {width: 100%!important;max-width: 100%!important;}
            td.row {width: 100%!important;max-width: 100%!important;}
            .img-responsive img {width:100%!important;max-width: 100%!important;height: auto!important;margin: auto;}
            .center-float {float: none!important;margin:auto!important;}
            .center-text{text-align: center!important;}
            .container-padding {width: 100%!important;padding-left: 15px!important;padding-right: 15px!important;}
            .container-padding10 {width: 100%!important;padding-left: 10px!important;padding-right: 10px!important;}
            .hide-mobile {display: none!important;}
            .menu-container {text-align: center !important;}
            .autoheight {height: auto!important;}
            .m-padding-10 {margin: 10px 0!important;}
            .m-padding-15 {margin: 15px 0!important;}
            .m-padding-20 {margin: 20px 0!important;}
            .m-padding-30 {margin: 30px 0!important;}
            .m-padding-40 {margin: 40px 0!important;}
            .m-padding-50 {margin: 50px 0!important;}
            .m-padding-60 {margin: 60px 0!important;}
            .m-padding-top10 {margin: 30px 0 0 0!important;}
            .m-padding-top15 {margin: 15px 0 0 0!important;}
            .m-padding-top20 {margin: 20px 0 0 0!important;}
            .m-padding-top30 {margin: 30px 0 0 0!important;}
            .m-padding-top40 {margin: 40px 0 0 0!important;}
            .m-padding-top50 {margin: 50px 0 0 0!important;}
            .m-padding-top60 {margin: 60px 0 0 0!important;}
            .m-height10 {font-size:10px!important;line-height:10px!important;height:10px!important;}
            .m-height15 {font-size:15px!important;line-height:15px!important;height:15px!important;}
            .m-height20 {font-size:20px!important;line-height:20px!important;height:20px!important;}
            .m-height25 {font-size:25px!important;line-height:25px!important;height:25px!important;}
            .m-height30 {font-size:30px!important;line-height:30px!important;height:30px!important;}
            .radius6 {border-radius: 6px!important;}
            .fade-white {background-color: rgba(255, 255, 255, 0.8)!important;}
            .rwd-on-mobile {display: inline-block!important;padding: 5px!important;}
            .center-on-mobile {text-align: center!important;}
            .rwd-col {width:100%!important;max-width:100%!important;display:inline-block!important;}
            .type48 {font-size:48px!important;line-height:58px!important;}
        }
    </style>
    <style type="text/css" class="export-delete">
        .composer--mobile table.row {width: 100%!important;max-width: 100%!important;}
        .composer--mobile td.row {width: 100%!important;max-width: 100%!important;}
        .composer--mobile .img-responsive img {width:100%!important;max-width: 100%!important;height: auto!important;margin: auto;}
        .composer--mobile .center-float {float: none!important;margin:auto!important;}
        .composer--mobile .center-text{text-align: center!important;}
        .composer--mobile .container-padding {width: 100%!important;padding-left: 15px!important;padding-right: 15px!important;}
        .composer--mobile .container-padding10 {width: 100%!important;padding-left: 10px!important;padding-right: 10px!important;}
        .composer--mobile .hide-mobile {display: none!important;}
        .composer--mobile .menu-container {text-align: center !important;}
        .composer--mobile .autoheight {height: auto!important;}
        .composer--mobile .m-padding-10 {margin: 10px 0!important;}
        .composer--mobile .m-padding-15 {margin: 15px 0!important;}
        .composer--mobile .m-padding-20 {margin: 20px 0!important;}
        .composer--mobile .m-padding-30 {margin: 30px 0!important;}
        .composer--mobile .m-padding-40 {margin: 40px 0!important;}
        .composer--mobile .m-padding-50 {margin: 50px 0!important;}
        .composer--mobile .m-padding-60 {margin: 60px 0!important;}
        .composer--mobile .m-padding-top10 {margin: 30px 0 0 0!important;}
        .composer--mobile .m-padding-top15 {margin: 15px 0 0 0!important;}
        .composer--mobile .m-padding-top20 {margin: 20px 0 0 0!important;}
        .composer--mobile .m-padding-top30 {margin: 30px 0 0 0!important;}
        .composer--mobile .m-padding-top40 {margin: 40px 0 0 0!important;}
        .composer--mobile .m-padding-top50 {margin: 50px 0 0 0!important;}
        .composer--mobile .m-padding-top60 {margin: 60px 0 0 0!important;}
        .composer--mobile .m-height10 {font-size:10px!important;line-height:10px!important;height:10px!important;}
        .composer--mobile .m-height15 {font-size:15px!important;line-height:15px!important;height:15px!important;}
        .composer--mobile .m-height20 {font-srobotoize:20px!important;line-height:20px!important;height:20px!important;}
        .composer--mobile .m-height25 {font-size:25px!important;line-height:25px!important;height:25px!important;}
        .composer--mobile .m-height30 {font-size:30px!important;line-height:30px!important;height:30px!important;}
        .composer--mobile .radius6 {border-radius: 6px!important;}
        .composer--mobile .fade-white {background-color: rgba(255, 255, 255, 0.8)!important;}
        .composer--mobile .rwd-on-mobile {display: inline-block!important;padding: 5px!important;}
        .composer--mobile .center-on-mobile {text-align: center!important;}
        .composer--mobile .rwd-col {width:100%!important;max-width:100%!important;display:inline-block!important;}
        .composer--mobile .type48 {font-size:48px!important;line-height:58px!important;}
    </style>
</head>

<body data-bgcolor="Body" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" bgcolor="#000000">

<span class="preheader-text" data-preheader-text style="color: transparent; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; visibility: hidden; width: 0; display: none; mso-hide: all;"></span>

<!-- Preheader white space hack -->
<div style="display: none; max-height: 0px; overflow: hidden;">
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<div data-primary-font="Mukta" data-secondary-font="Mukta" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;"></div>

<table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:100%;">
    <tr><!-- Outer Table -->
        <td align="center" data-bgcolor="Body" bgcolor="#000000" class="container-padding" data-composer>

            <table data-outer-table border="0" align="center" cellpadding="0" cellspacing="0" class="outer-table row" role="presentation" width="580" style="width:580px;max-width:580px;" data-module="black-logo">
                <!-- black-logo -->
                <tr>
                    <td height="60" style="font-size:60px;line-height:60px;" data-height="Spacing top">&nbsp;</td>
                </tr>
                <tr data-element="black-logo" data-label="Logo">
                    <td align="center">
                        <img style="width:189px;border:0px;display: inline!important;" src="{{asset('assets/logo.png')}}" width="189" border="0" editable="true" data-icon data-image-edit data-url data-label="Logo" data-image-width alt="logo">
                    </td>
                </tr>
                <tr>
                    <td height="30" style="font-size:30px;line-height:30px;" data-height="Spacing bottom">&nbsp;</td>
                </tr>
                <!-- black-logo -->
            </table>

            <table data-outer-table border="0" align="center" cellpadding="0" cellspacing="0" class="outer-table row" role="presentation" width="580" style="width:580px;max-width:580px;" data-module="black-intro-5">
                <!-- black-intro-5 -->
                <tr>
                    <td height="30" style="font-size:30px;line-height:30px;" data-height="Spacing top">&nbsp;</td>
                </tr>
                <tr data-element="black-intro-5-headline" data-label="Intro Headline">
                    <td class="type48" data-text-style="Intro Headline" align="center" style="font-family:'Mukta',Arial,Helvetica,sans-serif;font-size:64px;line-height:65px;font-weight:800;font-style:normal;color:#FFFFFF;text-decoration:none;letter-spacing:0px;">
                        <singleline>
                            <div mc:edit data-text-edit>
                                WELCOME TO CAPITAL CLUB
                            </div>
                        </singleline>
                    </td>
                </tr>
                <tr data-element="black-intro-5-headline" data-label="Intro Headline">
                    <td height="20" style="font-size:20px;line-height:20px;" data-height="Spacing under headline">&nbsp;</td>
                </tr>
                <tr data-element="black-intro-5-paragraph" data-label="Intro Paragraph">
                    <td data-text-style="Intro Paragraph" align="center" style="font-family:'Mukta',Arial,Helvetica,sans-serif;font-size:17px;line-height:32px;font-weight:600;font-style:normal;color:#FFFFFF;text-decoration:none;letter-spacing:0px;">
                        <singleline>
                            <div mc:edit data-text-edit>
                                You made the right choice. <br><br> As you explore all the courses and features available for you, save this password in case you need to login into your account again. <br> We do recommend you create a new password that's unique to you. <br> You can update your password under the Profile > Security sections in the platform. <br> <br> SEE YOU ON THE OTHER SIDE FELLOW GLITCH.
                            </div>
                        </singleline>
                    </td>
                </tr>
                <tr data-element="black-intro-5-paragraph" data-label="Intro Paragraph">
                    <td height="40" style="font-size:40px;line-height:40px;" data-height="Spacing under paragraph">&nbsp;</td>
                </tr>
                <tr data-element="black-intro-usercode" data-label="User Code">
                    <td align="center">
                        <!-- Use Code -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" align="center" class="row" width="580" style="width:580px;max-width:580px;">
                            <tr>
                                <td align="center" data-border-radius-default="0,6,36" data-border-radius-custom="User Code" data-bgcolor="User Code" bgcolor="#000000" style="border-radius: 15px;border: 2px dotted #FFFFFF;">
                                    <!-- Content -->
                                    <table border="0" cellspacing="0" cellpadding="0" role="presentation" align="center" class="row" width="580" style="width:580px;max-width:580px;">
                                        <tr>
                                            <td height="26" style="font-size:26px;line-height:26px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td class="center-text" data-text-style="Use Code" align="center" style="font-family:'Mukta',Arial,Helvetica,sans-serif;font-size:25px;line-height:30px;font-weight:300;font-style:normal;color:#999999;text-decoration:none;letter-spacing:0px;">
                                                <singleline>
                                                    <div mc:edit data-text-edit>
                                                        Your Password: <span style="color:#FFFFFF;">{{ $password }}</span>
                                                    </div>
                                                </singleline>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="20" style="font-size:20px;line-height:26px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                    <!-- Content -->
                                </td>
                            </tr>
                        </table>
                        <!-- User Code -->
                    </td>
                </tr>
                <tr data-element="black-intro-usercode" data-label="User Code">
                    <td height="40" style="font-size:40px;line-height:40px;" data-height="Spacing under user code">&nbsp;</td>
                </tr>
                <tr data-element="black-intro-5-button" data-label="Intro Button">
                    <td align="center">
                        <!-- Button -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" align="center">
                            <tr>
                                <td align="center" data-border-radius-default="0,6,36" data-border-radius-custom="Intro Button" data-bgcolor="Intro Button" bgcolor="#ffffff" style="border-radius: 6px;">
                                    <!--[if (gte mso 9)|(IE)]>
                                    <table border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tr>
                                            <td align="center" width="38"></td>
                                            <td align="center" height="60" style="height:60px;">
                                    <![endif]-->
                                    <singleline>
                                        <a href="{{ route('login') }}" mc:edit data-button data-text-style="Intro Button" style="font-family:'Mukta',Arial,Helvetica,sans-serif;font-size:18px;line-height:25px;font-weight:800;font-style:normal;color:#000000;text-decoration:none;letter-spacing:0px;padding: 16px 38px 16px 38px;display: inline-block;"><span>ACCESS YOUR ACCOUNT</span></a>
                                    </singleline>
                                    <!--[if (gte mso 9)|(IE)]>
                                    </td>
                                    <td align="center" width="38"></td>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                        <!-- Buttons -->
                    </td>
                </tr>
                <tr>
                    <td height="30" style="font-size:30px;line-height:30px;" data-height="Spacing bottom">&nbsp;</td>
                </tr>
                <!-- black-intro-5 -->

                </td>
                </tr><!-- Outer-Table -->
            </table>

</body>
</html>
