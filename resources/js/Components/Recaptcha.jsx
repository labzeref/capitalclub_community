import React, { useEffect, useState } from "react";

/**
 *
 * @param className Using for style
 * @param recaptchaKey The default is version 3
 * @param recaptchaKeyV2 It is version 2 key from Google
 * @param state This can be changed from parrent component to rerender at any time according to condition
 * @param setData This used to set the token and version data of parrent component
 * @param recaptchaVersion This used during initialization of recaptcha
 * @param recaptchaError This used if error came, so we initialize the recaptcha v2
 * @returns {Element} The element
 * @constructor
 */
const Recaptcha = ({
    className = '',
    recaptchaKey,
    recaptchaKeyV2,
    state,
    setData,
    recaptchaVersion,
    recaptchaError
}) => {
    /**
     * This will hold the instance, so we can reset it if error came because rendering is not allowed
     */
    const [recaptchaV2, setRecaptchaV2] = useState(null);
    /**
     * This will tell us that the recaptcha v2 is rendered or not
     */
    const [hasRecaptchaV2Rendered, setHasRecaptchaV2Rendered] = useState(false);

    const handleRecaptchaInitializationV2 = () => {
        if (!hasRecaptchaV2Rendered) {
            let recaptcha_v2_object = grecaptcha.enterprise.render('recaptcha-element', {
                'sitekey': recaptchaKeyV2,
                'theme': 'dark',
                'callback': async (token) => {
                    await setData((previous) => ({ ...previous, recaptcha: token, recaptcha_version: 2 }));
                },
            });

            setRecaptchaV2(recaptcha_v2_object);
            setHasRecaptchaV2Rendered(true);
        } else {
            grecaptcha.enterprise.reset(recaptchaV2)
        }
    };

    const handleRecaptchaInitializationV3 = () => {
        grecaptcha.enterprise.execute(recaptchaKey, { action: 'login' })
            .then(async (token) => {
                await setData((previous) => ({ ...previous, recaptcha: token, recaptcha_version: 3 }));
            });
    };

    /**
     * Initialize the recaptcha v3 by default
     */
    useEffect(() => {
        handleRecaptchaInitializationV3();
    }, []);

    /**
     * Handle initialization of recaptcha when ever state is changed from parrent
     */
    useEffect(() => {
        /**
         * If the recaptcha version was 3 and there was no error then render this one
         */
        if (recaptchaVersion === 3 && !recaptchaError) {
            handleRecaptchaInitializationV3();

            /**
             * If recaptcha version was 2 or there is error then initialize the v2
             */
        } else if (recaptchaVersion === 2 || recaptchaError) {
            handleRecaptchaInitializationV2();
        } else {
            handleRecaptchaInitializationV3();
        }
    }, [state]);

    return (
        <div id={'recaptcha-element'} className={className}></div>
    );
};


export default Recaptcha;
