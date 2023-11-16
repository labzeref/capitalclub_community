import './bootstrap';
import "./bundle";
import '../scss/app.scss';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PostsProvider } from "./Store/PostsProvider";



const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <div className="min-h-[85vh] ">
                <PostsProvider>
                    <App {...props} />
                </PostsProvider>
            </div>


        );
    },
    progress: {
        color: "#ffffff",
    },
});
