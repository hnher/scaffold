import { createInertiaApp } from "@inertiajs/react";
import { Toaster } from "sonner";
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
//#region resources/js/components/ui/sonner.jsx
var getDocumentTheme = () => {
	if (typeof document === "undefined") return "system";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
};
var Toaster$1 = ({ ...props }) => {
	const [theme, setTheme] = useState(getDocumentTheme);
	useEffect(() => {
		const observer = new MutationObserver(() => setTheme(getDocumentTheme()));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ jsx(CircleCheckIcon, {}),
			info: /* @__PURE__ */ jsx(InfoIcon, {}),
			warning: /* @__PURE__ */ jsx(TriangleAlertIcon, {}),
			error: /* @__PURE__ */ jsx(OctagonXIcon, {}),
			loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		...props
	});
};
//#endregion
//#region resources/js/components/feedback/toast.jsx
var DEFAULT_DURATION = 4e3;
function ToastHost() {
	return /* @__PURE__ */ jsx(Toaster$1, {
		closeButton: true,
		duration: DEFAULT_DURATION,
		position: "top-center",
		richColors: true,
		toastOptions: { classNames: { description: "text-muted-foreground" } }
	});
}
//#endregion
//#region resources/js/app.jsx
var render = await createInertiaApp({
	resolve: async (name, page) => {
		const module = await (/* @__PURE__ */ Object.assign({ "./pages/Home.jsx": () => import("./assets/Home-Dtut6jfz.js") }))[`./pages/${name}.jsx`]?.();
		if (!module) throw new Error(`Page not found: ${name}`);
		return module.default ?? module;
	},
	strictMode: true,
	withApp: (app) => /* @__PURE__ */ jsxs(Fragment, { children: [app, /* @__PURE__ */ jsx(ToastHost, {})] }),
	title: (title, page) => {
		const appName = page.props.appName ?? "Laravel Scaffold";
		return title && title !== appName ? `${title} · ${appName}` : appName;
	}
});
var renderPage = (page) => render(page, renderToString);
createServer(renderPage);
//#endregion
export { renderPage as default };

//# sourceMappingURL=app.js.map