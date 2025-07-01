<?php

namespace Database\Seeders\Marketplace;

use App\Models\Asset\Category;
use App\Models\Pivot\PartnerProfileCategory;
use Illuminate\Support\Arr;
use App\Jobs\AddSpatieMediaJob;
use Illuminate\Database\Seeder;
use App\Models\Marketplace\PartnerProfile;
use App\Models\Marketplace\PartnerProfilePlan;
use App\Models\Marketplace\MarketPlaceCategory;
use App\Models\Marketplace\PartnerProfileBanner;
use App\Models\Marketplace\PartnerProfileReview;
use Illuminate\Support\Facades\DB;

class PartnerProfileSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate the tables
        DB::table('partner_profiles')->truncate();
        DB::table('partner_profile_banners')->truncate();


        $partnerProfiles = [
                [
                'title' => 'ConversionWise',
                'featured'=>true,
                'website_link' => 'https://conversionwise.com/',
                'redeem_link'=>'https://cc-marketplace.typeform.com/conversionwise',
                'category'=>'Saas',
                'short_description' => 'Boost CRO, enhancing e-commerce through rigorous testing and design, converting clicks into customers',
                'long_description' => '<div class="font-size:16px"><p><span style="">Founded in 2013 by Oliver Kenyon and Andy Haskins, ConversionWise quickly ascended to prominence, establishing itself as one of the foremost CRO (Conversion Rate Optimization) and landing page agencies in the digital realm.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Mission and Approach</span></strong></p>
                        <p><br></p>
                        <p><span style="">At its core, ConversionWise is driven by a mission to elevate online businesses by optimizing conversion rates through research, innovative design, and relentless testing. This approach not only enhances revenue per session, AOV (Average Order Value), and ROAS (Return on Ad Spend) but also cements the agency&rsquo;s reputation for excellence in delivering measurable results.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Expertise and Clientele</span></strong></p>
                        <p><br></p>
                        <p><span style="">With a team of over 40 conversion rate experts, ConversionWise has extended its expertise to over 3,500 brands. Their clientele ranges from e-commerce giants like GFUEL, The Essence Vault, SlimFast, and BodyBuilding.com, to renowned personalities such as Lionel Messi and Rob Lowe. This diverse clientele underscores the agency&apos;s versatile and adaptive strategy to CRO, tailored to meet the unique needs of each brand.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Achievements and Innovations</span></strong></p>
                        <p><br></p>
                        <p><span style="">A notable achievement in its illustrious journey is becoming the quickest agency to reach Platinum Partner Status with Convert.com, a testament to its impactful strategies and successful client outcomes. Furthermore, ConversionWise boasts the creation of more landing pages than any other agency worldwide, alongside developing CRO frameworks that have been adopted by millions of sites.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Commitment to Excellence</span></strong></p>
                        <p><br></p>
                        <p><span style="">This unparalleled expertise and commitment to innovation not only underline ConversionWise&apos;s standing in the industry but also its dedication to pushing the boundaries of what&apos;s possible in conversion rate optimization.</span></p></div>',
                'promo_line' => 'Save 10% on all packages',
                'instructions' => '<h4><strong><span style="">Instructions for Redeeming Offers</span></strong></h4>
                        <p><br></p>
                        <p><span style="">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                        <p><br></p>
                        <ol>
                            <li style="list-style-type:decimal">
                                <p><span style="">Click the &ldquo;</span><strong><span style="">REDEEM BENEFIT</span></strong><span style="">&rdquo; link to access the questionnaire.</span></p>
                            </li>
                            <li style="list-style-type:decimal">
                                <p><span style="">Review and submit your responses.</span></p>
                            </li>
                            <li style="list-style-type:decimal">
                                <p><span style="">The vendor will review your information.</span></p>
                            </li>
                            <li style="list-style-type:decimal">
                                <p><span style="">The vendor will contact you privately to discuss the next steps.</span></p>
                            </li>
                        </ol>
                        <p><br></p>
                        <p><span style="">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                'cc_benefits' => '<p><strong><span style="">Exclusive Offer for Capital Club Members</span></strong></p>
                        <p><br></p>
                        <p><span style="">Save 10% on the following packages</span></p>
                        <p><span style="">&nbsp;</span></p>
                        <ul>
                            <li style="list-style-type:disc">
                                <p><span style="">The Landing Page Design package for under 50,000 visitors/month on your website</span></p>
                            </li>
                            <li style="list-style-type:disc">
                                <p><span style="">Ongoing CRO and AB testing package for over 50,000 visitors/month on your website</span></p>
                            </li>
                        </ul>',
                'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/conversionwise/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/conversionwise/banners/1.jpg'),
                    public_path('/images/marketplace/conversionwise/banners/2.jpg'),
                    public_path('/images/marketplace/conversionwise/banners/3.jpg'),
                    public_path('/images/marketplace/conversionwise/banners/4.jpg'),
                ]
            ],

            [

            'title' => 'SuccessRoom',
            'featured'=>true,
            'category'=>'Saas',
            'website_link' => 'https://www.successroom.org/',
            'redeem_link'=>'https://cc-marketplace.typeform.com/successroom',
            'short_description' => 'Advertise Fearlessly with Verified Partner Ad Accounts',
            'long_description' => '<div class="font-size:16px"><p><strong><span style="">Removing Barriers to Success</span></strong></p>
                    <p><br></p>
                    <p><span style="">Advertise without fear using verified partner ad accounts that eliminate barriers to customer acquisition, sales growth, account bans, and partner loyalty. Enjoy the benefits of dedicated support and robust ad account management.</span></p>
                    <p><br></p>
                    <p><strong><span style="">Key Benefits</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc">
                            <p><span style="">Dedicated Account Manager: Each client receives personalized attention from a dedicated account manager.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Cheaper CPM &amp; CPA: Benefit from cost-effective advertising with lower Cost Per Mille (CPM) and Cost Per Acquisition (CPA).</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Fast Top-Ups: Quick account top-ups, sometimes as fast as 2 minutes, ensure uninterrupted advertising.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Stable and Strong Ad Accounts: Guaranteed stability and strength of ad accounts for reliable performance.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Unlimited Agency Ad Accounts: Access unlimited ad accounts for extensive campaign reach.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Direct Platform Support: Direct communication with platform representatives provides daily support.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">Fund Transfers: In case of account blocks, funds can be swiftly transferred to new accounts.</span></p>
                        </li>
                        <li style="list-style-type:disc">
                            <p><span style="">SuccessRoom Software Dashboard: Smooth and fast service is facilitated through the SuccessRoom software dashboard.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="">Empowering Your Campaigns</span></strong></p>
                    <p><br></p>
                    <p><span style="">Whether you are a seasoned marketer or just starting, these agency accounts are designed to empower your campaigns and prioritize your success.</span></p></div>',
            'promo_line' => 'Capital Club prefered pricing and service',
            'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                    <p>&nbsp;</p>
                    <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                    <p>&nbsp;</p>
                    <ol>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                    <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
            'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
            'cc_benefits' => 'Capital Club members will receive prefered pricing and service for SuccessRoom Agency Ad Accounts.',
            'is_benefits' => TRUE,
            'published_at' => NULL,
            'logo' => public_path('/images/marketplace/successroom/logo.svg'),


            ],

            [
                'title' => 'Txtcart App',

                'featured'=>true,
                'category'=>'Saas',
                'website_link' => 'https://txtcartapp.com/',
                'redeem_link'=>'https://platform.shoffi.app/r/rl_1bnvScVc',
                'short_description' => 'Conversational SMS Marketing Powered by AI to Recover Abandoned Carts and Boost Sales',
                'long_description' => '<div class="font-size:16px"><p><span style="">TxtCart is an autonomous SMS marketing platform designed specifically for eCommerce. Leveraging the best of human empathy and AI, TxtCart turns visitors into profitable conversations.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Trusted by Thousands</span></strong></p>
                        <p><br></p>
                        <p><span style="">Over 10,000 Shopify brands have relied on TxtCart to power cart recovery and generate great ROI with 2-way SMS conversations. It is the only SMS bump tool needed to recover abandoned carts, send SMS alerts, and follow up with customers.</span></p>
                        <p><br></p>
                        <p><strong><span style="">Key Features and Benefits</span></strong></p>
                        <p><br></p>
                        <ul>
                            <li style="list-style-type:disc">
                                <p><span style="">SMS Subscriber List Growth: TxtCart helps businesses grow a compliant SMS marketing subscriber list.</span></p>
                            </li>
                            <li style="list-style-type:disc">
                                <p><span style="">SMS Automation: Utilize SMS automation for abandoned cart recovery.</span></p>
                            </li>
                            <li style="list-style-type:disc">
                                <p><span style="">Customer Segmentation: Segment customers to better understand data and tailor marketing strategies.</span></p>
                            </li>
                        </ul>
                        <p><br></p>
                        <p><strong><span style="">Pioneering Conversational Commerce</span></strong></p>
                        <p><br></p>
                        <p><span style="">TxtCart has pioneered Conversational Commerce with real humans and powerful AI. This innovative approach allows for live recovery of sales with emotive texts driven by AI, ensuring a personalized and effective marketing experience.</span></p>
                        <p><br></p>
                        <p><span style="">TxtCart is the ultimate tool for eCommerce brands looking to enhance their SMS marketing strategies and drive significant business growth.</span></p></div>',
                'promo_line' => 'Save 25% on all packages',
                'instructions' => '<h4><strong>General Instructions for Redeeming Offers</strong></h4>
                        <p>&nbsp;</p>
                        <ol>
                        <li style="font-weight: 400;"><span style="font-weight: 400;">Click the provided </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">" link to access the offer page.</span></li>
                        <li style="font-weight: 400;"><span style="font-weight: 400;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></li>
                        <li style="font-weight: 400;"><span style="font-weight: 400;">Follow the prompts to continue. IMPORTANT: Our unique Capital Club partner benefits will be added automatically</span></li>
                        </ol>
                        <p>&nbsp;</p>
                        <p><span style="font-weight: 400;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></p>
                        <p><br /><br /><br /></p>',
                'instructions_note' => 'This Link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing this Link on online forums or websites may result in revocation of your membership.',
                'cc_benefits' => 'Save 25% on all available packages from TxtCart.',
                'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/txtcart/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/txtcart/banners/1.jpg'),
                        public_path('/images/marketplace/txtcart/banners/2.jpg'),
                        public_path('/images/marketplace/txtcart/banners/3.jpg'),
                        public_path('/images/marketplace/txtcart/banners/4.jpg'),
                        public_path('/images/marketplace/txtcart/banners/5.jpg'),
                        public_path('/images/marketplace/txtcart/banners/6.jpg'),
                        public_path('/images/marketplace/txtcart/banners/7.jpg'),

                    ]
            ],

                [
                    'title' => 'Loopex Digital',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://www.loopexdigital.com/',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/loopexdigital/',
                    'short_description' => 'Drive more sales and revenue with SEO services from an award-winning full-service SEO agency',
                    'long_description' => '<p><span style="">Loopex Digital specializes in boosting organic traffic and sales through expert SEO services. Understanding that each website has unique needs, Loopex Digital develops a tailored SEO strategy for every client. Their approach begins with a comprehensive SEO audit that assesses the current standing of a site and identifies key opportunities for growth.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Core Areas of Focus</span></strong></p>
                            <p><br></p>
                            <ul>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Link Building:</span></p>
                                </li>
                            </ul>
                            <p><span style="">Loopex Digital strengthens a site&rsquo;s authority and improves search rankings by building high-quality, relevant backlinks. This not only boosts SEO performance but also enhances visibility to potential customers.</span></p>
                            <p><br></p>
                            <ul>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Technical SEO:</span></p>
                                </li>
                            </ul>
                            <p><span style="">The team dives deep into the technical health of a website, optimizing everything from site speed and mobile responsiveness to structured data and XML sitemaps. This ensures that search engines can crawl and index the site efficiently, leading to better search result placements.</span></p>
                            <p><br></p>
                            <ul>
                                <li style="list-style-type:disc;">
                                    <p><span style="">On-Site Content Optimization:</span></p>
                                </li>
                            </ul>
                            <p><span style="">From keyword-rich copy that captivates potential customers to metadata that catches search engine attention, Loopex Digital optimizes every element of on-site content.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Promising Results</span></strong></p>
                            <p><br></p>
                            <p><span style="">By integrating these strategies, Loopex Digital promises significant improvements in organic traffic, online visibility, and sales. Clients can expect to see a 70-80% increase in organic traffic within just six months. With Loopex Digital, clients gain more than just SEO expertise; they gain a dedicated partner committed to driving success.</span></p>
                            <p><br></p>
                            <p><span style="">Loopex Digital helps turn clicks into customers and significantly boost sales.</span></p>',
                    'promo_line' => 'Save 15% on your purchase',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'Save 15% on all custom services from Loopex Digital, tailored for your needs.',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/loopex/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/loopex/banners/1.jpg'),
                        public_path('/images/marketplace/loopex/banners/2.jpg'),
                        public_path('/images/marketplace/loopex/banners/3.jpg'),
                        public_path('/images/marketplace/loopex/banners/4.jpg'),
                    ]
                ],

                [
                    'title' => 'YoUGC',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://yougc.io/en',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/yougc',
                    'short_description' => 'Offering high-quality user-generated content for e-commerce stores, making high-converting content accessible to all',
                    'long_description' => '<p><strong><span style="">Expertise and Mission</span></strong></p>
                            <p><br></p>
                            <p><span style="">YoUGC&apos;s deep understanding of ad performance and media buying sets them apart. They know how to increase Click-Through Rates (CTRs) with compelling visual hooks, offering insights that typical content creators might overlook.</span></p>
                            <p><br></p>
                            <p><span style="">YoUGC&apos;s mission is to make high-quality UGC content accessible to all, from new e-commerce entrepreneurs to owners of seven-figure businesses.</span></p>
                            <p><span style="">Innovative Approach</span></p>
                            <p><br></p>
                            <p><span style="">YoUGC has revolutionised the UGC agency model with a series of transformative changes:</span></p>
                            <p><br></p>
                            <ul>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Centralized Production: Instead of sending products to content creators, YoUGC has established five production houses in Madrid. This ensures that every element of the script is captured with the highest production quality.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Quality Control: By overseeing the entire production process, YoUGC guarantees superior video quality, resulting in better-performing ads.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Efficiency and Cost-Effectiveness: This method allows YoUGC to deliver content three times faster and four times cheaper than other agencies.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Global Reach: The centralized model provides access to thousands of content creators from around the world, catering to diverse languages and cultures.</span></p>
                                </li>
                            </ul>
                            <p><br></p>
                            <p><br></p>',
                    'promo_line' => 'Save 15% on all packages',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'Save 15% on all packages from YoUGC.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/yougc/logo.svg'),

                ],



                [
                    'title' => 'ShipSigma',

                    'featured'=>true,
                    'category' => 'Fulfilment',
                    'website_link' => 'https://shipsigma.com/',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/shipsigma/',
                    'short_description' => 'Slash shipping costs by 25% for high-volume UPS/FedEx shipping, no carrier or service level changes needed',
                    'long_description' => '<p><span style="">ShipSigma leverages proprietary technology and a proven process to help high-volume UPS and FedEx parcel customers reduce shipping costs by an average of 25% without changing carriers or service levels. As a premier tech-enabled service provider, ShipSigma specializes in logistics spend management and optimization through its advanced technology, Sigma.</span></p>
                            <p><br></p>
                            <p><span style="">ShipSigma is dedicated to providing white-glove services, working closely with high-volume shippers to decrease expenses, streamline operations, and enhance efficiencies. Their team of professionals crafts innovative, customized solutions to navigate the shipping industry with precision and commitment.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Exceptional Outcomes</span></strong></p>
                            <p><br></p>
                            <p><span style="">Through their unique approach, ShipSigma delivers unmatched outcomes, ensuring that clients achieve significant cost savings and operational improvements without compromising on carrier or service quality.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Tailored Solutions</span></strong></p>
                            <p><br></p>
                            <p><span style="">ShipSigma collaborates closely with clients to develop tailored strategies aligning with their needs and objectives. Through a dedicated team of professionals, ShipSigma navigates the shipping industry with precision and commitment, delivering unmatched outcomes. Businesses partnering with ShipSigma can revolutionise their logistics operations and drive sustainable growth.</span></p>
                            <p><br></p>',
                    'promo_line' => 'Save 10% on all packages',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'Save 10% on all ShipSigma Packages.',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/shipsigma/logo.png'),
                    'banners' => [
                        public_path('/images/marketplace/shipsigma/banners/1.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/2.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/3.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/4.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/5.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/6.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/7.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/8.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/9.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/10.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/11.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/12.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/13.jpg'),
                        public_path('/images/marketplace/shipsigma/banners/14.jpg'),

                    ]
                ],



                [
                    'title' => 'Agave Care',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'website_link' => 'https://agavecareshop.com/',
                    'redeem_link' => 'https://agavecareshop.com//',
                    'short_description' => 'Biodegradable agave straws and cutlery offer a guilt-free alternative to plastic, promoting a greener planet',
                    'long_description' => '<p><span style="">Agave Care is deeply committed to social responsibility, actively collaborating with environmental groups and supporting causes that align with their values. By utilizing recycled materials in their operations and packaging, they significantly minimize waste. As a certified minority-owned enterprise affiliated with the National Minority Supplier Development Council (NMSDC), Agave Care champions diversity and inclusion within the business community.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Eco-Friendly Products</span></strong></p>
                            <p><br></p>
                            <p><span style="">Their product line includes biodegradable straws and cutlery made from natural, renewable resources, providing a sustainable alternative to traditional single-use items. Agave Care ensures that all products meet rigorous safety and environmental standards, catering to diverse needs with a variety of sizes and styles.</span></p>
                            <p><br></p>
                            <p><br></p>',
                    'promo_line' => 'Save 15% on all products',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'This code is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing this code on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 15% on all Agave Care products.',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/agave/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/agave/banners/1.jpg'),
                        public_path('/images/marketplace/agave/banners/2.jpg'),
                        public_path('/images/marketplace/agave/banners/3.jpg'),
                        public_path('/images/marketplace/agave/banners/4.jpg'),
                        public_path('/images/marketplace/agave/banners/5.jpg'),

                    ]
                ],


                [
                    'title' => 'Lott Agency',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://www.lott-agency.com/',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/lottagency/',
                    'short_description' => 'Leveraging agency ad accounts to maximize your ad\'s ROI',
                    'long_description' => '<p><span style="">Lott Agency ensures that clients can bid farewell to ad spend limits, compliance roadblocks, and bans, welcoming a steady advertising momentum and the highest possible return on investment (ROI).</span></p>
                            <p><br></p>
                            <p><strong><span style="">Unlimited Ad Spending</span></strong></p>
                            <p><br></p>
                            <p><span style="">Clients can effortlessly scale their campaigns on rapidly growing platforms with Unrivaled Advertising Experience. The company provides direct representatives, robust compliance support, and no limits on spending, targeting, or locations, ensuring unlimited advertising potential.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Compliance and Profitability</span></strong></p>
                            <p><br></p>
                            <p><span style="">Using ad agency accounts reduces the risk of bans by up to 99% with expert compliance services. The team diligently ensures that ads meet each platform&apos;s specific criteria, providing guidance and support to maintain advertising momentum and profitability.</span></p>
                            <p><br></p>
                            <p><strong><span style="">24/7 Support</span></strong></p>
                            <p><br></p>
                            <p><span style="">Unrivaled Advertising Experience offers continuous assistance for all advertising needs. The dedicated team is available day and night, ready to help clients navigate any challenges in their advertising journey.</span></p>
                            <p><br></p>
                            <p><br></p>',
                    'promo_line' => 'Save $50 USD on sign-up',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'CC members receive a $50 discount on their sign-up fees.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/lott/logo.svg'),

                ],

                [
                    'title' => 'Scalix',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://scalix.agency/',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/scalix/',
                    'short_description' => 'Experience hassle-free advertising on Facebook, Google, and TikTok with Scalix Agency ad accounts',
                    'long_description' => '<p><strong><span style="">Hassle-Free Advertising</span></strong></p>
                            <p><br></p>
                            <p><span style="">Scalix Agency offers a seamless advertising experience on major platforms like Facebook, Google, and TikTok. With unlimited spending, quick top-ups, and dedicated support, Scalix Agency ensures a hassle-free advertising journey.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Empowering Your Campaigns</span></strong></p>
                            <p><br></p>
                            <p><span style="">At Scalix Agency, the focus is on empowering advertising campaigns across various platforms. The agency provides high-quality ad accounts with no spending limits and no risk of bans, ensuring smooth operations regardless of the business vertical.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Quick Account Top-Ups and Direct Support</span></strong></p>
                            <p><br></p>
                            <p><span style="">Scalix Agency&apos;s quick account top-ups and direct platform support result in better advertising rates, allowing clients to concentrate on growing their business. The agency&apos;s dedicated team navigates complex ad regulations to scale digital advertising efforts efficiently.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Trust and Efficiency</span></strong></p>
                            <p><br></p>
                            <p><span style="">Clients can trust Scalix Agency to handle the intricacies of advertising regulations and ensure efficient scaling of digital advertising campaigns. The agency&apos;s comprehensive support and strategic approach empower businesses to achieve their advertising goals.</span></p>',
                    'promo_line' => 'Save $200 USD',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style=WinningHunter"font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'CC members receive a $200 discount when creating an ad account.',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/scalix/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/scalix/banners/1.jpg'),
                        public_path('/images/marketplace/scalix/banners/2.jpg'),
                        public_path('/images/marketplace/scalix/banners/3.jpg'),
                    ]
                ],




                [


                    'title' => 'Chronos Agency',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://chronos.agency/',
                    'redeem_link'=>'https://cc-marketplace.typeform.com/chronosagency',
                    'short_description' => 'Speed up your eCom Email & SMS growth with Chronos - top 0.02% Klaviyo Elite Master Partner',
                    'long_description' => '<div class="font-size:16px"><p><strong><span style="">Accelerate Your eCom Email &amp; SMS Growth</span></strong></p>
                            <p><br></p>
                            <p><span style="">Chronos Agency, a top 0.02% Klaviyo Elite Master Partner, specializes in accelerating eCommerce email and SMS growth. With over $250 million generated and more than 500 brands scaled, Chronos Agency is a leader in the industry.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Cultivating Growth for DTC Brands</span></strong></p>
                            <p><br></p>
                            <p><span style="">At Chronos Agency, growth for Direct-to-Consumer (DTC) brands is cultivated by turning every $1 into $43.80. The agency implements lifecycle marketing solutions, focusing on high-profit email, SMS, and push marketing strategies.</span></p>
                            <p><br></p>
                            <p><strong><span style="">Achievements and Services</span></strong></p>
                            <p><br></p>
                            <p><span style="">Here&rsquo;s an overview of Chronos Agency&rsquo;s accomplishments:</span></p>
                            <ul>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Over 8 figures in monthly trackable revenue generated through email, SMS, and push marketing.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">More than 500 satisfied eCommerce clients.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">An average revenue and profit lift of 27%.</span></p>
                                </li>
                                <li style="list-style-type:disc;">
                                    <p><span style="">Comprehensive management of email, SMS, and push marketing.</span></p>
                                </li>
                            </ul>
                            <br>
                            <p><span style="">As a Klaviyo Elite Master Partner, ranking in the top 0.02%, Chronos Agency offers full-service solutions that drive significant growth for its clients.</span></p>',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'promo_line' => 'Save $2000 USD | Capital Club Exclusive',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the &ldquo;</span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => '<p><strong>Exclusive Offer for Capital Club Members</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Only $1,950 for Capital Club members! Receive a substantial discount of $2,050 on a package valued at $4,000. Save more than 50%!</span></p>',
                    'logo' => public_path('/images/marketplace/chronos/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/chronos/banners/1.jpg'),
                        public_path('/images/marketplace/chronos/banners/2.jpg'),
                        public_path('/images/marketplace/chronos/banners/3.jpg'),
                        public_path('/images/marketplace/chronos/banners/4.jpg'),
                    ]

                    ],



                    [
                        'title' => 'Moonscale Agency',

                        'featured'=>true,
                        'category'=>'Marketing',
                        'website_link' => 'https://moonscale.agency/',
                        'redeem_link' => 'https://cc-marketplace.typeform.com/moonscaleagency/',
                        'short_description' => 'FB agency ad accounts enabling unlimited daily spend, cheaper CPMs, and 24/7 support',
                        'long_description' => '<p><span style="">Moonscale is a leading provider of Facebook agency ad accounts, offering a range of benefits tailored to meet the needs of advertisers. The service allows users to link their own credit cards, eliminating the hassle of top-up fees.</span></p>
                                <p><br></p>
                                <p><strong><span style="">Key Benefits</span></strong></p>
                                <p><br></p>
                                <ul>
                                    <li style="list-style-type:disc;">
                                        <p><span style="">Unlimited Daily Spend: Advertisers can spend without daily limits, providing flexibility and control over their campaigns.</span></p>
                                    </li>
                                    <li style="list-style-type:disc;">
                                        <p><span style="">Cheaper CPMs: Moonscale offers cost-effective CPM rates, making it a preferred choice for budget-conscious advertisers.</span></p>
                                    </li>
                                    <li style="list-style-type:disc;">
                                        <p><span style="">24/7 Support: Users have access to round-the-clock customer support, ensuring any issues or questions are promptly addressed.</span></p>
                                    </li>
                                    <li style="list-style-type:disc;">
                                        <p><span style="">Ad Account Replacement Guarantee: Moonscale guarantees the replacement of ad accounts if needed, ensuring continuous and smooth advertising operations.</span></p>
                                    </li>
                                </ul>
                                <p><br></p>
                                <p><strong><span style="">Payment Methods</span></strong></p>
                                <p><br></p>
                                <p><span style="">Moonscale accepts payments via credit card, PayPal, or cryptocurrency, offering a variety of convenient payment options for its clients.</span></p>',
                        'promo_line' => 'Save $100 USD on sign-up',
                        'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                                <p>&nbsp;</p>
                                <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                                <p>&nbsp;</p>
                                <ol>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                                <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                                </ol>
                                <p>&nbsp;</p>
                                <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                        'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                        'cc_benefits' => 'CC members save $100 USD on initial sign-up fees.',
                        'is_benefits' => TRUE,
                        'published_at' => now(),
                        'logo' => public_path('/images/marketplace/moonscale/logo.svg'),
                        'banners' => [
                            public_path('/images/marketplace/moonscale/banners/1.jpg'),
                            public_path('/images/marketplace/moonscale/banners/2.jpg'),
                            public_path('/images/marketplace/moonscale/banners/3.jpg'),
                            public_path('/images/marketplace/moonscale/banners/4.jpg'),
                            public_path('/images/marketplace/moonscale/banners/5.jpg'),

                        ]
                    ],

                [
                    'title' => 'Minea',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://en.minea.com/',
                    'redeem_link'=>'https://app.minea.com/en/go-premium?ref=capitalclub27',
                    'short_description' => 'Minea is the world’s leading dropshipping product research tool empowering you with the insights you need',
                    'long_description' => '<div class="font-size:16px"><p><span style="font-weight: 400;">Minea is one of the world&rsquo;s leading dropshipping product research tool, designed to empower e-commerce businesses with the insights needed to make confident and informed decisions.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Comprehensive Database and Insights</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Minea offers an all-in-one solution for dropshipping success with a vast database of 20 million ads, updated daily. This extensive resource provides access to a wide range of potential winning products and invaluable insights into competitors&rsquo; advertising strategies across major paid traffic networks like Facebook, Pinterest, and TikTok. Additionally, Minea allows tracking of influencer product placements on Instagram and Snapchat.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Advanced AI Tools</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Minea\'s advanced AI tools, including Magic Search, enable users to quickly find trending products, gauge market saturation, and search for similar products by image or text. Users can also explore competitors&rsquo; ads to understand their strategies and refine their own.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Customizable Features</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">The platform\'s customizable features allow users to create product lists, save search filters for later use, and utilize pre-set filters for easier research. The intuitive interface streamlines the workflow, helping users save time and money. With asset downloads, AI-generated product descriptions, and one-click import to Shopify, businesses can rapidly move from concept to launch.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Suitable for All Experience Levels</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Whether new to dropshipping or an experienced professional, Minea equips users with everything needed for success. The platform helps reduce ad spending, find profitable products, and stay ahead of the competition.</span></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Minea is the ultimate tool for dropshipping, providing comprehensive insights, advanced AI tools, and customizable features to ensure e-commerce businesses thrive.</span></p></div>',
                    'promo_line' => 'Save 30% and more',
                    'promo_code' => 'CAPITALCLUB',
                    'instructions' => '<h4><strong>General Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Copy our unique Capital Club partner code</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the provided </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">" link to access the offer page.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => '<p><strong>Capital Club only exclusive benefits!</strong></p>
                            <p>&nbsp;</p>
                            <p><strong>30% Discount for 2 Months:</strong></p>
                            <p><span style="font-weight: 400;">CC members save 30% on subscription fees for the first two months.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>10k Free Credits:</strong></p>
                            <p><span style="font-weight: 400;">CC members receive $50 worth of free credits on sign-up.</span></p>
                            <p>&nbsp;</p>',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/minea/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/minea/banners/1.jpg'),
                        public_path('/images/marketplace/minea/banners/2.jpg'),
                        public_path('/images/marketplace/minea/banners/3.jpg'),
                        public_path('/images/marketplace/minea/banners/4.jpg'),

                    ]
                ],

                [
                    'title' => 'Reals',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'website_link' => 'https://rea.ls/',
                    'redeem_link' => 'https://cc-marketplace.typeform.com/reals/',
                    'short_description' => 'The Ultimate “Done-For-You” Solution To 10x Your Brand - Guaranteed by Philipp Schoeffmann',
                    'long_description' => '<p>This service is designed to help clients grow their sales and boost their influence with daily custom content, just like the top 0.1%, without the overhead and usual time waste.</p>
                            <p><strong>Key Benefits</strong></p>
                            <p>This solution leverages the biggest opportunity of our lifetime by:</p>
                            <ul>
                            <li>Generating visibility on a large scale</li>
                            <li>Building trust and authority akin to a celebrity</li>
                            <li>Creating inbound sales opportunities</li>
                            <li>Significantly increasing conversion rates</li>
                            </ul>
                            <p><strong>Common Challenges</strong></p>
                            <p>Clients who haven\'t been successful yet often face:</p>
                            <ul>
                            <li>AnxietyWinningHunter about what to post, how, and when, fearing another failed attempt</li>
                            <li>Lack of execution due to insufficient time and the high cost of hiring a consistent team</li>
                            </ul>
                            <p><strong>Philipp Schoeffmann&rsquo;s Solution</strong></p>
                            <p>The service handles everything, ensuring clients get noticed and achieve results without lifting a finger.</p>
                            <p><strong>You will Receive&nbsp;</strong></p>
                            <p>Custom Content Creation:</p>
                            <ul>
                            <li>Quotes: Inspired by Alex Hormozi</li>
                            <li>Viral Videos: Like Phil</li>
                            <li>Talking Heads: Similar to Codie</li>
                            <li>Memes: Like GaryVee</li>
                            </ul>
                            <p>Clients will stand out with their own talking head videos for authority, quotes for followers to share, viral videos, and memes for views, along with other formats that perform well.</p>
                            <p><strong>Content Package</strong></p>
                            <p>30 Pieces of Custom High-Quality Content Each Month:</p>
                            <ul>WinningHunter
                            <li>Content Strategy: Developing post content that fits the client&rsquo;s brand</li>
                            <li>Content Production: Creating posts with professional editing</li>
                            <li>Content Distribution: Publishing the content for the client</li>
                            </ul>
                            <p><strong>Peace of Mind</strong></p>
                            <p>The service ensures a fast and effortless process for the client. Each month, hundreds of personal brands are analyzed to template what works right now. This winning formula is then applied to the client\'s content. No more confusion, overhead, or time wasted. Just daily content that works.</p>
                            <p><strong>Guarantee</strong></p>
                            <p>A 100% money-back guarantee is provided.</p>',
                    'promo_line' => 'Save $2000 USD',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => '<p><strong>Exclusive Offer for Capital Club Members</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Only $2,470 for Capital Club members! Receive a substantial discount of $2,000 on a package valued at $4,500.</span></p>',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/reals/logo.svg'),

                ],


                [
                    'title' => 'Beamly.ai',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://beamly.ai/',
                    'redeem_link'=>'https://cc-marketplace.typeform.com/beamly',
                    'short_description' => 'Interact and engage with thousands of Instagram profiles per day without sending cold DM’s or other manual strategies',
                    'long_description' => '<div class="font-size:16px"><p>Beamly helps users interact and engage with thousands of Instagram profiles daily based on specified account interests and niches. This service brings new followers, likes, and leads without the need for cold DMs or other manual strategies.</p>
                            <p><strong>Key Benefits</strong></p>
                            <ul>
                            <li>Automated Engagement: Interact with targeted profiles effortlessly, increasing visibility and engagement.</li>
                            <li>Custom Targeting: Configure targeting settings based on the profiles users want to engage with, ensuring maximum desired outcomes.</li>
                            <li>Versatile Use Cases: Suitable for business pages, personal brands, and dating optimization.</li>
                            </ul>
                            <p><strong>Service Features</strong></p>
                            <ul>
                            <li>New Followers and Likes: Gain authentic followers and likes, enhancing social proof and credibility.</li>
                            <li>Lead Generation: Attract potential leads organically through strategic engagement.</li>
                            <li>Tailored Targeting: Specify the interests and niches for profile engagement, allowing for a highly personalized approach.</li>
                            </ul>
                            <p><strong>Why Beamly?</strong></p>
                            <p>Beamly understands that social media is pivotal for building relationships and growing businesses. By connecting with more targeted individuals, users can enhance the quality of their network, drive more sales, and cultivate a genuine following of real users.</p>
                            <p><strong>How It Works</strong></p>
                            <ul>
                            <li>Specify Interests and Niches: Users provide details on the profiles they want to engage with.</li>
                            <li>Configuration: Beamly configures the targeting settings to align with the user&rsquo;s goals.</li>
                            <li>Automated Interaction: Beamly handles the engagement process, bringing new followers, likes, and leads directly to the user.</li>
                            </ul>
                            <p>Beamly offers a streamlined solution for growing a robust and engaged Instagram presence tailored to individual or business needs.</p></div>',
                    'promo_line' => 'Save up to 38%',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => '<p><strong>Exclusive Offer for Capital Club Members</strong></p>
                            <p>&nbsp;</p>
                            <p><strong>Tier 1 Package</strong></p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The standard market price for this package is $400 USD per month.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">CC members receive a discounted rate of $250 USD per month.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Tier 2 Package</strong><span style="font-weight: 400;">&nbsp;</span></p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The standard market price for this package is $497 USD per month.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">CC members receive a discounted rate of $350 USD per month.</span></li>
                            </ul>',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/beamly/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/beamly/banners/1.jpg'),
                        public_path('/images/marketplace/beamly/banners/2.jpg'),
                        public_path('/images/marketplace/beamly/banners/3.jpg'),
                        public_path('/images/marketplace/beamly/banners/4.jpg'),

                    ]
                ],

                [
                    'title' => 'Supliful',

                    'featured'=>true,
                    'category'=>'Fulfilment',
                    'website_link' => 'https://supliful.com/',
                    'redeem_link' => 'https://get.supliful.com/CapitalClub/',
                    'short_description' => 'Start your supplement brand — Choose from dozens of white-label supplements and vitamins that fit your brand concept',
                    'long_description' => '<p><span style="font-weight: 400;">Supliful offers a seamless way to start your supplement brand with on-demand fulfillment, no upfront fees, and no minimums. Choose from dozens of white-label supplements and vitamins that fit your brand concept.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Key Benefits</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Risk-Free Launch: Start your supplement brand without any upfront costs or financial risk.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Quick and Simple: Effortlessly launch your products with on-demand fulfillment.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">No Minimums: Order as needed, with no minimum order requirements.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Why Supliful?</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Supliful is your ticket to the big leagues of the e-commerce world. The platform enables aspiring entrepreneurs to launch products that have the potential to grow into 7 or 8-figure brands. It&rsquo;s a game-changer for those looking to enter the consumer packaged goods market without hefty upfront costs.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Proven Success</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Over 100,000 sellers are already succeeding with Supliful, shipping millions of orders. Whether you\'re testing the market or ready to scale, Supliful supports you every step of the way.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Features</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Customizable Products: Choose from a wide range of supplements and vitamins to fit your brand concept.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Seamless Integration: Easily integrate Supliful with your e-commerce platform.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Efficient Fulfillment: Manage and ship your products with ease, ensuring a smooth customer experience.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Join the Winners</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Don\'t miss out on the opportunity to turn big dreams into big bucks. Join the crowd of successful sellers who are transforming their ambitions into profitable realities with Supliful.</span></p>',
                    'promo_line' => 'Save 20% for select Supliful services',
                    'instructions' => '<h4><strong>General Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the provided </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">" link to access the offer page.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Follow the prompts to continue. IMPORTANT: Our unique Capital Club partner benefits will be added automatically</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This Link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing this Link on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => '<p><strong>Exclusive Pricing on Select Service Packages</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Brand Accelerator: $1,592 (Save $407)</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Shopify Store Design: $759 (Save $190)</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Label Design Service: $159 (Save $40)</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Free First Month: When subscribing to a Starter plan</span></li>
                            </ul>',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/supliful/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/supliful/banners/1.jpg'),
                        public_path('/images/marketplace/supliful/banners/2.jpg'),
                        public_path('/images/marketplace/supliful/banners/3.jpg'),
                        public_path('/images/marketplace/supliful/banners/4.jpg'),
                        public_path('/images/marketplace/supliful/banners/5.jpg'),

                    ]
                ],


                [
                    'title' => 'dropship.io',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://www.dropship.io/',
                    'redeem_link'=>'https://www.dropship.io/',
                    'short_description' => 'Discover Winning Products To Sell Built by sellers for sellers',
                    'long_description' => '<div class="font-size:16px"><p><strong>Discover Winning Products To Sell</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Find and monitor stores to gain insights into their revenue, sales, products, apps, and more.</span></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Dropship.io is designed by sellers for sellers, with the mission to help entrepreneurs start and grow successful businesses. As e-commerce continues to expand, Dropship.io provides innovative tools, data, and resources to enable entrepreneurs to seize these opportunities.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Mission</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Dropship.io is committed to empowering entrepreneurs with advanced solutions that simplify the process of launching and growing e-commerce businesses successfully.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Foundation and Purpose</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Founded in 2020, Dropship.io was established to tackle the challenges faced by store owners in finding profitable products to sell online. The platform aims to streamline and enhance the product discovery process.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Long-Term Vision</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Dropship.io strives to develop sophisticated solutions that identify new and trending products from various platforms and channels. The ultimate goal is to become the go-to platform for e-commerce store owners seeking to expand their product catalogs and stay ahead of market trends.</span></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Entrepreneurs can join Dropship.io to leverage its innovative tools, discover winning products, and achieve success in their e-commerce ventures.</span></p></div>',
                    'promo_line' => 'Save 25% on all subscriptions',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'CC members will receive a 25% discount on all subscriptions.',

                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/dropship/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/dropship/banners/1.jpg'),
                        public_path('/images/marketplace/dropship/banners/2.jpg'),
                        public_path('/images/marketplace/dropship/banners/3.jpg'),
                        public_path('/images/marketplace/dropship/banners/4.jpg'),
                        public_path('/images/marketplace/dropship/banners/5.jpg'),
                        public_path('/images/marketplace/dropship/banners/6.jpg'),
                        public_path('/images/marketplace/dropship/banners/7.jpg'),


                    ]
                ],

                [
                    'title' => 'DAYONE',

                    'featured'=>true,
                    'category'=>'Fulfilment',
                    'website_link' => 'https://www.dayonefulfillment.com/',
                    'redeem_link'=>'https://www.dayonefulfillment.com/capital-club',
                    'short_description' => 'A comprehensive fulfillment service, catering to e-commerce entrepreneurs with end-to-end solutions',
                    'long_description' => '<div class="font-size:16px"><p><span style="font-weight: 400;">DayOne offers comprehensive fulfillment services tailored for e-commerce entrepreneurs, providing end-to-end solutions from sourcing to shipping. Their services are customized to meet individual needs, ensuring a seamless journey from start to finish.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Company Background</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Founded in March 2013, DayOne specializes in cross-border export e-commerce, dropshipping, traditional foreign trade, and related fields. The company integrates product development, customization, procurement, sales, and service for a wide range of products, both domestic and international.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Professionalism and Innovation</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">With over 10 years of pioneering work, DayOne is guided by professionalism and driven by innovation. Their focus on service ensures that clients receive top-tier support from the beginning. The company boasts a rapidly growing team of over 230 employees dedicated to serving clients better and establishing DayOne as a leading cross-border e-commerce company globally.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Key Services</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Product Development and Customization: Tailoring products to meet specific market needs.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Procurement and Sourcing: Efficiently sourcing high-quality products.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Sales and Marketing: Strategically promoting products to maximize reach and sales.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Comprehensive Fulfillment: Managing the entire process from sourcing to shipping, ensuring timely delivery and customer satisfaction.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Commitment to Clients</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">DayOne is committed to providing exceptional service and innovative solutions, helping e-commerce entrepreneurs succeed in the global market.</span></p>
                            <p><br /><br /><br /><br /><br /><br /></p></div>',
                    'promo_line' => 'Capital Club prefered pricing and service',
                    'instructions' => '<h4><strong>Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></p>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">&rdquo; link to access the questionnaire.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review and submit your responses.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will review your information.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">The vendor will contact you privately to discuss the next steps.</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This Link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing this Link on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Capital Club members will receive prefered pricing and service for fulfilment and product sourcing.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/dayone/logo.svg'),
                ],

                [
                    'title' => 'Amplifier',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'website_link' => 'https://www.amplifier.bio/',
                    'redeem_link'=>'https://www.amplifier.bio/',
                    'short_description' => 'Pine Pollen powerful blend helps to absorb and utilize the natural testosterone more efficiently in your body',
                    'long_description' => '<div class="font-size:16px"><p><span style="font-weight: 400;">Amplifier is dedicated to strengthening the dysregulated hormonal system and raising awareness about the harmful effects of microplastics on health.</span></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Their main product, the highest quality Pine Pollen, is carefully selected and processed with experienced sources. This results in a product full of nutrients, antioxidants, and plant hormones. Discover the power of Amplifier Pine Pollen and experience top-quality natural support.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Origin and Inspiration</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Amplifier was inspired by the alarming discoveries of Dr. Shanna Swan, who revealed that male testosterone levels have dropped by as much as 59% over the past 50 years. These disturbing trends led to the creation of Amplifier, aiming to combat these issues and promote better hormonal health.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Amplifier is committed to</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Strengthening Hormonal Health: Providing solutions and raising awareness to support and restore hormonal balance.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Educating on Microplastics: Highlighting the harmful effects of microplastics on health and advocating for change.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Amplifier strives to enhance hormonal health and make a positive impact on overall well-being.</span></p>
                            <p><br /><br /><br /><br /><br /><br /></p></div>',
                    'promo_line' => 'Save 15% discount on all purchases',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'CC members will receive a 15% discount on all products.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/amplifier/logo.svg'),

                ],

                [
                    'title' => 'WinningHunter',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://winninghunter.com/',
                    'redeem_link' => 'https://winninghunter.com?ref=capitalclub/',
                    'short_description' => 'All-in-one product research tool. Users can spy on the latest and discover top products ahead of the curve',
                    'long_description' => '<p><span style="font-weight: 400;">WinningHunter is the all-in-one product research tool designed to empower users with comprehensive insights into the latest ads, top products, and competitor activities. By leveraging advanced AI capabilities, WinningHunter ensures users stay ahead of the curve in the competitive world of e-commerce.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Key Features</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Ad Spying and Trend Discovery: WinningHunter enables users to spy on the latest ads and discover top products before they become mainstream. This feature ensures users are always a step ahead in identifying profitable opportunities.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Accurate Sales Tracking: Track website sales with precision, allowing for better business decisions based on real-time data.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Competitor Analysis with AI: Identify competitors and analyze their strategies using AI, providing crucial insights that can be leveraged for success.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Unlocking Success</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">WinningHunter unlocks the full potential of product research by providing tools that are essential for identifying and capitalizing on winning products. Whether you\'re just starting out in dropshipping or looking to grow your online store, WinningHunter has the tools you need to succeed.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Used by Industry Leaders</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">WinningHunter is trusted by 8-figure dropshippers for its ability to effortlessly discover trending products, spy on successful ads, and track competitor sales. Start using WinningHunter today and watch your sales skyrocket.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Why WinningHunter Stands Out</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">User-Friendly Interface: Designed to be intuitive and easy to use, even for beginners.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Comprehensive Ad Analysis: Spot winning ads across platforms like Facebook, Instagram, and TikTok.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Magic AI Feature: Identify competitors selling the same products, providing valuable insights for product launches and advertising strategies.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Discover Winning Ads Before They Go Big</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">With WinningHunter, you can tap into ads that are on the verge of scaling. Stop wasting time on ineffective campaigns and focus on those with high potential. Customize these winning ads for different markets and maximize your profits.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Join the WinningHunter Community</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Your journey to success begins with WinningHunter. Unlock the full potential of product research, stay ahead of the competition, and claim your piece of the pie.</span></p>',
                    'promo_line' => 'Save 20% on all subscriptions',
                    'instructions' => '<h4><strong>General Instructions for Redeeming Offers</strong></h4>
                            <p>&nbsp;</p>
                            <ol>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Click the provided </span><strong>REDEEM BENEFIT</strong><span style="font-weight: 400;">" link to access the offer page.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Follow the prompts to continue. IMPORTANT: Our unique Capital Club partner benefits will be added automatically</span></li>
                            </ol>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 20% on all subscriptions.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/winninghunter/logo.svg'),

                ],

                [
                    'title' => 'AfterLib',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://afterlib.com/',
                    'redeem_link'=>'https://afterlib.com/',
                    'short_description' => 'Your go-to advertising library. Monitor trends, analyzing competitors,  and elevate your strategy',
                    'long_description' => '<div class="font-size:16px"><p><span style="font-weight: 400;">Afterlib is your go-to advertising library, designed to help you monitor trends, analyze competitors, and elevate your advertising strategy with in-depth ad insights and powerful features like never before. Developed initially for internal use, Afterlib has evolved into the most advanced tool for product research and competitor analysis.</span></p>
                            <p>&nbsp;</p>
                            <p><strong>Key Features</strong></p>
                            <ul>
                            <li style="font-weight: 400;"></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Trend Monitoring: Keep a pulse on the latest advertising trends to stay ahead of the competition.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Competitor Analysis: Gain deep insights into competitor activities to identify their strategies and adapt your own.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Ad Insights: Access detailed information on ad performance to understand what works and what doesn&rsquo;t.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">User-Friendly Interface: Navigate easily through powerful features designed for efficiency and ease of use.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Regular Updates: Benefit from continuous improvements and new features that keep Afterlib at the cutting edge of advertising research.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Why Afterlib Stands Out</strong></p>
                            <p>&nbsp;</p>
                            <ul>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Deeper Insights: Afterlib offers more comprehensive data than other ad libraries, providing a deeper understanding of ad performance and competitor tactics.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Winning Product Identification: Discover which products are performing best in the market with advanced analytics.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Creative Ad Discovery: Find the most effective and innovative ads to inspire your own campaigns.</span></li>
                            <li style="font-weight: 400;"><span style="font-weight: 400;">Faster Work, Increased Profits: With its intuitive design and powerful features, Afterlib enables you to work faster and achieve better results, leading to significant profit growth.</span></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p><strong>Elevate Your Advertising Strategy</strong></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Afterlib is designed to provide unparalleled insights and tools to help you optimize your advertising strategy. Whether you&rsquo;re a seasoned marketer or new to the field, Afterlib&rsquo;s advanced capabilities will give you the edge you need to succeed.</span></p>
                            <p>&nbsp;</p>
                            <p><span style="font-weight: 400;">Unlock the full potential of your advertising campaigns with Afterlib. Monitor trends, analyze competitors, and elevate your strategy with the most advanced advertising library available. Start using Afterlib today and transform the way you approach product research and competitor analysis.</span></p></div>',
                    'promo_line' => 'Save 25% on all subscriptions',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 25% on all subscriptions.',
                    'is_benefits' => TRUE,
                    'published_at' => NULL,
                    'logo' => public_path('/images/marketplace/afterlib/logo.svg'),
                ],




            // FROM21

                [
                    'title' => 'PiPiADS',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://www.pipiads.com/',
                    'redeem_link'=>'https://www.pipiads.com/?invite=CAPITALCLUB',
                    'short_description' => 'A Truly all-in-one TikTok dropshipping solution, providing real TikTok winning products',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">PipiADS is a TikTok ad spy tool that has taken the advertising world by storm. With its wide range of features and benefits, PipiADS is making a name for itself among advertisers and eCommerce marketers.</span></span></p>
                    <p>&nbsp;</p>
                    <h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Unique Features and Competitive Edge</strong></span></span></h4>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">What sets PipiADS apart from the competition? It allows users to discover winning products and analyze competitors’ ads, giving them a competitive edge in the market. Additionally, PipiADS provides access to a vast database of ad creatives, enabling users to gain insights into successful advertising strategies.</span></span></p>
                    <p>&nbsp;</p>
                    <h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Brand Visibility and Essential Tools</strong></span></span></h4>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">In the fast-paced world of online business, brand visibility is crucial, and PipiADS understands that. This is why it offers essential tools and functionalities to help businesses thrive in the digital landscape.</span></span></p>
                    <p>&nbsp;</p>
                    <h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Target Audience</strong></span></span></h4>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">PipiADS is particularly beneficial for dropshipping businesses, e-commerce entrepreneurs, social media marketers, TikTok advertisers, and product researchers. Whether just starting an online business or looking to expand an advertising strategy, PipiADS has users covered.</span></span></p>
                    <p>&nbsp;</p>
                    <h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>User-Friendly Interface and Outstanding Features</strong></span></span></h4>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">With its user-friendly interface and amazing features, PipiADS is an excellent choice for anyone seeking to enhance their advertising campaigns. Users can easily spy on competitors’ ads, find the best-selling products, and uncover the latest trends in the market.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">PipiADS offers the tools and insights needed to succeed in the competitive world of TikTok advertising. It is a valuable resource for enhancing advertising strategies and achieving business growth.</span></span></p></div>',
                    'promo_line' => 'Save 25% on all subscriptions ',
                    'promo_code' => 'CAPITALCLUB',
                    'instructions' => '<h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>General Instructions for Redeeming Offers</strong></span></span></h4>
                    <p>&nbsp;</p>
                    <ol style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Copy our unique Capital Club partner code</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Click the provided </span><span style="text-decoration:none;white-space:pre-wrap;"><strong>REDEEM BENEFIT</strong></span><span style="text-decoration:none;white-space:pre-wrap;" &gt;" link to access the offer page.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></span></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 25% on all subscriptions.',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                    'logo' => public_path('/images/marketplace/PiPiADS/logo.svg'),
                    ],

                [

                    'title' => 'Can Do Consulting',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'website_link' => 'https://candoconsulting.ch/',
                    'redeem_link'=>'https://candoconsulting.ch/',
                    'short_description' => ' CAN DO! Consulting transforms managers into leaders, offering HR solutions and operational optimization',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">CAN DO! Consulting specializes in transforming managers into effective leaders by providing comprehensive HR solutions and operational optimization. With a wealth of experience across diverse industries, the company excels in teaching effective management, creating efficient operational systems, and assisting in recruitment.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>The Founder</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Dorota Sędek, the founder and lead trainer of CAN DO! Consulting, brings over 15 years of experience managing teams of various sizes, from 5 to 500 employees, across multiple market sectors. In the past six years, Dorota has successfully run several businesses and is passionate about productivity and biohacking.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Services Offered</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">1-on-1 Consultations: Ideal for those looking to increase personal effectiveness and improve time management. These sessions are tailored to help individuals streamline their processes and build essential management skills.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Managerial Training: For those at the beginning of their managerial journey, CAN DO! Consulting offers personalized training to help build teams, streamline processes, and learn the basics of management.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Skills Shot Series: Designed to develop current teams in key areas such as communication, sales, and time management. These flagship training sessions are crafted to enhance team performance and productivity.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Customized Training Programs: CAN DO! Consulting offers bespoke training solutions tailored to meet the specific needs of your organization and employees. Contact us to craft a unique training program that aligns with your companys goals.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose CAN DO! Consulting</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Leverage Dorota Sędeks extensive expertise to boost your managerial skills and operational efficiency. Whether youre just starting your managerial career or looking to develop your existing team, CAN DO! Consulting has the solutions to help you succeed.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Get Started</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Sign up for a 1-on-1 consultation or choose from our range of training programs to start transforming your management skills today. Contact CAN DO! Consulting to discuss customized training options tailored to your organizations needs.</span></span></p></div>',
                    'promo_line' => 'Save 15% on all subscriptions ',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'Save 15% on all subscriptions.',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                    'logo' => public_path('/images/marketplace/Can_Do_Consulting/logo.svg'),

                ],

                [

                    'title' => 'Paking Duck',

                    'featured'=>true,
                    'category'=>'Fulfilment',
                    'website_link' => 'www.pakingduck.com',
                    'redeem_link'=>'https://cc-marketplace.typeform.com/pakingduck',
                    'short_description' => 'Factory-direct pricing for custom packaging needs that narrates brands stories',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Paking Duck is a custom packaging manufacturer based in Dongguan, China, offering factory-direct pricing for all your packaging needs. Specializing in creating primary, secondary, and shipping packaging, Paking Duck helps brands narrate their stories through exceptional packaging solutions.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Comprehensive Packaging Solutions</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Primary Packaging: Enhance the first impression of your product with high-quality primary packaging that reflects your brands identity.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Secondary Packaging: Ensure your product stands out on the shelves with thoughtfully designed secondary packaging.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Shipping Packaging: Protect your products during transit with robust and reliable shipping packaging.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Materials and Expertise</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Paking Duck works with a variety of materials, including paper, plastic, metal, and glass. With a portfolio of delivering exceptional packaging solutions to over 2,500 brands, Paking Duck is equipped to handle diverse packaging requirements across different industries and categories.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Paking Duck</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Factory-Direct Pricing: Benefit from competitive pricing directly from the manufacturer.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Unparalleled Support: Receive exceptional support from experienced operators dedicated to your packaging needs.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">High-Quality Standards: Collaborate with a trusted partner that ensures high-quality packaging solutions.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Our Commitment</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Paking Duck is committed to providing brands of all sizes with a high-quality packaging experience. By collaborating closely with brands, Paking Duck ensures that every packaging solution is tailored to meet specific brand requirements and exceed expectations.</span></span></p></div>',
                    'promo_line' => 'Save 10% on your 1st order',
                    'instructions' => 'Instructions for Redeeming Offers

                    To help ensure a smooth onboarding process, please follow the steps below.

                    Click the “REDEEM BENEFIT” link to access the questionnaire.
                    Review and submit your responses.
                    The vendor will review your information.
                    The vendor will contact you privately to discuss the next steps.

                    This ensures the Capital Club partner has all the necessary information to assist you effectively.
                    ',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => 'Save 10% on your 1st order.',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                    'logo' => public_path('/images/marketplace/Paking_Duck/logo.svg'),

                ],

                [

                    'title' => 'Dr Squatch Natural Soap',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'website_link' => 'https://www.drsquatch.com/',
                    'redeem_link'=>'https://www.drsquatch.com/SFKHGMHD',
                    'short_description' => 'Natural high-performance personal care products designed for men, featuring fresh, manly scents',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Dr. Squatch specializes in crafting natural, high-performance personal care products designed specifically for men. With a focus on fresh, manly scents, Dr. Squatch uses only the finest ingredients sourced from Mother Nature to provide a refreshing and invigorating experience.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>The Squatch Story</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">The journey of Dr. Squatch began with a love for natural products. Inspired by this passion, founder Jack started creating his own natural soap in his garage. Recognizing a need for better products with natural ingredients and appealing scents for men, Jack founded Dr. Squatch.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Today, millions of satisfied customers later, Dr. Squatch continues to uphold its mission: to raise the bar for natural products and transform the way men approach their personal care.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Products</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Dr. Squatch offers a wide range of personal care products, including:</span></span></p> <br>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Natural Soaps: Crafted with care, these soaps feature manly scents and natural ingredients for a superior cleansing experience.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Shampoos and Conditioners: Formulated to keep hair healthy and strong, using nature’s best ingredients.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Deodorants: Effective and naturally scented, ensuring freshness all day long.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Skin Care: Designed to nurture and protect skin with the power of natural ingredients.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Dr. Squatch</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Natural Ingredients: Dr. Squatch uses only the finest, naturally sourced ingredients to create high-performance personal care products.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Manly Scents: Fresh and invigorating scents designed to appeal to men.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Commitment to Quality: Dr. Squatch is dedicated to providing the best natural products for men, ensuring a premium personal care experience.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Join the Squatch Movement</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Dr. Squatch invites men to discover the difference natural ingredients can make in their personal care routine. By experiencing the benefits of natures finest ingredients and manly scents, men can join the movement of millions who have transformed their personal care with Dr. Squatch.</span></span></p></div>',
                    'promo_line' => 'Save $10 USD on any purchase',
                    'promo_code' => 'SFKHGMHD',
                    'instructions' => '<h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>General Instructions for Redeeming Offers</strong></span></span></h4>
                    <p>&nbsp;</p>
                    <ol style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Copy our unique Capital Club partner code</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Click the provided </span><span style="text-decoration:none;white-space:pre-wrap;"><strong>REDEEM BENEFIT</strong></span><span style="text-decoration:none;white-space:pre-wrap;" &gt;" link to access the offer page.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></span></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></span></p>

                    <p>&nbsp;</p>
                    <p>&nbsp;</p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save $10 USD on any order from Dr Squatch Natural Soap.',
                    'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/Dr_Squatch_Natural_Soap/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Dr_Squatch_Natural_Soap/banners/1.jpg'),
                    public_path('/images/marketplace/Dr_Squatch_Natural_Soap/banners/2.jpg'),
                    public_path('/images/marketplace/Dr_Squatch_Natural_Soap/banners/3.jpg'),
                    public_path('/images/marketplace/Dr_Squatch_Natural_Soap/banners/4.jpg'),
                    public_path('/images/marketplace/Dr_Squatch_Natural_Soap/banners/5.jpg'),
                ]
                ],

                [

                    'title' => 'Viral Ecom Adz',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://viralecomadz.com/',
                    'redeem_link'=>'https://viralecomadz.com/?ref=kizdnrkm',
                    'short_description' => 'Proven-to-convert video creatives, creating ecommerce advertisements that are designed to go viral',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Viral Ecom Adz specializes in creating and promoting ecommerce advertisements designed to go viral on social media platforms such as Facebook, Instagram, and TikTok. With a proven formula tested on over 50,000 ads for more than 20,000 clients, Viral Ecom Adz ensures high-converting video with a quick 1-3 day delivery.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Services Offered</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Video Ad Creation: Viral Ecom Adz sources clips from top sites and combines them with compelling sales copy to produce high-converting ads. These videos are crafted to engage viewers and drive conversions.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Ad Campaign Management: The team at Viral Ecom Adz manages ad campaigns to maximize reach and effectiveness, helping ecommerce businesses increase their online visibility.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Influencer Marketing: By leveraging influencer partnerships, Viral Ecom Adz helps brands reach larger audiences and generate buzz around their products.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Viral Ecom Adz</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Proven Success: With a successful track record of over 50,000 ads created for 20,000+ clients, Viral Ecom Adz has the experience and expertise to deliver results.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Fast Turnaround: Get your high-converting video creatives delivered in just 1-3 days.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Engaging Content: Focus on creating shareable content that has the potential to go viral and reach a large audience.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Boost Your Ecommerce Success</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Viral Ecom Adz is dedicated to helping ecommerce businesses increase their online visibility, attract more customers, and boost sales. By creating engaging and shareable video content, Viral Ecom Adz ensures that your brand gets the attention it deserves.</span></span></p></div>',
                    'promo_line' => 'Save 15% on packages',
                    'promo_code' => 'CAPITAL',
                    'instructions' => '<h4><strong><span style="font-size:12pt;">General Instructions for Redeeming Offers</span></strong></h4>
                    <p><br></p>
                    <ol>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Copy our unique Capital Club partner code</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Click the provided &quot;</span><strong><span style="font-size:11pt;">REDEEM BENEFIT</span></strong><span style="font-size:11pt;">&quot; link to access the offer page.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Review the landing page, then click &quot;Start Now&quot; or the equivalent action to proceed.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></p>
                        </li>
                    </ol>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></p>
                    <p><br></p>
                    <p><br></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'CC members receive 15% discount on the VIP Membership package',
                    'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/Viral_Ecom_Adz/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/1.jpg'),
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/2.jpg'),
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/3.jpg'),
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/4.jpg'),
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/5.jpg'),
                    public_path('/images/marketplace/Viral_Ecom_Adz/banners/6.jpg'),
                ]
                ],

                [
                    'title' => 'Fiverr',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://pro.fiverr.com/',
                    'redeem_link'=>'https://pro.fiverr.com/',
                    'short_description' => 'Fiverr is a global platform connecting businesses with freelance talent in the simplest way possible',
                    'long_description' => '<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" id="isPasted"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr is a global platform that connects businesses with freelance talent in the simplest way possible. Offering access to a diverse pool of skilled freelancers, Fiverr makes it easy for businesses to find the right talent for their projects across various categories.</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Pro: Premium Business Solutions</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Pro is a premium business solution designed to provide the resources needed to scale your business at the right pace. With access to a world of trusted and on-demand freelance talent, Fiverr Pro offers unparalleled opportunities for businesses to thrive.</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Key Features</span></p><p><br></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Trusted Freelance Talent: Gain access to a curated pool of top-tier freelancers who are vetted for their expertise and reliability.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Comprehensive Administrative Tools: Utilize expertly equipped tools to manage projects, streamline workflows, and enhance productivity.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Business Success Manager: Benefit from a designated Business Success Manager who works to maximize the platform&#39;s advantages, ensuring that your business gets the most out of Fiverr Pro.</span></p></li></ul><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Opportunities Across 500+ Categories</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Pro covers a vast range of categories, providing businesses with the flexibility to find specialized talent for any project. From graphic design and digital marketing to programming and writing, Fiverr Pro connects you with professionals who can help you achieve your business goals.</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Why Choose Fiverr Pro</span></p><p><br></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Quality Assurance: Every freelancer on Fiverr Pro is vetted for quality, ensuring you receive top-notch service.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">On-Demand Access: Quickly and easily find the right talent when you need it, without the hassle of lengthy recruitment processes.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Scalable Solutions: Fiverr Pro is designed to support your business as it grows, providing the resources and talent needed to scale effectively.</span></p></li></ul><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Maximize Your Business Potential</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Pro offers businesses the tools and talent needed to succeed in a competitive market. By connecting with trusted freelancers and leveraging advanced administrative tools, businesses can streamline operations, enhance productivity, and drive growth.</span></p>',
                    'promo_line' => 'Save up to 70% on your 1st order and more',
                    'promo_code' => '',
                    'instructions' => '<h4 dir="ltr" style="line-height:1.38;margin-top:14pt;margin-bottom:4pt;" id="isPasted"><span style="font-size:12pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">General Instructions for Redeeming Offers</span></h4><p><br></p><ol style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Copy our unique Capital Club partner code</span></p></li><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Click the provided &quot;</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">REDEEM BENEFIT</span><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&quot; link to access the offer page.</span></p></li><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Review the landing page, then click &quot;Start Now&quot; or the equivalent action to proceed.</span></p></li><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></p></li></ol><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => '<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" id="isPasted"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Services with Exclusive Discounts for Capital Club Members</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Marketplace Gigs</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The world&#39;s largest marketplace for freelance services.</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">25% Off First Order: Get a substantial discount on your initial purchase.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">10% Off Future Orders: Enjoy ongoing savings with a 10% discount on each purchase for the next 12 months.</span></p></li></ul><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Fiverr Pro</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Curated catalog featuring Fiverr&#39;s top freelance talent, 100% vetted.</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">70% Off First Order: Receive a significant discount on your first purchase.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">10% Off Future Orders: Continue saving with a 10% discount on each purchase for the next 12 months.</span></p></li></ul><p><br></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Logo Maker</span></p><p><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">A powerful AI engine combined with the works of top logo designers.</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">$30 Off First Order: Get a fixed discount equivalent to the basic package price.</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">10% Off Future Orders: Benefit from a 10% discount on each purchase for the next 12 months.</span></p></li></ul>',
                    'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/Fiverr/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Fiverr/banners/1.jpg'),
                    public_path('/images/marketplace/Fiverr/banners/2.jpg'),
                    public_path('/images/marketplace/Fiverr/banners/3.jpg'),
                    public_path('/images/marketplace/Fiverr/banners/4.jpg'),
                ]
                ],

                [

                    'title' => 'Divly',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://divly.com/en/',
                    'redeem_link'=>'https://divly.com/?ref=y2mwytq ',
                    'short_description' => 'Divly provides hassle-free crypto tax solutions. Tailored for over 20 countries',
                    'long_description' => '<p><span style="font-size:11pt;">Divly provides hassle-free crypto tax solutions designed to simplify the process of calculating and reporting crypto taxes. Tailored for over 20 countries, Divly assists individuals and tax professionals, ensuring top-tier tax compliance for each nation&apos;s requirements.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Mission</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Divly believes that everyone should be able to use cryptocurrencies without being overwhelmed by complex tax regulations and reporting requirements. The company&apos;s goal is to make crypto tax management simple and stress-free for all users.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Key Features</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Ease of Use: Divly eliminates the need for extensive tax law knowledge or programming skills, making the process of crypto tax calculation and reporting straightforward.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Free to Start: Users can begin using Divly&apos;s services for free, reducing the financial barrier to managing crypto taxes.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Global Reach: Tailored for over 20 countries, Divly ensures compliance with each nation&apos;s unique tax requirements.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Founding Story</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Divly was founded in June 2021 by Carl G&auml;rdsell and Ruben Rehn in Sweden. After experiencing the challenges of managing crypto taxes firsthand, they recognized the need for a more cost-effective and accessible solution. Unlike services that cater only to the US market or require manual input or expensive tax lawyers, Divly was created to serve the average crypto user.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Growth and Commitment</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Since its inception, the Divly team has expanded, adding more employees, investors, and supported countries. The team is dedicated to helping users track their crypto portfolios and meet their tax obligations with ease. With a focus on accessibility and a touch of playfulness, Divly strives to continually improve its service and make managing crypto taxes less daunting.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Get Started with Divly</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Join Divly today and say goodbye to the headaches of crypto tax management. With Divly, users can effortlessly track their crypto portfolios and ensure compliance with their country&apos;s tax regulations. Start for free and experience the ease of hassle-free crypto tax solutions.</span></p>
                    <p><br></p>',
                    'promo_line' => 'Save 25% on all subscriptions ',
                    'promo_code' => 'CAPITALCLUB25',
                    'instructions' => '<h4><strong><span style="font-size:12pt;">General Instructions for Redeeming Offers</span></strong></h4>
                    <p><br></p>
                    <ol>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Copy our unique Capital Club partner code</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Click the provided &quot;</span><strong><span style="font-size:11pt;">REDEEM BENEFIT</span></strong><span style="font-size:11pt;">&quot; link to access the offer page.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Review the landing page, then click &quot;Start Now&quot; or the equivalent action to proceed.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></p>
                        </li>
                    </ol>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></p>
                    <p><br></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'CC members save 25% on all Divly packages.',
                    'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/Divly/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Divly/banners/1.jpg'),
                    public_path('/images/marketplace/Divly/banners/2.jpg'),
                    public_path('/images/marketplace/Divly/banners/3.jpg'),
                ]
                ],

                [

                    'title' => 'AutoDS',

                    'featured'=>true,
                    'category'=>'Fulfilment',
                    'website_link' => 'https://www.autods.com/',
                    'redeem_link'=>'https://www.autods.com/',
                    'short_description' => 'AutoDS is an all-in-one dropshipping tool that helps you automate every step of your dropshipping journey',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AutoDS is an all-in-one dropshipping tool designed to automate every step of your dropshipping journey. From finding trending, winning products to scaling your business for maximum profit, AutoDS streamlines the entire process, allowing you to focus on growing your business.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Key Features</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Trending Product Discovery: Use advanced product research tools to find and source trending and winning products that boost your sales.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">24/7 Automation: Benefit from round-the-clock automation for price and stock monitoring, ensuring your inventory is always up-to-date.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Automated Order Fulfillment: Save time with automated order fulfillment, reducing manual efforts and increasing efficiency.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Price Optimization: Automatically adjust prices for maximum profit, keeping your products competitive in the market.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Print on Demand (POD): Explore new avenues like Print on Demand to diversify your product offerings.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Private Suppliers: Access exclusive private suppliers to find unique products that set your store apart.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Custom Branding: Enhance your brand with custom product edits and branding options.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose AutoDS</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Comprehensive Automation: Automate everything from product sourcing, imports, order fulfillment, and product edits, to custom branding.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Scalability: Designed to help dropshippers scale their businesses efficiently and effectively.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AI-Powered Tools: Leverage AI tools to optimize your operations and stay ahead of the competition.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">User-Friendly Interface: Easy-to-use platform that caters to dropshippers of all experience levels.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Benefits</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Increased Efficiency: Automate tedious tasks to save time and focus on growing your business.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Higher Profit Margins: Optimize prices and product selection for maximum profitability.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Diverse Product Range: Access a variety of product sources, including trending items and Print on Demand options.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Enhanced Brand Identity: Utilize custom branding features to create a unique and recognizable brand.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Get Started with AutoDS</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Automate your dropshipping success with AutoDS. Discover trending products, optimize your operations, and scale your business effortlessly. Start using AutoDS today and experience the benefits of a fully automated dropshipping solution.</span></span></p></div>',
                    'promo_line' => 'Save 20% on all subscriptions ',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 20% on all subscriptions.',
                    'is_benefits' => TRUE,
                'published_at' => now(),
                'logo' => public_path('/images/marketplace/AutoDS/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/AutoDS/banners/1.jpg'),
                    public_path('/images/marketplace/AutoDS/banners/2.jpg'),
                    public_path('/images/marketplace/AutoDS/banners/3.jpg'),
                    public_path('/images/marketplace/AutoDS/banners/4.jpg'),
                    public_path('/images/marketplace/AutoDS/banners/5.jpg'),
                    public_path('/images/marketplace/AutoDS/banners/6.jpg'),
                ]
                ],

                [

                    'title' => 'Jungle Scout',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://www.junglescout.com/',
                    'redeem_link'=>'https://www.junglescout.com/',
                    'short_description' => 'Jungle Scout equips sellers with Amazon marketplace insights and robust market intelligence data to scale',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Jungle Scout equips sellers, agencies, global brands, and retailers with Amazon marketplace insights and robust market intelligence data to scale their businesses. Since its inception, Jungle Scout has been dedicated to providing powerful data and resources to help entrepreneurs and brands grow successful businesses on Amazon.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Mission</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Jungle ScoutS mission is to support entrepreneurs and brands in navigating the ever-changing landscape of Amazon by providing them with the tools and insights they need to succeed.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Founding Story</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Jungle Scout was created in 2015 by Greg Mercer, an engineer turned ecommerce entrepreneur, who aimed to guide fellow sellers through the complexities of the Amazon marketplace. What started as a personal endeavor to simplify selling on Amazon has grown into the leading all-in-one platform for Amazon sellers.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Today, Jungle Scout boasts a team of over 200 Amazon experts from around the world. With headquarters in Austin, Texas, and an office in Vancouver, British Columbia, the team brings together diverse perspectives and expertise, all united by a passion for supporting sellers and brands on Amazon.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Key Features</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Amazon Marketplace Insights: Gain valuable insights into the Amazon marketplace to make informed decisions and stay ahead of the competition.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Robust Market Intelligence: Access comprehensive data to identify trends, optimize listings, and develop effective strategies.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Scalable Solutions: Jungle Scout provides tools that cater to businesses of all sizes, from individual sellers to large global brands.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Jungle Scout</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Expertise: Benefit from the knowledge and experience of over 200 Amazon experts dedicated to your success.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Comprehensive Tools: Utilize an all-in-one platform that covers every aspect of selling on Amazon, from product research to inventory management.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Global Reach: Jungle Scout supports sellers and brands around the world, providing resources and insights tailored to diverse markets.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Join the Jungle Scout Community</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Join the thousands of successful entrepreneurs and brands who have grown their businesses with Jungle Scout. Leverage powerful data and market intelligence to scale your Amazon operations and achieve your business goals.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Get Started with Jungle Scout</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Discover how Jungle Scout can help you navigate the Amazon marketplace and grow your business. Start using Jungle Scout today and unlock the full potential of your Amazon selling journey.</span></span></p></div>',
                    'promo_line' => 'Save up to 56% on top-rated plans',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => '<p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Exclusive Pricing on Select Service Packages</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Suite 3 Months Plan: $123 (Regular Price: $189)</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Suite Annual Plan: $383 (Regular Price: $589)</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Suite Annual + FBB Plan: $599 (Regular Price: $1,589)</span></span></li>
                    </ul>',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                'logo' => public_path('/images/marketplace/Jungle_Scout/logo.svg'),

                ],

                [

                    'title' => 'Shopify',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'special' => TRUE,
                    'promo_line' => '',
                    'website_link' => 'https://www.shopify.com/',
                    'redeem_link'=>'https://www.shopify.com/',
                    'short_description' => 'Shopify is supporting the next generation of entrepreneurs, the world’s biggest brands, and everyone in between',
                    'long_description' => '<p><span style="font-size:11pt;">Shopify is the No.1 eCommerce platform for businesses of all sizes. From supporting the next generation of entrepreneurs to powering the world&rsquo;s biggest brands, Shopify provides a comprehensive commerce platform that enables anyone to start, manage, and grow their business.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Comprehensive Commerce Solutions</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Online Store Creation: Build a professional online store with Shopify&apos;s intuitive tools and customizable templates.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Sales Management: Efficiently manage sales across various channels, including online, in-store, and on social media.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Customer Marketing: Utilize powerful marketing tools to reach and engage customers effectively.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Payment Processing: Accept payments in digital and physical locations, ensuring a seamless shopping experience for customers.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Why Shopify Stands Out</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Shopify&apos;s reputation as a commerce leader stems from its commitment to listening to the experiences of millions of business owners. By supporting both solopreneurs and enterprise brands, Shopify has developed features and products that cater to diverse business needs and help shape the future of commerce.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Key Features</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">User-Friendly Platform: Shopify&apos;s intuitive interface makes it easy for anyone to set up and run an online store.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Scalable Solutions: Whether you&apos;re a small startup or a large enterprise, Shopify provides scalable solutions that grow with your business.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Innovative Tools: Benefit from cutting-edge tools and features designed to enhance your business operations and drive growth.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Extensive Support: Access a wealth of resources, including expert support, to help you succeed at every stage of your business journey.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Join the Shopify Community</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Thousands of successful entrepreneurs and top brands trust Shopify to power their businesses. By choosing Shopify, you join a community dedicated to innovation and excellence in commerce.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Get Started with Shopify</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Experience the benefits of the leading eCommerce platform. Start building your online store with Shopify today and take your business to new heights.</span></p>
                    <p><br></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => now(),
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/Shopify/logo.svg'),
                'banners' => [
                        public_path('/images/marketplace/Shopify/banners/1.jpg'),
                        public_path('/images/marketplace/Shopify/banners/2.jpg'),
                        public_path('/images/marketplace/Shopify/banners/3.jpg'),
                        public_path('/images/marketplace/Shopify/banners/4.jpg'),
                        public_path('/images/marketplace/Shopify/banners/5.jpg'),
                        public_path('/images/marketplace/Shopify/banners/6.jpg'),
                    ]
                ],

                [

                    'title' => 'Payoneer',

                    'featured'=>true,
                    'category'=>'Banking',
                    'promo_line' => 'Capital Club prefered pricing and service',
                    'website_link' => 'https://www.payoneer.com/',
                    'redeem_link'=>'http://tracking.payoneer.com/SH57C',
                    'short_description' => 'The Payoneer multi-currency account has everything your business needs to pay, get paid, and grow globally',
                    'long_description' => '<p><span style="font-size:11pt;">Payoneer&apos;s story began with a vision: to democratize access to global commerce for businesses of any size and in any location. Since 2005, Payoneer has powered the growth of millions of small and medium businesses, building a financial platform that connects the world.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Global Commerce Made Local</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Today, the world is your market. With a Payoneer multi-currency account, businesses can pay and get paid globally with ease. Manage your business in multiple currencies, target new markets, and seize international opportunities. Payoneer provides the tools needed to access working capital and drive global growth.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Simplifying Cross-Border Trade</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Payoneer simplifies global commerce, leveling the playing field so businesses of all sizes can trade securely, conveniently, and at low cost worldwide. The platform is designed to eliminate obstacles, turning them into opportunities for cross-border trade.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Key Features</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Multi-Currency Account: Manage funds in various currencies to streamline international transactions.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Global Payments: Receive and make payments from anywhere in the world.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Working Capital: Access funds to support and expand your business operations.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Market Expansion: Target and enter new markets with ease using Payoneer&apos;s comprehensive tools.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Track Record and Trust</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Payoneer has a track record dating back to 2005, and is publicly listed on Nasdaq (PAYO). The platform is trusted by some of the biggest brands in tech, banking, and business, making it a reliable choice for handling your global financial transactions.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Join the Payoneer Network</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Join millions of businesses that trust Payoneer to manage their global payments. Experience seamless cross-border transactions and grow your business on a global scale.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Get Started with Payoneer</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Open a Payoneer multi-currency account today and empower your business to pay, get paid, and grow globally. Simplify your global commerce operations with Payoneer.</span></p>
                    <p><br></p>',
                     'instructions_note' => 'This Link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing this Link on online forums or websites may result in revocation of your membership.',
                     'instructions' => '<h4><strong><span style="font-size:12pt;">General Instructions for Redeeming Offers</span></strong></h4>
                     <p><br></p>
                     <ol>
                         <li style="list-style-type:decimal;font-size:11pt;">
                             <p><span style="font-size:11pt;">Click the provided &quot;</span><strong><span style="font-size:11pt;">REDEEM BENEFIT</span></strong><span style="font-size:11pt;">&quot; link to access the offer page.</span></p>
                         </li>
                         <li style="list-style-type:decimal;font-size:11pt;">
                             <p><span style="font-size:11pt;">Review the landing page, then click &quot;Start Now&quot; or the equivalent action to proceed.</span></p>
                         </li>
                         <li style="list-style-type:decimal;font-size:11pt;">
                             <p><span style="font-size:11pt;">Follow the prompts to continue. IMPORTANT: Our unique Capital Club partner benefits will be added automatically</span></p>
                         </li>
                     </ol>
                     <p><br></p>
                     <p><span style="font-size:11pt;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></p>
                     <p><br></p>
                     <p><br></p>',
                     'published_at' => now(),
                     'cc_benefits' => 'Capital Club members will receive prefered pricing and service for Payoneer accounts.',
                     'is_benefits' => TRUE,
                     'logo' => public_path('/images/marketplace/Payoneer/logo.svg'),
                     'banners' => [
                        public_path('/images/marketplace/Payoneer/banners/1.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/2.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/3.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/4.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/5.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/6.jpg'),
                        public_path('/images/marketplace/Payoneer/banners/7.jpg'),
                    ]
                ],

                [

                    'title' => 'WorldFirst',

                    'featured'=>true,
                    'category'=>'Banking',
                    'promo_line' => '',
                    'website_link' => 'https://www.worldfirst.com/uk/',
                    'redeem_link'=>'https://www.worldfirst.com/uk/',
                    'short_description' => 'WorldFirst simplifies global business by offering fast, affordable payments, market access, and currency risk tools',
                    'long_description' => '<p><span style="font-size:11pt;">WorldFirst simplifies global business, transferring $200 billion annually for over 1 million customers. The company offers fast, affordable payments, market access, and currency risk management tools. Since joining Ant Group in 2019, WorldFirst envisions a comprehensive digital platform for SMEs engaged in international trade.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">History and Evolution</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Founded in 2004, WorldFirst was established to help small and medium-sized businesses navigate the complexities and high fees associated with cross-border FX transfers and international payments. Over the years, it has evolved into a global fintech that connects businesses worldwide through:</span></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Fast and affordable payments</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Access to international marketplaces</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Flexible currency risk management tools</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Working capital solutions</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Global Presence</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">WorldFirst&apos;s 500+ employees are based in major cities including London, Amsterdam, Singapore, Tokyo, Hangzhou, Shanghai, Shenzhen, Sydney, and Hong Kong. This global presence ensures they can support businesses in various markets effectively.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Awards and Recognition</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">WorldFirst is a two-time winner of the prestigious Queen&rsquo;s Award for Enterprise in International Trade. This recognition underscores their commitment to excellence and innovation in supporting international trade.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Services Offered</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">WorldFirst provides a range of tools and services beyond global money transfers, including:</span></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Hedging through forward contracts</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Local overseas currency accounts</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Easy integration with Xero and online marketplaces</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Mission and Vision</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">WorldFirst&apos;s mission is to make it easy to do business anywhere. Their vision is to provide a one-stop digital payments and financial services platform for cross-border SMEs, ensuring seamless international trade and financial management.</span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => now(),
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/WorldFirst/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/WorldFirst/banners/1.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/2.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/3.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/4.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/5.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/6.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/7.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/8.jpg'),
                    public_path('/images/marketplace/WorldFirst/banners/9.jpg'),
                ]
                ],

                [

                    'title' => 'doola',

                    'featured'=>true,
                    'category'=>'Banking',
                    'website_link' => 'https://www.doola.com/',
                    'redeem_link'=>'https://www.doola.com/capital-club/?utm_source=partnerstack&utm_medium=affiliate&utm_campaign=aarontait4438&pscd=partnersps.doola.com&ps_partner_key=YWFyb250YWl0NDQzOA&ps_xid=i8aTabi8KYa2nV&gsxid=i8aTabi8KYa2nV&gspk=YWFyb250YWl0NDQzOA/',
                    'short_description' => 'doola helps global entrepreneurs easily set up an LLC in the U.S. with support including EIN, U.S. address, U.S. bank account and more',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">doola is your full-stack solution for US business formation, banking, tax compliance, and more. Our clients choose us to manage their administrative needs, allowing them to focus on launching and growing their businesses. We look forward to doing the same for you!</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Start Your US Company Confidently with doola! Launch your business quickly and effortlessly with our one-stop-shop solution. Focus on your growth while we handle the paperwork and compliance.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Services Provided</strong></span></span><br><br>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">doola offers a wide range of services to help you launch and grow your US business:</span></span></p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">CPA Consultations</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">US Entity Formation (in any state)</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Complimentary Business Name Availability Search</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Company Formation Documents</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">US Registered Agent Service</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">US Mailing Address, Virtual Mailbox, and Mail Scanning</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">US Company Tax ID (EIN)</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Digital Document Access</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Assistance with US Business Bank Account Setup</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Assistance with Payment Gateway Setup (PayPal, Stripe, etc.)</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">State Filing Reminders</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">State Filings</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">IRS Tax Filing</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Exclusive Rewards worth over $50,000</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Community of Global Founders</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Access to Investors</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Real-Time Customer Support</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Additional Support</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">As part of the doola ecosystem, access additional services through our vetted partners:</span></span></p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Business Insurance</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Bookkeeping</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">US Phone Number</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Physical Address/Virtual Office</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Vetted CPA and Legal Partners</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Customer Testimonials</span></span></li>
                    </ul>
                    <p>&nbsp;</p></div>',
                    'promo_line' => 'Save 10% on all subscriptions ',
                    'promo_code' => 'DOOLACAPITALCLUB10',
                    'instructions' => '<h4><strong><span style="font-size:12pt;">General Instructions for Redeeming Offers</span></strong></h4>
                    <p><br></p>
                    <ol>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Copy our unique Capital Club partner code</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Click the provided &quot;</span><strong><span style="font-size:11pt;">REDEEM BENEFIT</span></strong><span style="font-size:11pt;">&quot; link to access the offer page.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Review the landing page, then click &quot;Start Now&quot; or the equivalent action to proceed.</span></p>
                        </li>
                        <li style="list-style-type:decimal;font-size:11pt;">
                            <p><span style="font-size:11pt;">Follow the prompts to continue. IMPORTANT: When prompted, be sure to provide our unique Capital Club partner code to redeem the benefits.</span></p>
                        </li>
                    </ol>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Note: The offer will not apply if you do not start via the provided link and use the specific partner code. Offers typically apply to new accounts only.</span></p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'CC members save 10% on all subscriptions.',
                    'is_benefits' => TRUE,
                    'published_at' => now(),
                    'logo' => public_path('/images/marketplace/doola/logo.svg'),
                    'banners' => [
                        public_path('/images/marketplace/doola/banners/1.jpg'),
                        public_path('/images/marketplace/doola/banners/2.jpg'),
                    ]
                ],

                [

                    'title' => 'Perfect Outbound',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'website_link' => 'https://www.perfectoutbound.com/',
                    'redeem_link'=>'https://cc-marketplace.typeform.com/perfectoutbound/',
                    'short_description' => 'A.I Outbound Acquisition Systems for Agencies, Consultancies, SAAS, and B2B Service-based Businesses',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">A.I Outbound Acquisition Systems specializes in providing outbound acquisition services for agencies, consultancies, SAAS, and B2B service-based businesses. Their approach combines human expertise with artificial intelligence to enhance lead generation, helping clients build a robust pipeline of qualified leads without depending on referrals, expensive advertisements, or extensive personal branding efforts.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Services Offered</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">A.I Outbound Acquisition Systems offers a unique blend of human-powered and AI-driven outbound acquisition services designed to:</span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Supercharge your sales pipeline with qualified leads.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Minimize reliance on traditional referral networks.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Eliminate the need for costly advertising campaigns.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Prevent burnout associated with personal branding.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Success Stories</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">A.I Outbound Acquisition Systems has a proven track record of delivering exceptional results for a diverse range of clients. Some notable successes include:</span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">ChiroQueens (Full-service 7-figure agency): Increased monthly revenue from $100k to $200k within 6 months without any ad spend or content marketing.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">HMG Digital (SEO agency, Australia): Achieved 20+ appointments per month and over $100k in revenue in just 4 months.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Perfect Product Co. (Marketing agency): Scheduled over 200 appointments within 6 months.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Foresight Digital (7-figure agency): Boosted total pipeline value from $300k to $1.7 million.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">The Gym Doc Consulting (Digital agency): Added $135,000 in revenue in 4 months.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Timland Media (Lead-generation agency): Closed 20 new clients in 5 weeks using their outbound systems.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Chronos Agency (7-figure e-commerce agency): Secured 30 demos and 7 audits within 4 months.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">TJ. Ahn Coaching &amp; Consulting (Business consulting): Generated $28k in outbound-generated revenue within 1 week.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Cazarin Interactive (7-figure agency): Added six figures in outbound-generated sales opportunities in 3 months.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Perfect Outbound (Own case study): Achieved a 7-figure run rate in less than 2 years through cold outbound strategies.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">TaskTakeOut (Outsourcing agency): Booked 36 meetings in 22 days per outbound representative via LinkedIn.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Morning Star Media Lab (Digital agency): Secured 15 appointments and closed 3 deals in under a month.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">VIA F. (Corporate high-performance coaching): Scheduled 35 high-ticket appointments with prospective clients in less than 2 months.</span></span></li>
                    </ul></div>',
                    'promo_line' => 'Save up to 8% ',
                    'instructions' => '<h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Instructions for Redeeming Offers</strong></span></span></h4>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">To help ensure a smooth onboarding process, please follow the steps below.&nbsp;</span></span></p>
                    <p>&nbsp;</p>
                    <ol style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Click the </span><span style="text-decoration:none;white-space:pre-wrap;"><strong>REDEEM BENEFIT</strong></span><span style="text-decoration:none;white-space:pre-wrap;">” link to access the questionnaire.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Review and submit your responses.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">The vendor will review your information.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">The vendor will contact you privately to discuss the next steps.</span></span></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">This ensures the Capital Club partner has all the necessary information to assist you effectively.</span></span></p>',
                    'instructions_note' => 'The vendor offers custom services and packages designed to produce results. If the vendor determines they cannot provide optimal service due to a mismatch of fields or other reasons, they may decline your application.',
                    'cc_benefits' => '<p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Exclusive Offer for Capital Club Members</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Capital Club only pricing on Select Service Packages</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Done-With-You Package</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Regular Price: $10,600</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">CC Discount (7.5%): $795 saved&nbsp;</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">You only Pay: $9,805</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Done-For-You Package</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Regular Price: $16,000</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">CC Discount (7.5%): $1,200 saved</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">You only Pay: $14,800</span></span></li>
                    </ul>',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                'logo' => public_path('/images/marketplace/Perfect_Outbound/logo.svg'),

                ],

                [

                    'title' => 'Unbounce',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://unbounce.com/',
                    'redeem_link'=>'https://unbounce.grsm.io/capitalclub/',
                    'short_description' => 'Create Landing Pages Quickly — Speed Up Testing & Increase Conversions by 30% with Unbounce ',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Unbounce is a leading landing page builder and conversion optimization tool that enables marketers and businesses to create, publish, and test high-performing landing pages without needing any coding knowledge. With its intuitive drag-and-drop interface, Unbounce allows users to design and customize landing pages tailored for various marketing campaigns, including lead generation, sales, and event promotion.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Key Features</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AI-Powered Landing Pages: Utilize AI to create and optimize landing pages that convert 30% more, helping you scale your marketing efforts without limits.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Drag-and-Drop Interface: Easily design and customize landing pages through a user-friendly interface, making it accessible for users of all skill levels.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">A/B Testing: Experiment with different page elements, layouts, and copy to identify what resonates best with your audience and optimize conversion rates.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Integrations: Seamlessly integrate with various marketing tools and platforms, such as email marketing services, CRM systems, and analytics tools, to enhance your marketing workflows.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Benefits</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Higher Conversion Rates: Build landing pages that drive more conversions and improve the effectiveness of your marketing campaigns.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">No Coding Required: Create professional and customized landing pages without any technical expertise.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Insightful Optimization: Use A/B testing to gain insights into audience preferences and fine-tune landing pages for maximum impact.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Comprehensive Integrations: Connect Unbounce with your existing marketing stack to streamline processes and enhance campaign performance.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Unbounce</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Unbounce empowers marketers to create high-converting landing pages and optimize their conversion rates. By leveraging AI and advanced testing capabilities, Unbounce helps businesses achieve their marketing goals more effectively and efficiently.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Get Started with Unbounce</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Convert 30% more with high-performing landing pages created with Unbounce’s AI-powered platform. Build and optimize campaigns that scale your marketing efforts without limits. Start using Unbounce today to transform your landing page strategy and drive better results for your business.</span></span></p></div>',
                    'promo_line' => 'Save up to 35%',
                    'promo_code' => '',
                    'instructions' => '<h4 style="margin-bottom:4pt;margin-top:14pt;" dir="ltr"><span style="background-color:transparent;;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>General Instructions for Redeeming Offers</strong></span></span></h4>
                    <p>&nbsp;</p>
                    <ol style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Click the provided </span><span style="text-decoration:none;white-space:pre-wrap;"><strong>REDEEM BENEFIT</strong></span><span style="text-decoration:none;white-space:pre-wrap;" &gt;" link to access the offer page.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Review the landing page, then click "Start Now" or the equivalent action to proceed.</span></span></li>
                        <li style="background-color:transparent;list-style-type:decimal;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Follow the prompts to continue. IMPORTANT: Our unique Capital Club partner benefits will be added automatically</span></span></li>
                    </ol>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Note: The offer will not apply if you do not start via the provided link. Offers typically apply to new accounts only.</span></span></p>

                    <p>&nbsp;</p>
                    <p>&nbsp;</p>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'cc_benefits' => 'Save 20% off your first three months (or 35% off your first full year) with Unbounce',
                    'is_benefits' => TRUE,
                    'published_at' => Null,
                'logo' => public_path('/images/marketplace/Unbounce/logo.svg'),

                ],

                [

                    'title' => 'Klayvio',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'promo_line' => '',
                    'website_link' => 'https://www.klaviyo.com',
                    'redeem_link'=>'https://www.klaviyo.com/',
                    'short_description' => 'Intelligent email marketing, sms, and automation for faster, more efficient growth',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Klaviyo is a unified customer platform that empowers online brands to own their consumer data and interactions, transforming transactions into long-term relationships. With intelligent email marketing, SMS, and automation, Klaviyo fuels faster, more efficient growth.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Powering Smarter Digital Relationships</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Klaviyo enables brands to create personalized customer experiences across email, SMS, mobile push, and more, utilizing real-time data and AI-driven insights. This platform helps you build higher-converting campaigns and grow your marketing efforts without limits.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Marketing Automation for Data-Driven Growth</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">With Klaviyo, marketing automation becomes the engine that powers all your marketing efforts. By leveraging data from across your tech stack, Klaviyo provides a complete view of every customer, allowing for hyper-personalized, targeted messaging.</span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Automate Workflows: Efficiently automate your marketing workflows across channels with your data centralized in one place.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Trigger Personalized Messages: Send welcome, browse abandonment, and cross-sell messages customized with conditions like order history, channel preference, and cart value.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Segmented Customer Experiences: Use customer data such as location and order value to create unique, segmented experiences for flows, campaigns, paid ads, and sign-up forms.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Key Features</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Pre-Built Automations: Use ready-made email and SMS automation templates to streamline customer journeys.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">One-Time Sends: Craft and automate campaigns for holidays, product launches, and promotions to engage customers with timely offers.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AI Integration: Predict future behaviors and generate subject lines and SMS messages quickly with artificial intelligence.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Comprehensive Reporting: Measure attribution, segment performance, and deliverability across email and SMS channels for powerful insights.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">350+ Integrations: Connect seamlessly with your favorite platforms, including ecommerce, order management, subscriptions, shipping, and support tools.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Customer Success</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Klaviyo’s intelligent automation has helped brands like Tecovas grow revenue by 138.8%. With exceptional customer support and impressive results from abandonment flows and campaign sends, Klaviyo provides significant opportunities for growth.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose Klaviyo</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Unified Data: Combine unlimited customer data with over 250 native integrations to create cohesive and effective marketing strategies.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Ease of Use: No need to piece together multiple platforms—Klaviyo’s user-friendly interface and tools make marketing automation accessible and efficient.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Scalable Solutions: From small businesses to large enterprises, Klaviyo supports growth on your terms with robust features and continuous updates.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Get Started with Klaviyo</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Explore Klaviyo’s intelligent marketing automation platform and see how it can transform your customer interactions and drive growth. Sign up today or get a demo to learn more about how Klaviyo can help your business thrive.</span></span></p>

                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p></div>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => now(),
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/Klayvio/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Klayvio/banners/1.jpg'),
                    public_path('/images/marketplace/Klayvio/banners/2.jpg'),
                    public_path('/images/marketplace/Klayvio/banners/3.jpg'),
                    public_path('/images/marketplace/Klayvio/banners/4.jpg'),
                    public_path('/images/marketplace/Klayvio/banners/5.jpg'),
                ]
                    ],

                [

                    'title' => 'Adobe',

                    'featured'=>true,
                    'category'=>'SaaS',
                    'website_link' => 'https://www.adobe.com',
                    'redeem_link'=>'https://www.adobe.com/',
                    'short_description' => 'Adobe offers groundbreaking technology that empowers everyone to imagine, create, and bring digital experiences to life',
                    'long_description' => '<p><span style="font-size:11pt;">Adobe offers groundbreaking technology that empowers everyone, everywhere to imagine, create, and bring any digital experience to life. As the global leader in digital media and digital marketing solutions, Adobe is at the forefront of transforming the world through digital experiences.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Mission</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Adobe&apos;s mission is to empower everyone&mdash;from emerging artists to global brands&mdash;to bring digital creations to life and deliver immersive, compelling experiences to the right person at the right moment for the best results.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Key Solutions</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Creative Solutions: Adobe&apos;s creative tools, such as Photoshop, Illustrator, and Premiere Pro, enable artists, designers, and creators to produce stunning digital content.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Marketing Solutions: Adobe Experience Cloud provides comprehensive marketing solutions that help businesses create, manage, and optimize personalized customer experiences across all channels.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Document Solutions: Adobe Acrobat and Adobe Sign offer powerful document management and e-signature capabilities, streamlining workflows and enhancing productivity.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Why Choose Adobe</span></strong></p>
                    <p><br></p>
                    <ul>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Innovation and Leadership: Adobe is a pioneer in digital media and marketing, continuously pushing the boundaries of technology to deliver innovative solutions.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Comprehensive Tools: Adobe provides a suite of tools that cater to a wide range of creative and business needs, ensuring seamless integration and powerful performance.</span></p>
                        </li>
                        <li style="list-style-type:disc;font-size:11pt;">
                            <p><span style="font-size:11pt;">Global Impact: Adobe&apos;s technology is used by individuals and businesses worldwide, transforming how we create, communicate, and interact in the digital realm.</span></p>
                        </li>
                    </ul>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Changing the World through Digital Experiences</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Adobe is committed to changing the world through digital experiences. By providing the tools and platforms needed to create and deliver exceptional digital content, Adobe is helping shape the future of creativity and innovation.</span></p>
                    <p><br></p>
                    <p><strong><span style="font-size:11pt;">Join the Adobe Community</span></strong></p>
                    <p><br></p>
                    <p><span style="font-size:11pt;">Experience the power of Adobe&apos;s technology and see how it can transform your digital creations and marketing strategies. Whether you&apos;re an emerging artist or a global brand, Adobe has the tools to help you succeed.</span></p>',
                    'promo_line' => '',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => now(),
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/Adobe/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/Adobe/banners/1.jpg'),
                    public_path('/images/marketplace/Adobe/banners/2.jpg'),
                    public_path('/images/marketplace/Adobe/banners/3.jpg'),
                    public_path('/images/marketplace/Adobe/banners/4.jpg'),
                ]
                ],

                [

                    'title' => 'AdCreative.ai',

                    'featured'=>true,
                    'category'=>'Marketing',
                    'promo_line' => '',
                    'website_link' => 'https://www.adcreative.ai/',
                    'redeem_link'=>'https://www.adcreative.ai/',
                    'short_description' => 'The most used AI tool for advertising to generate ad creatives that outperform your competitors',
                    'long_description' => '<div class="font-size:16px"><p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AdCreative.ai is the leading AI tool for advertising, designed to generate ROI-focused ad creatives, videos, product photoshoots, and texts that outperform your competitors with ease. By leveraging unique artificial intelligence models, AdCreative.ai empowers advertisers to create hundreds of conversion-focused ad assets in seconds, enabling extensive testing and winning strategies.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Key Features</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">AI-Generated Ad Creatives: Quickly generate high-quality ad creatives and texts that are tailored for conversion.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Product Photoshoot: Transform your product photos into professional photoshoots ready for use in your campaigns.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Ad Videos: Create captivating ad videos at scale in minutes to bring your brand to life and engage your audience.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Template Builder: Streamline your design process with automated workflow templates that enhance creativity and save time.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Social Templates: Discover and utilize top-performing ads crafted by the AdCreative.ai community, tapping into collective creativity and success.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Competitor Insights AI</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">One of the newest and most viral features of AdCreative.ai, Competitor Insights AI, allows you to see the best-performing ads from your competitors. This feature provides inspiration and enables you to generate even better ads in seconds, staying ahead of the competition.</span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Why Choose AdCreative.ai</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Conversion-Focused Assets: AdCreative.ai is the only generative AI specifically designed for advertisers, ensuring that all generated assets are focused on driving conversions.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Comprehensive Toolset: Create all the ad assets you need—creatives, texts, audiences, reports, and more—in one place.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Ease of Use: Getting started is simple. Upload your logo, select your brand colors, inform the AI about your products, and let it generate high-performing ad creatives and assets instantly.</span></span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>How It Works</strong></span></span></p>
                    <p>&nbsp;</p>
                    <ul style="margin-bottom:0;margin-top:0;">
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Brand Setup: Upload your logo and select your brand colors.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Product Information: Inform the AI about what you are selling.</span></span></li>
                        <li style="background-color:transparent;list-style-type:disc;text-decoration:none;white-space:pre;" dir="ltr" aria-level="1"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Asset Generation: Let AdCreative.ai generate conversion-focused ad creatives, texts, and audiences in seconds.</span></span><br><br>&nbsp;</li>
                    </ul>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;"><strong>Join the Leading AI Advertising Platform</strong></span></span></p>
                    <p>&nbsp;</p>
                    <p style="margin-bottom:0pt;margin-top:0pt;" dir="ltr"><span style="background-color:transparent;"><span style="text-decoration:none;white-space:pre-wrap;">Join the countless advertisers who trust AdCreative.ai to generate ad creatives that outperform competitors. Leverage AI to generate both visual and text-based assets for your ads, driving better results and maximizing your ROI.</span></span></p></div>',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => now(),
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/AdCreative.ai/logo.svg'),
                'banners' => [
                    public_path('/images/marketplace/AdCreative.ai/banners/1.jpg'),
                    public_path('/images/marketplace/AdCreative.ai/banners/2.jpg'),
                    public_path('/images/marketplace/AdCreative.ai/banners/3.jpg'),
                    public_path('/images/marketplace/AdCreative.ai/banners/4.jpg'),
                    public_path('/images/marketplace/AdCreative.ai/banners/5.jpg'),
                    public_path('/images/marketplace/AdCreative.ai/banners/6.jpg'),
                ]
                ],

                [

                    'title' => 'Mark Joyner',

                    'featured'=>true,
                    'category'=>'Lifestyle',
                    'short_description' => '',
                    'promo_line' => '',
                    'instructions_note' => 'This code and link is for your use only and cannot be shared. The partner will verify eligibility. Posting or sharing these items on online forums or websites may result in revocation of your membership.',
                    'published_at' => Null,
                    'is_benefits' => FALSE,
                'logo' => public_path('/images/marketplace/Mark_Joyner/logo.svg'),

                    ],


            ];


            foreach ($partnerProfiles as $profileData) {
                // Create PartnerProfile without logo
                $partnerProfile = PartnerProfile::create(
                    Arr::except($profileData, ['logo', 'banners','category']) // Excluding 'logo' and 'banners' from $profileData
                );
                if (isset($profileData['logo'])) {
                    // Dispatch job to add logo after PartnerProfile is created
                    AddSpatieMediaJob::dispatch(
                        $profileData['logo'],
                        $partnerProfile,
                        'logo',
                        'path'
                    );
                }

                $category = MarketPlaceCategory::where('name','iLIKE', $profileData['category'])->first();

                $partnerProfile->categories()->attach([
                    $category->id,
                ]);

                if(isset($profileData['banners'])){
                foreach ($profileData['banners'] as $key => $banner) {
                    $partnerProfileBanner = PartnerProfileBanner::create([
                        'order' => (int)$key + 1,
                        'profile_id' => $partnerProfile->id,
                    ]);
                    // Dispatch jobs for each type of image
                    AddSpatieMediaJob::dispatch(
                        $banner, // Assuming 'thumbnail' is the key containing the thumbnail path
                        $partnerProfileBanner,
                        'thumbnail',
                        'path'
                    );
                    AddSpatieMediaJob::dispatch(
                        $banner, // Assuming 'image' is the key containing the image path
                        $partnerProfileBanner,
                        'image',
                        'path'
                    );
                    AddSpatieMediaJob::dispatch(
                        $banner, // Assuming 'mobile_image' is the key containing the mobile image path
                        $partnerProfileBanner,
                        'mobile_image',
                        'path'
                    );
                }
            }
            }

    }
}

