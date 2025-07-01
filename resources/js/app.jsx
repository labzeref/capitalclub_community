import './bootstrap';
import "./bundle";
import '../scss/app.scss';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PostsProvider } from "./Store/PostsProvider";
import { useEffect } from 'react';




const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Captial Club";

createInertiaApp({
    title: (title) => `${title} ${title ? '-' : ''} ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // const handleContextMenu = (e) => {
        //     e.preventDefault(); 
        //   };




        root.render(
            <div>
                <PostsProvider>
                    <App {...props} />
                </PostsProvider>
            </div>


        );
    },
    progress: {
        color: "#fff",
    },
});
