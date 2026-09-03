import { Head, router } from "@inertiajs/react";
import { AppWindow, Apple, ArrowRight, Blocks, Bot, Braces, Check, ChevronDown, ChevronRight, CloudCog, Database, FolderCode, GitBranch, GitCommitHorizontal, Languages, Layers3, LayoutDashboard, Monitor, MonitorSmartphone, Moon, PackageCheck, Palette, Play, Rocket, ServerCog, Settings2, ShieldCheck, Smartphone, Sun, Workflow, Zap } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Popover, ToggleGroup } from "radix-ui";
//#region resources/js/lib/utils.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region resources/js/components/ui/badge.jsx
var badgeVariants = cva("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-white",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot : "span", {
		"data-slot": "badge",
		className: cn(badgeVariants({
			variant,
			className
		})),
		...props
	});
}
//#endregion
//#region resources/js/components/ui/button.jsx
var buttonVariants = cva("inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\"size-\"])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary/80",
			destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/30",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
			secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-11 rounded-lg px-6 has-[>svg]:px-4",
			icon: "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region resources/js/components/ui/card.jsx
function Card({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		className: cn("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-semibold leading-none", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardAction({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-action",
		className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-6", className),
		...props
	});
}
//#endregion
//#region resources/js/components/ui/popover.jsx
function Popover$1({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Root, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Popover.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Content, {
		"data-slot": "popover-content",
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function PopoverHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-header",
		className: cn("flex flex-col gap-1 text-sm", className),
		...props
	});
}
function PopoverTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-title",
		className: cn("font-medium", className),
		...props
	});
}
function PopoverDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "popover-description",
		className: cn("text-muted-foreground", className),
		...props
	});
}
//#endregion
//#region resources/js/components/ui/toggle.jsx
var toggleVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-9 min-w-9 px-2",
			sm: "h-8 min-w-8 px-1.5",
			lg: "h-10 min-w-10 px-2.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region resources/js/components/ui/toggle-group.jsx
var ToggleGroupContext = React.createContext({
	size: "default",
	variant: "default",
	spacing: 0
});
function ToggleGroup$1({ className, variant, size, spacing = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(ToggleGroup.Root, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		style: { "--gap": spacing },
		className: cn("group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs", className),
		...props,
		children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant, size, ...props }) {
	const context = React.useContext(ToggleGroupContext);
	return /* @__PURE__ */ jsx(ToggleGroup.Item, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn(toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10", "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l", className),
		...props,
		children
	});
}
//#endregion
//#region resources/js/pages/Home.jsx
var projectLayers = [
	{
		directory: "Console/",
		description: "Laravel 核心、PC / H5 与管理后台",
		technology: "Laravel 13",
		icon: ServerCog
	},
	{
		directory: "Applet/",
		description: "多平台小程序应用与原子化样式",
		technology: "uni-app",
		icon: Blocks
	},
	{
		directory: "App/",
		description: "iOS / Android 原生应用体验",
		technology: "React Native",
		icon: Smartphone
	},
	{
		directory: ".agents/skills/",
		description: "为各技术栈提供专业化编码约束",
		technology: "5 Skills",
		icon: Bot
	}
];
var platformSolutions = [
	{
		number: "01",
		category: "CORE BACKEND",
		title: "Laravel 统一业务后端",
		description: "以 Laravel 作为整个系统的核心，集中承载业务规则、数据模型、身份认证、接口与队列任务。",
		technologies: [
			"Laravel 13",
			"PHP 8.4",
			"Sanctum"
		],
		icon: ServerCog
	},
	{
		number: "02",
		category: "PC & H5",
		title: "Inertia.js + React + shadcn/ui",
		description: "用 Inertia 连接 Laravel 与 React，以 shadcn/ui 构建可维护的组件系统，并通过响应式布局同时覆盖 PC 与 H5。",
		technologies: [
			"Inertia.js",
			"React 19",
			"shadcn/ui"
		],
		icon: MonitorSmartphone
	},
	{
		number: "03",
		category: "MINI PROGRAM",
		title: "uni-app + Weapp TailwindCSS",
		description: "使用 uni-app 组织小程序页面和跨平台能力，通过 Weapp TailwindCSS 保持高效、统一的样式开发体验。",
		technologies: [
			"uni-app",
			"Vue 3",
			"weapp-tailwindcss"
		],
		icon: AppWindow
	},
	{
		number: "04",
		category: "NATIVE APP",
		title: "React Native + NativeWind",
		description: "使用 React Native 构建 iOS 与 Android 应用，配合 NativeWind 复用熟悉的原子化样式工作流。",
		technologies: [
			"React Native",
			"Expo",
			"NativeWind"
		],
		icon: Smartphone
	},
	{
		number: "05",
		category: "ADMIN CONSOLE",
		title: "FilamentPHP 管理后台",
		description: "通过 Filament 的 Resource、Form、Table 与 Widget 快速搭建数据管理、运营配置和内部业务界面。",
		technologies: [
			"Filament v5",
			"Livewire 4",
			"Tailwind CSS"
		],
		icon: LayoutDashboard,
		className: "md:col-span-2 xl:col-span-1"
	}
];
var architectureNodes = [
	{
		label: "PC / H5",
		technology: "Inertia + React",
		icon: MonitorSmartphone
	},
	{
		label: "小程序",
		technology: "uni-app",
		icon: Blocks
	},
	{
		label: "原生 App",
		technology: "React Native",
		icon: Smartphone
	},
	{
		label: "管理后台",
		technology: "FilamentPHP",
		icon: LayoutDashboard
	}
];
var engineeringValues = [
	{
		icon: Database,
		title: "一套业务核心",
		description: "模型、权限、验证与业务规则集中在 Laravel，避免多端重复实现核心逻辑。"
	},
	{
		icon: Layers3,
		title: "各端选择合适技术",
		description: "Web、小程序、App 与管理端各自使用成熟生态，兼顾开发效率与平台体验。"
	},
	{
		icon: ShieldCheck,
		title: "一致的工程边界",
		description: "统一接口、认证和数据约定，让不同客户端可以独立演进，也能稳定协作。"
	}
];
var engineeringMetricIcons = [
	Database,
	MonitorSmartphone,
	Languages,
	Bot
];
var engineeringProcessIcons = [
	Braces,
	ServerCog,
	Workflow,
	ShieldCheck
];
var deliveryStageIcons = [
	GitCommitHorizontal,
	Workflow,
	CloudCog
];
var deliveryStoreIcons = [Apple, Play];
var ctaModuleIcons = [
	ServerCog,
	MonitorSmartphone,
	Smartphone,
	LayoutDashboard
];
var agentSkills = [
	{
		name: "laravel-specialist",
		scope: "Laravel 后端",
		description: "指导模型关系、API、认证、队列与自动化测试，让后端实现遵循一致的工程约束。",
		capabilities: [
			"Eloquent",
			"Sanctum",
			"Testing"
		],
		icon: ServerCog
	},
	{
		name: "shadcn",
		scope: "PC / H5 界面",
		description: "约束组件组合、语义设计令牌与无障碍实现，保持 React 界面开放且可维护。",
		capabilities: [
			"Components",
			"Tokens",
			"A11y"
		],
		icon: Blocks
	},
	{
		name: "filament-pro",
		scope: "管理后台",
		description: "覆盖 Resource、Form、Table、Action 与 Widget，提升后台页面的实现与测试效率。",
		capabilities: [
			"Resources",
			"Tables",
			"Widgets"
		],
		icon: LayoutDashboard
	},
	{
		name: "uni-app",
		scope: "小程序端",
		description: "提供跨平台组件、API、条件编译和平台兼容性参考，减少多小程序平台差异。",
		capabilities: [
			"Cross-platform",
			"APIs",
			"Config"
		],
		icon: Smartphone
	},
	{
		name: "ui-ux-pro-max",
		scope: "体验与设计",
		description: "在页面实现前补充配色、响应式、交互和可访问性规则，让各端体验保持一致。",
		capabilities: [
			"Responsive",
			"Color",
			"UX"
		],
		icon: Palette,
		className: "sm:col-span-2"
	}
];
var PARTICLE_GRID_SIZE = 40;
var DESKTOP_PARTICLE_COUNT = 24;
var MOBILE_PARTICLE_COUNT = 12;
function GridParticles() {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let animationFrame;
		let width = 0;
		let height = 0;
		let particles = [];
		let primaryColor = "";
		const syncPrimaryColor = () => {
			primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
		};
		const resizeCanvas = () => {
			const bounds = canvas.getBoundingClientRect();
			const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
			width = bounds.width;
			height = bounds.height;
			canvas.width = Math.floor(width * pixelRatio);
			canvas.height = Math.floor(height * pixelRatio);
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		};
		const createParticle = () => {
			const movesHorizontally = Math.random() > .5;
			const columns = Math.max(1, Math.floor(width / PARTICLE_GRID_SIZE));
			const rows = Math.max(1, Math.floor(height / PARTICLE_GRID_SIZE));
			return {
				x: Math.floor(Math.random() * (columns + 1)) * PARTICLE_GRID_SIZE,
				y: Math.floor(Math.random() * (rows + 1)) * PARTICLE_GRID_SIZE,
				directionX: movesHorizontally ? Math.random() > .5 ? 1 : -1 : 0,
				directionY: movesHorizontally ? 0 : Math.random() > .5 ? 1 : -1,
				speed: .55 + Math.random() * .7,
				length: 16 + Math.random() * 24,
				opacity: 0,
				maxOpacity: .5 + Math.random() * .45,
				size: 1.5 + Math.random() * 1.5,
				life: 0,
				maxLife: 240 + Math.random() * 240
			};
		};
		const initializeParticles = () => {
			const count = width < 640 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
			particles = Array.from({ length: count }, () => {
				const particle = createParticle();
				particle.life = Math.random() * particle.maxLife;
				return particle;
			});
		};
		const updateParticle = (particle) => {
			particle.life += 1;
			const progress = particle.life / particle.maxLife;
			particle.opacity = progress < .15 ? progress / .15 * particle.maxOpacity : progress > .8 ? (1 - progress) / .2 * particle.maxOpacity : particle.maxOpacity;
			const previousX = particle.x;
			const previousY = particle.y;
			particle.x += particle.directionX * particle.speed;
			particle.y += particle.directionY * particle.speed;
			if (particle.directionX === 0) {
				if (particle.directionY !== 0 && Math.floor(previousY / PARTICLE_GRID_SIZE) !== Math.floor(particle.y / PARTICLE_GRID_SIZE) && Math.random() < .25) {
					particle.y = (particle.directionY > 0 ? Math.floor(particle.y / PARTICLE_GRID_SIZE) : Math.ceil(particle.y / PARTICLE_GRID_SIZE)) * PARTICLE_GRID_SIZE;
					particle.directionY = 0;
					particle.directionX = Math.random() > .5 ? 1 : -1;
				}
			} else if (Math.floor(previousX / PARTICLE_GRID_SIZE) !== Math.floor(particle.x / PARTICLE_GRID_SIZE) && Math.random() < .25) {
				particle.x = (particle.directionX > 0 ? Math.floor(particle.x / PARTICLE_GRID_SIZE) : Math.ceil(particle.x / PARTICLE_GRID_SIZE)) * PARTICLE_GRID_SIZE;
				particle.directionX = 0;
				particle.directionY = Math.random() > .5 ? 1 : -1;
			}
			const isOutside = particle.x < -50 || particle.x > width + 50 || particle.y < -50 || particle.y > height + 50;
			if (particle.life >= particle.maxLife || isOutside) Object.assign(particle, createParticle());
		};
		const drawParticles = () => {
			context.clearRect(0, 0, width, height);
			particles.forEach((particle) => {
				if (particle.opacity <= .01) return;
				const tailX = particle.x - particle.directionX * particle.length;
				const tailY = particle.y - particle.directionY * particle.length;
				const gradient = context.createLinearGradient(tailX, tailY, particle.x, particle.y);
				gradient.addColorStop(0, "transparent");
				gradient.addColorStop(1, primaryColor);
				context.save();
				context.globalAlpha = particle.opacity;
				context.beginPath();
				context.moveTo(tailX, tailY);
				context.lineTo(particle.x, particle.y);
				context.strokeStyle = gradient;
				context.lineWidth = Math.max(1, particle.size * .8);
				context.lineCap = "round";
				context.stroke();
				context.beginPath();
				context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				context.fillStyle = primaryColor;
				context.fill();
				context.restore();
			});
		};
		const animate = () => {
			particles.forEach(updateParticle);
			drawParticles();
			animationFrame = window.requestAnimationFrame(animate);
		};
		syncPrimaryColor();
		resizeCanvas();
		initializeParticles();
		animate();
		const resizeObserver = new ResizeObserver(resizeCanvas);
		const themeObserver = new MutationObserver(syncPrimaryColor);
		resizeObserver.observe(canvas);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		window.addEventListener("resize", resizeCanvas, { passive: true });
		return () => {
			window.cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "hero-particles pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("canvas", {
			ref: canvasRef,
			className: "size-full"
		})
	});
}
function SettingsControl({ locale, locales, copy }) {
	const [isChangingLanguage, setIsChangingLanguage] = useState(false);
	const [theme, setTheme] = useState(() => {
		if (typeof window === "undefined") return "system";
		try {
			const storedTheme = localStorage.getItem("scaffold-theme");
			return [
				"light",
				"dark",
				"system"
			].includes(storedTheme) ? storedTheme : "system";
		} catch {
			return "system";
		}
	});
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const syncTheme = () => {
			document.documentElement.classList.toggle("dark", theme === "dark" || theme === "system" && mediaQuery.matches);
		};
		syncTheme();
		if (theme === "system") mediaQuery.addEventListener("change", syncTheme);
		return () => mediaQuery.removeEventListener("change", syncTheme);
	}, [theme]);
	const changeTheme = (nextTheme) => {
		if (!nextTheme) return;
		try {
			localStorage.setItem("scaffold-theme", nextTheme);
		} catch {}
		setTheme(nextTheme);
	};
	const changeLocale = (event) => {
		const nextLocale = event.target.value;
		if (nextLocale === locale) return;
		router.post("/locale", { locale: nextLocale }, {
			preserveScroll: true,
			onStart: () => setIsChangingLanguage(true),
			onFinish: () => setIsChangingLanguage(false)
		});
	};
	const themeOptions = [
		{
			value: "light",
			label: copy.theme_light,
			icon: Sun
		},
		{
			value: "dark",
			label: copy.theme_dark,
			icon: Moon
		},
		{
			value: "system",
			label: copy.theme_system,
			icon: Monitor
		}
	];
	return /* @__PURE__ */ jsxs(Popover$1, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			size: "icon",
			"aria-label": copy.settings_label,
			className: "border-border/60 bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80",
			children: /* @__PURE__ */ jsx(Settings2, { "aria-hidden": "true" })
		})
	}), /* @__PURE__ */ jsxs(PopoverContent, {
		align: "end",
		className: "w-[min(22rem,calc(100vw-2rem))] border-border/60 bg-popover/80 shadow-2xl shadow-black/10 backdrop-blur-2xl",
		children: [/* @__PURE__ */ jsxs(PopoverHeader, { children: [/* @__PURE__ */ jsx(PopoverTitle, { children: copy.settings_title }), /* @__PURE__ */ jsx(PopoverDescription, { children: copy.settings_description })] }), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 flex flex-col gap-5",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "mb-2 text-sm font-medium",
				children: copy.theme
			}), /* @__PURE__ */ jsx(ToggleGroup$1, {
				type: "single",
				value: theme,
				onValueChange: changeTheme,
				variant: "outline",
				size: "lg",
				className: "grid w-full grid-cols-3",
				"aria-label": copy.theme,
				children: themeOptions.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxs(ToggleGroupItem, {
					value,
					"aria-label": label,
					className: "min-h-11 px-2 border-border/50 bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/70 data-[state=on]:bg-background/90",
					children: [/* @__PURE__ */ jsx(Icon, { "aria-hidden": "true" }), /* @__PURE__ */ jsx("span", {
						className: "hidden sm:inline",
						children: label
					})]
				}, value))
			})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				htmlFor: "homepage-locale",
				className: "mb-2 block text-sm font-medium",
				children: copy.language
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ jsx(Languages, {
						className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("select", {
						id: "homepage-locale",
						value: locale,
						onChange: changeLocale,
						disabled: isChangingLanguage,
						"aria-busy": isChangingLanguage,
						"aria-label": isChangingLanguage ? copy.changing_language : copy.language,
						className: "h-11 w-full appearance-none rounded-md border border-border/60 bg-background/60 pl-10 pr-9 text-sm font-medium shadow-xs outline-none backdrop-blur-md transition-[color,box-shadow,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-wait disabled:opacity-60",
						children: locales.map(({ value, label }) => /* @__PURE__ */ jsx("option", {
							value,
							children: label
						}, value))
					}),
					/* @__PURE__ */ jsx(ChevronDown, {
						className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					})
				]
			})] })]
		})]
	})] });
}
function Brand({ compact = false, tagline }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ jsx("img", {
			src: "/logo-mark.svg",
			alt: "",
			className: "size-9 shrink-0 rounded-xl shadow-sm",
			width: "36",
			height: "36"
		}), !compact && /* @__PURE__ */ jsxs("span", {
			className: "hidden flex-col sm:flex",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm font-semibold leading-none tracking-tight",
				children: "Laravel Scaffold"
			}), /* @__PURE__ */ jsx("span", {
				className: "mt-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground",
				children: tagline
			})]
		})]
	});
}
function WorkspacePreview({ copy }) {
	const layers = projectLayers.map((layer, index) => ({
		...layer,
		...copy.layers[index]
	}));
	return /* @__PURE__ */ jsxs(Card, {
		className: "home-reveal-delayed overflow-hidden rounded-2xl border border-border/60 bg-card/60 py-0 shadow-2xl shadow-primary/10 backdrop-blur-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-primary/15",
		children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "border-b border-border/50 bg-muted/30 py-4 backdrop-blur-md",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/70 text-primary backdrop-blur-sm shadow-xs",
					children: /* @__PURE__ */ jsx(FolderCode, {
						className: "size-4",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "truncate text-sm",
						children: copy.title
					}), /* @__PURE__ */ jsx(CardDescription, {
						className: "mt-1 text-xs",
						children: copy.subtitle
					})]
				})]
			}), /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Badge, {
				variant: "secondary",
				className: "border border-primary/20 bg-secondary/80 backdrop-blur-sm text-primary",
				children: copy.ready
			}) })]
		}), /* @__PURE__ */ jsxs(CardContent, {
			className: "flex flex-col gap-3 py-5",
			children: [layers.map(({ directory, description, technology, icon: Icon }) => /* @__PURE__ */ jsxs("div", {
				className: "group flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-background/80 hover:shadow-md",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs",
						children: /* @__PURE__ */ jsx(Icon, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("code", {
							className: "text-sm font-semibold",
							children: directory
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-1 block text-xs leading-5 text-muted-foreground",
							children: description
						})]
					}),
					/* @__PURE__ */ jsx(Badge, {
						variant: "outline",
						className: "hidden sm:inline-flex border-border/60 bg-background/60 backdrop-blur-xs",
						children: technology
					}),
					/* @__PURE__ */ jsx(ChevronRight, {
						className: "size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5",
						"aria-hidden": "true"
					})
				]
			}, directory)), /* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/90 p-4 text-primary-foreground shadow-lg shadow-primary/20 backdrop-blur-md",
				children: [/* @__PURE__ */ jsx(Workflow, {
					className: "mt-0.5 size-5 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold",
					children: copy.core_title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs leading-5 text-primary-foreground/80",
					children: copy.core_description
				})] })]
			})]
		})]
	});
}
function ArchitectureDiagram({ copy }) {
	const nodes = architectureNodes.map((node, index) => ({
		...node,
		...copy.nodes[index]
	}));
	return /* @__PURE__ */ jsxs(Card, {
		className: "overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-xl shadow-foreground/5 backdrop-blur-2xl",
		children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "border-b border-border/50 bg-muted/25 backdrop-blur-md",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, { children: /* @__PURE__ */ jsx("h3", {
				className: "text-lg",
				children: copy.map_title
			}) }), /* @__PURE__ */ jsx(CardDescription, {
				className: "mt-2",
				children: copy.map_description
			})] }), /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Badge, {
				variant: "outline",
				className: "hidden border-primary/30 bg-primary/10 text-primary backdrop-blur-xs sm:inline-flex",
				children: copy.map_badge
			}) })]
		}), /* @__PURE__ */ jsx(CardContent, {
			className: "p-5 sm:p-7",
			children: /* @__PURE__ */ jsxs("div", {
				className: "architecture-flow",
				role: "img",
				"aria-label": copy.map_label,
				children: [/* @__PURE__ */ jsx(Card, {
					className: "architecture-core mx-auto max-w-md border border-primary/40 bg-primary/90 py-5 text-primary-foreground shadow-xl shadow-primary/20 backdrop-blur-xl",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "flex items-center gap-4 px-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15",
								children: /* @__PURE__ */ jsx(ServerCog, {
									className: "size-6",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70",
									children: copy.core_eyebrow
								}), /* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-lg font-semibold",
									children: copy.core_title
								})]
							}),
							/* @__PURE__ */ jsx(Badge, {
								className: "hidden bg-primary-foreground/15 text-primary-foreground backdrop-blur-xs sm:inline-flex",
								children: copy.api
							})
						]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "architecture-nodes mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: nodes.map(({ label, technology, icon: Icon }) => /* @__PURE__ */ jsx(Card, {
						className: "architecture-node gap-4 rounded-xl border border-border/60 bg-background/60 py-5 shadow-xs backdrop-blur-lg transition-all duration-200 hover:border-primary/40 hover:bg-background/85 hover:shadow-md hover:-translate-y-0.5",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "flex items-center gap-3 px-4 lg:flex-col lg:items-start",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs",
								children: /* @__PURE__ */ jsx(Icon, {
									className: "size-4",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
								className: "block text-sm font-semibold",
								children: label
							}), /* @__PURE__ */ jsx("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: technology
							})] })]
						})
					}, label))
				})]
			})
		})]
	});
}
function SolutionsOrbit({ solutions, activeIndex, onSelect }) {
	const desktopPositions = [
		"lg:top-0 lg:left-1/2 lg:-translate-x-1/2",
		"lg:top-[22%] lg:right-0 lg:translate-x-0",
		"lg:bottom-[4%] lg:right-[4%] lg:translate-x-0",
		"lg:bottom-[4%] lg:left-[4%] lg:translate-x-0",
		"lg:top-[22%] lg:left-0 lg:translate-x-0"
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-primary/20 via-chart-2/15 to-transparent blur-3xl opacity-70",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative hidden size-136 items-center justify-center lg:flex",
				children: [
					/* @__PURE__ */ jsx("div", { className: "orbital-ring size-128 opacity-60" }),
					/* @__PURE__ */ jsx("div", { className: "orbital-ring-outer size-88 opacity-40" }),
					/* @__PURE__ */ jsx("div", { className: "orbital-ring size-52 opacity-50" }),
					/* @__PURE__ */ jsxs("div", {
						className: "orbital-pulse z-10 flex size-28 flex-col items-center justify-center rounded-3xl border border-primary/40 bg-card/70 p-3 text-center shadow-xl shadow-primary/20 backdrop-blur-2xl transition-all",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs",
								children: /* @__PURE__ */ jsx(ServerCog, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-primary",
								children: "Core Hub"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-[0.625rem] text-muted-foreground",
								children: "Scaffold"
							})
						]
					}),
					solutions.map((solution, index) => {
						const Icon = solution.icon;
						const isActive = activeIndex === index;
						return /* @__PURE__ */ jsx("div", {
							className: cn("absolute w-60 transition-all duration-300", desktopPositions[index]),
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => onSelect(index),
								onMouseEnter: () => onSelect(index),
								className: cn("group relative flex w-full flex-col rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1", isActive ? "border-primary/60 bg-card/85 shadow-xl shadow-primary/15 ring-2 ring-primary/25" : "border-border/60 bg-card/50 shadow-md hover:border-primary/40 hover:bg-card/70"),
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: cn("flex size-9 items-center justify-center rounded-lg transition-colors", isActive ? "bg-primary text-primary-foreground shadow-xs" : "bg-secondary/80 text-primary"),
											children: /* @__PURE__ */ jsx(Icon, {
												className: "size-4",
												"aria-hidden": "true"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs font-semibold text-primary/70",
											children: solution.number
										})]
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "mt-2.5 line-clamp-1 text-sm font-semibold text-foreground",
										children: solution.title
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2 flex flex-wrap gap-1.5",
										children: solution.technologies.slice(0, 2).map((tech) => /* @__PURE__ */ jsx(Badge, {
											variant: "secondary",
											className: "px-1.5 py-0 text-[0.625rem]",
											children: tech
										}, tech))
									})
								]
							})
						}, solution.number);
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid w-full gap-3 sm:grid-cols-2 lg:hidden",
				children: solutions.map((solution, index) => {
					const Icon = solution.icon;
					return /* @__PURE__ */ jsxs("div", {
						onClick: () => onSelect(index),
						className: cn("group flex flex-col rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200", activeIndex === index ? "border-primary/50 bg-card/80 shadow-lg shadow-primary/10" : "border-border/60 bg-card/50"),
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary",
									children: /* @__PURE__ */ jsx(Icon, {
										className: "size-4",
										"aria-hidden": "true"
									})
								}), /* @__PURE__ */ jsx(Badge, {
									variant: "outline",
									className: "text-[0.625rem] text-primary",
									children: solution.number
								})]
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "mt-2 text-sm font-semibold text-foreground",
								children: solution.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: solution.description
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: solution.technologies.map((tech) => /* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									className: "px-1.5 py-0 text-[0.625rem]",
									children: tech
								}, tech))
							})
						]
					}, solution.number);
				})
			})
		]
	});
}
function SkillsOrbit({ skills, activeIndex, onSelect }) {
	const desktopPositions = [
		"lg:top-0 lg:left-1/2 lg:-translate-x-1/2",
		"lg:top-[22%] lg:right-0 lg:translate-x-0",
		"lg:bottom-[4%] lg:right-[4%] lg:translate-x-0",
		"lg:bottom-[4%] lg:left-[4%] lg:translate-x-0",
		"lg:top-[22%] lg:left-0 lg:translate-x-0"
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative mx-auto flex w-full max-w-2xl flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-chart-2/20 via-primary/15 to-transparent blur-3xl opacity-70",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative hidden size-136 items-center justify-center lg:flex",
				children: [
					/* @__PURE__ */ jsx("div", { className: "orbital-ring size-128 opacity-60" }),
					/* @__PURE__ */ jsx("div", { className: "orbital-ring-outer size-88 opacity-40" }),
					/* @__PURE__ */ jsx("div", { className: "orbital-ring size-52 opacity-50" }),
					/* @__PURE__ */ jsxs("div", {
						className: "orbital-pulse z-10 flex size-28 flex-col items-center justify-center rounded-3xl border border-primary/40 bg-card/70 p-3 text-center shadow-xl shadow-primary/20 backdrop-blur-2xl transition-all",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs",
								children: /* @__PURE__ */ jsx(Bot, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mt-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-primary",
								children: "AI Skills"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "text-[0.625rem] text-muted-foreground",
								children: "Agents"
							})
						]
					}),
					skills.map((skill, index) => {
						const Icon = skill.icon;
						const isActive = activeIndex === index;
						return /* @__PURE__ */ jsx("div", {
							className: cn("absolute w-60 transition-all duration-300", desktopPositions[index]),
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => onSelect(index),
								onMouseEnter: () => onSelect(index),
								className: cn("group relative flex w-full flex-col rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1", isActive ? "border-primary/60 bg-card/85 shadow-xl shadow-primary/15 ring-2 ring-primary/25" : "border-border/60 bg-card/50 shadow-md hover:border-primary/40 hover:bg-card/70"),
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: cn("flex size-9 items-center justify-center rounded-lg transition-colors", isActive ? "bg-primary text-primary-foreground shadow-xs" : "bg-secondary/80 text-primary"),
											children: /* @__PURE__ */ jsx(Icon, {
												className: "size-4",
												"aria-hidden": "true"
											})
										}), /* @__PURE__ */ jsx(Badge, {
											variant: "outline",
											className: "border-primary/30 bg-primary/10 text-[0.625rem] text-primary",
											children: skill.scope
										})]
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "mt-2.5 line-clamp-1 font-mono text-sm font-semibold text-foreground",
										children: skill.name
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-2 flex flex-wrap gap-1.5",
										children: skill.capabilities.slice(0, 2).map((cap) => /* @__PURE__ */ jsx(Badge, {
											variant: "secondary",
											className: "px-1.5 py-0 text-[0.625rem]",
											children: cap
										}, cap))
									})
								]
							})
						}, skill.name);
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid w-full gap-3 sm:grid-cols-2 lg:hidden",
				children: skills.map((skill, index) => {
					const Icon = skill.icon;
					return /* @__PURE__ */ jsxs("div", {
						onClick: () => onSelect(index),
						className: cn("group flex flex-col rounded-2xl border p-4 backdrop-blur-xl transition-all duration-200", activeIndex === index ? "border-primary/50 bg-card/80 shadow-lg shadow-primary/10" : "border-border/60 bg-card/50"),
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary",
									children: /* @__PURE__ */ jsx(Icon, {
										className: "size-4",
										"aria-hidden": "true"
									})
								}), /* @__PURE__ */ jsx(Badge, {
									variant: "outline",
									className: "text-[0.625rem] text-primary",
									children: skill.scope
								})]
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "mt-2 font-mono text-sm font-semibold text-foreground",
								children: skill.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: skill.description
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: skill.capabilities.map((cap) => /* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									className: "px-1.5 py-0 text-[0.625rem]",
									children: cap
								}, cap))
							})
						]
					}, skill.name);
				})
			})
		]
	});
}
function Home({ locale, locales, translations: copy }) {
	const [isHeaderFloating, setIsHeaderFloating] = useState(false);
	const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
	const [activeSkillIndex, setActiveSkillIndex] = useState(0);
	useEffect(() => {
		document.documentElement.lang = locale.replace("_", "-");
	}, [locale]);
	useEffect(() => {
		let animationFrame = null;
		const syncHeader = () => {
			if (animationFrame !== null) return;
			animationFrame = window.requestAnimationFrame(() => {
				setIsHeaderFloating(window.scrollY > 24);
				animationFrame = null;
			});
		};
		syncHeader();
		window.addEventListener("scroll", syncHeader, { passive: true });
		return () => {
			window.removeEventListener("scroll", syncHeader);
			if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
		};
	}, []);
	const solutions = platformSolutions.map((solution, index) => ({
		...solution,
		...copy.solutions.items[index]
	}));
	const skills = agentSkills.map((skill, index) => ({
		...skill,
		...copy.skills.items[index]
	}));
	const engineering = engineeringValues.map((value, index) => ({
		...value,
		...copy.engineering.items[index]
	}));
	const engineeringMetrics = copy.engineering.metrics.map((metric, index) => ({
		...metric,
		icon: engineeringMetricIcons[index]
	}));
	const engineeringProcess = copy.engineering.process.items.map((step, index) => ({
		...step,
		icon: engineeringProcessIcons[index]
	}));
	const deliveryStages = copy.delivery.stages.map((stage, index) => ({
		...stage,
		icon: deliveryStageIcons[index]
	}));
	const deliveryStores = copy.delivery.stores.map((store, index) => ({
		...store,
		icon: deliveryStoreIcons[index]
	}));
	const ctaModules = copy.cta.modules.map((module, index) => ({
		...module,
		icon: ctaModuleIcons[index]
	}));
	const activeSolution = solutions[activeSolutionIndex] || solutions[0];
	const activeSkill = skills[activeSkillIndex] || skills[0];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Head, { children: [/* @__PURE__ */ jsx("title", { children: copy.meta.title }), /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: copy.meta.description
		})] }),
		/* @__PURE__ */ jsx("a", {
			href: "#main-content",
			className: "fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0",
			children: copy.controls.skip_to_content
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "page-shell min-h-dvh overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("header", {
					className: cn("fixed inset-x-0 top-0 z-40 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", isHeaderFloating ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"),
					children: /* @__PURE__ */ jsxs("div", {
						className: cn("mx-auto flex items-center justify-between gap-3 border transition-[height,max-width,border-radius,border-color,background-color,box-shadow,padding,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4", isHeaderFloating ? "h-16 max-w-5xl rounded-2xl border-border/60 bg-background/65 px-3 shadow-xl shadow-foreground/5 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 sm:px-5" : "h-18 max-w-7xl rounded-none border-transparent bg-transparent px-4 shadow-none sm:px-6 lg:px-8"),
						children: [
							/* @__PURE__ */ jsx("a", {
								href: "/",
								"aria-label": copy.controls.home_label,
								className: "flex min-h-11 items-center rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
								children: /* @__PURE__ */ jsx(Brand, { tagline: copy.brand.tagline })
							}),
							/* @__PURE__ */ jsxs("nav", {
								"aria-label": copy.nav.main_label,
								className: "hidden items-center gap-1 md:flex",
								children: [
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										className: "hover:bg-background/60 hover:backdrop-blur-sm",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: "#architecture",
											children: copy.nav.architecture
										})
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										className: "hover:bg-background/60 hover:backdrop-blur-sm",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: "#solutions",
											children: copy.nav.solutions
										})
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										className: "hover:bg-background/60 hover:backdrop-blur-sm",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: "#skills",
											children: copy.nav.skills
										})
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										className: "hover:bg-background/60 hover:backdrop-blur-sm",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: "#engineering",
											children: copy.nav.engineering
										})
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "ghost",
										className: "hover:bg-background/60 hover:backdrop-blur-sm",
										asChild: true,
										children: /* @__PURE__ */ jsx("a", {
											href: "#delivery",
											children: copy.nav.delivery
										})
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-1 sm:gap-2",
								children: /* @__PURE__ */ jsx(SettingsControl, {
									locale,
									locales,
									copy: copy.controls
								})
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs("main", {
					id: "main-content",
					children: [
						/* @__PURE__ */ jsxs("section", {
							className: "home-section relative py-24 sm:py-28 lg:py-32",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "hero-grid pointer-events-none absolute inset-0",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx(GridParticles, {}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "home-reveal max-w-3xl",
										children: [
											/* @__PURE__ */ jsxs(Badge, {
												variant: "secondary",
												className: "mb-6 border border-primary/20 bg-secondary/70 backdrop-blur-md text-primary shadow-xs",
												children: [/* @__PURE__ */ jsx(Zap, { "aria-hidden": "true" }), copy.hero.badge]
											}),
											/* @__PURE__ */ jsxs("h1", {
												className: "text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl lg:leading-[0.98]",
												children: [copy.hero.title_first, /* @__PURE__ */ jsx("span", {
													className: "block text-primary",
													children: copy.hero.title_accent
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-7 max-w-2xl text-balance text-xl font-medium leading-8 sm:text-2xl sm:leading-9",
												children: copy.hero.lead
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.hero.description
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-8 flex flex-col gap-3 sm:flex-row",
												children: [/* @__PURE__ */ jsx(Button, {
													size: "lg",
													className: "shadow-lg shadow-primary/20",
													asChild: true,
													children: /* @__PURE__ */ jsxs("a", {
														href: "#architecture",
														children: [copy.hero.primary_cta, /* @__PURE__ */ jsx(ArrowRight, {
															"data-icon": "inline-end",
															"aria-hidden": "true"
														})]
													})
												}), /* @__PURE__ */ jsx(Button, {
													size: "lg",
													variant: "outline",
													className: "border-border/60 bg-background/50 backdrop-blur-md hover:bg-background/80",
													asChild: true,
													children: /* @__PURE__ */ jsx("a", {
														href: "#skills",
														children: copy.hero.secondary_cta
													})
												})]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground",
												children: copy.hero.checks.map((item) => /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsx(Check, {
														className: "size-4 text-primary",
														"aria-hidden": "true"
													}), item]
												}, item))
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end",
										children: [/* @__PURE__ */ jsx("div", {
											className: "absolute -inset-8 -z-10 rounded-[2.5rem] bg-linear-to-tr from-primary/25 via-chart-2/15 to-transparent blur-3xl opacity-80",
											"aria-hidden": "true"
										}), /* @__PURE__ */ jsx(WorkspacePreview, { copy: copy.workspace })]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("section", {
							id: "architecture",
							className: "home-section border-y border-border/50 bg-muted/15 py-20 sm:py-24 backdrop-blur-[2px]",
							children: /* @__PURE__ */ jsx("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
									children: [/* @__PURE__ */ jsx("div", {
										className: "order-2 lg:order-1",
										children: /* @__PURE__ */ jsx(ArchitectureDiagram, { copy: copy.architecture })
									}), /* @__PURE__ */ jsxs("div", {
										className: "order-1 flex flex-col justify-center lg:order-2",
										children: [
											/* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
												children: copy.architecture.badge
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
												children: copy.architecture.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.architecture.description
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-8 flex flex-col gap-3",
												children: engineering.map(({ icon: Icon, title, description }) => /* @__PURE__ */ jsxs("div", {
													className: "flex items-start gap-3.5 rounded-xl border border-border/50 bg-card/40 p-3.5 backdrop-blur-md transition-colors hover:border-primary/30",
													children: [/* @__PURE__ */ jsx("span", {
														className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs",
														children: /* @__PURE__ */ jsx(Icon, {
															className: "size-4",
															"aria-hidden": "true"
														})
													}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
														className: "text-sm font-semibold text-foreground",
														children: title
													}), /* @__PURE__ */ jsx("p", {
														className: "mt-0.5 text-xs leading-5 text-muted-foreground",
														children: description
													})] })]
												}, title))
											})
										]
									})]
								})
							})
						}),
						/* @__PURE__ */ jsx("section", {
							id: "solutions",
							className: "home-section py-20 sm:py-24",
							children: /* @__PURE__ */ jsx("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col justify-center",
										children: [
											/* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
												children: copy.solutions.badge
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
												children: copy.solutions.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.solutions.description
											}),
											/* @__PURE__ */ jsxs(Card, {
												className: "mt-8 rounded-2xl border border-primary/30 bg-card/60 p-6 shadow-xl shadow-primary/5 backdrop-blur-2xl transition-all",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ jsx("span", {
																className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs",
																children: activeSolution.icon && /* @__PURE__ */ jsx(activeSolution.icon, {
																	className: "size-5",
																	"aria-hidden": "true"
																})
															}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
																className: "text-xs font-semibold uppercase tracking-wider text-primary",
																children: activeSolution.category
															}), /* @__PURE__ */ jsx("h3", {
																className: "text-lg font-semibold text-foreground",
																children: activeSolution.title
															})] })]
														}), /* @__PURE__ */ jsx(Badge, {
															variant: "secondary",
															className: "font-mono text-xs",
															children: activeSolution.number
														})]
													}),
													/* @__PURE__ */ jsx("p", {
														className: "mt-4 text-sm leading-6 text-muted-foreground",
														children: activeSolution.description
													}),
													/* @__PURE__ */ jsx("div", {
														className: "mt-4 flex flex-wrap gap-2",
														children: activeSolution.technologies.map((tech) => /* @__PURE__ */ jsx(Badge, {
															variant: "outline",
															className: "border-border/60 bg-background/60 backdrop-blur-xs",
															children: tech
														}, tech))
													})
												]
											})
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex justify-center",
										children: /* @__PURE__ */ jsx(SolutionsOrbit, {
											solutions,
											activeIndex: activeSolutionIndex,
											onSelect: setActiveSolutionIndex
										})
									})]
								})
							})
						}),
						/* @__PURE__ */ jsx("section", {
							id: "skills",
							className: "home-section border-y border-border/50 bg-muted/15 py-20 sm:py-24 backdrop-blur-[2px]",
							children: /* @__PURE__ */ jsx("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]",
									children: [/* @__PURE__ */ jsx("div", {
										className: "order-2 flex justify-center lg:order-1",
										children: /* @__PURE__ */ jsx(SkillsOrbit, {
											skills,
											activeIndex: activeSkillIndex,
											onSelect: setActiveSkillIndex
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "order-1 flex flex-col justify-center lg:order-2",
										children: [
											/* @__PURE__ */ jsxs(Badge, {
												variant: "outline",
												className: "mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
												children: [/* @__PURE__ */ jsx(Bot, { "aria-hidden": "true" }), copy.skills.badge]
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
												children: copy.skills.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.skills.description
											}),
											/* @__PURE__ */ jsxs(Card, {
												className: "mt-8 rounded-2xl border border-primary/30 bg-card/60 p-6 shadow-xl shadow-primary/5 backdrop-blur-2xl transition-all",
												children: [
													/* @__PURE__ */ jsx("div", {
														className: "flex items-center justify-between gap-3",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ jsx("span", {
																className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs",
																children: activeSkill.icon && /* @__PURE__ */ jsx(activeSkill.icon, {
																	className: "size-5",
																	"aria-hidden": "true"
																})
															}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
																className: "font-mono text-base font-semibold text-foreground",
																children: activeSkill.name
															}), /* @__PURE__ */ jsx(Badge, {
																variant: "outline",
																className: "mt-1 border-primary/30 text-xs text-primary",
																children: activeSkill.scope
															})] })]
														})
													}),
													/* @__PURE__ */ jsx("p", {
														className: "mt-4 text-sm leading-6 text-muted-foreground",
														children: activeSkill.description
													}),
													/* @__PURE__ */ jsx("div", {
														className: "mt-4 flex flex-wrap gap-2",
														children: activeSkill.capabilities.map((cap) => /* @__PURE__ */ jsx(Badge, {
															variant: "secondary",
															className: "border border-border/40 bg-secondary/70 backdrop-blur-xs",
															children: cap
														}, cap))
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-4 flex items-center gap-3.5 rounded-xl border border-border/50 bg-background/50 p-3.5 backdrop-blur-md",
												children: [/* @__PURE__ */ jsx("span", {
													className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary",
													children: /* @__PURE__ */ jsx(FolderCode, {
														className: "size-4",
														"aria-hidden": "true"
													})
												}), /* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("code", {
														className: "text-xs font-semibold",
														children: copy.skills.path
													}), /* @__PURE__ */ jsx("p", {
														className: "mt-0.5 text-[0.6875rem] text-muted-foreground",
														children: copy.skills.path_description
													})]
												})]
											})
										]
									})]
								})
							})
						}),
						/* @__PURE__ */ jsx("section", {
							id: "engineering",
							className: "home-section py-20 sm:py-24",
							children: /* @__PURE__ */ jsx("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col justify-center",
										children: [
											/* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "mb-4 w-fit border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
												children: copy.engineering.badge
											}),
											/* @__PURE__ */ jsx("h2", {
												className: "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
												children: copy.engineering.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.engineering.description
											}),
											/* @__PURE__ */ jsxs(Card, {
												className: "mt-8 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-none backdrop-blur-xl",
												children: [/* @__PURE__ */ jsxs(CardHeader, {
													className: "p-0 pb-5",
													children: [/* @__PURE__ */ jsx(CardTitle, {
														className: "text-lg",
														children: /* @__PURE__ */ jsx("h3", { children: copy.engineering.metrics_title })
													}), /* @__PURE__ */ jsx(CardDescription, {
														className: "text-xs leading-5",
														children: copy.engineering.metrics_description
													})]
												}), /* @__PURE__ */ jsx(CardContent, {
													className: "p-0",
													children: /* @__PURE__ */ jsx("dl", {
														className: "grid grid-cols-2 gap-x-6 gap-y-5",
														children: engineeringMetrics.map(({ icon: Icon, value, label, description }) => /* @__PURE__ */ jsxs("div", {
															className: "min-w-0 border-l border-primary/30 pl-3",
															children: [
																/* @__PURE__ */ jsxs("dt", {
																	className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
																	children: [/* @__PURE__ */ jsx(Icon, {
																		className: "size-3.5 text-primary",
																		"aria-hidden": "true"
																	}), label]
																}),
																/* @__PURE__ */ jsx("dd", {
																	className: "mt-1.5 text-2xl font-semibold tracking-tight",
																	children: value
																}),
																/* @__PURE__ */ jsx("dd", {
																	className: "mt-0.5 text-[0.6875rem] leading-4 text-muted-foreground",
																	children: description
																})
															]
														}, label))
													})
												})]
											})
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-col justify-center",
										children: /* @__PURE__ */ jsxs(Card, {
											className: "rounded-2xl border border-border/60 bg-card/40 p-6 shadow-none backdrop-blur-xl",
											children: [/* @__PURE__ */ jsxs(CardHeader, {
												className: "p-0 pb-6",
												children: [/* @__PURE__ */ jsx(CardTitle, {
													className: "text-xl",
													children: /* @__PURE__ */ jsx("h3", { children: copy.engineering.process.title })
												}), /* @__PURE__ */ jsx(CardDescription, {
													className: "leading-6",
													children: copy.engineering.process.description
												})]
											}), /* @__PURE__ */ jsx(CardContent, {
												className: "p-0",
												children: /* @__PURE__ */ jsx("ol", {
													className: "grid gap-4 sm:grid-cols-2",
													children: engineeringProcess.map(({ icon: Icon, title, description }, index) => /* @__PURE__ */ jsxs("li", {
														className: "flex flex-col gap-2 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-md transition-colors hover:border-primary/30",
														children: [
															/* @__PURE__ */ jsxs("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ jsx("span", {
																	className: "flex size-8 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs",
																	children: /* @__PURE__ */ jsx(Icon, {
																		className: "size-4",
																		"aria-hidden": "true"
																	})
																}), /* @__PURE__ */ jsx(Badge, {
																	variant: "secondary",
																	className: "border border-border/40 bg-secondary/70 text-[0.625rem]",
																	children: String(index + 1).padStart(2, "0")
																})]
															}),
															/* @__PURE__ */ jsx("h4", {
																className: "mt-1 text-sm font-semibold text-foreground",
																children: title
															}),
															/* @__PURE__ */ jsx("p", {
																className: "text-xs leading-5 text-muted-foreground",
																children: description
															})
														]
													}, title))
												})
											})]
										})
									})]
								})
							})
						}),
						/* @__PURE__ */ jsx("section", {
							id: "delivery",
							"aria-labelledby": "delivery-title",
							className: "home-section border-y border-border/50 bg-muted/15 py-20 backdrop-blur-[2px] sm:py-24",
							children: /* @__PURE__ */ jsxs("div", {
								className: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "mx-auto max-w-3xl text-center",
										children: [
											/* @__PURE__ */ jsxs(Badge, {
												variant: "outline",
												className: "mb-4 border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
												children: [/* @__PURE__ */ jsx(GitBranch, {
													"data-icon": "inline-start",
													"aria-hidden": "true"
												}), copy.delivery.badge]
											}),
											/* @__PURE__ */ jsx("h2", {
												id: "delivery-title",
												className: "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
												children: copy.delivery.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8",
												children: copy.delivery.description
											})
										]
									}),
									/* @__PURE__ */ jsx("ol", {
										"aria-label": copy.delivery.flow_label,
										className: "delivery-steps mt-12 grid gap-4 lg:grid-cols-3",
										children: deliveryStages.map(({ icon: Icon, eyebrow, title, description, meta }, index) => /* @__PURE__ */ jsx("li", {
											className: "delivery-stage",
											children: /* @__PURE__ */ jsxs(Card, {
												className: "h-full gap-4 rounded-2xl border border-border/60 bg-card/60 py-5 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-md",
												children: [/* @__PURE__ */ jsxs(CardHeader, {
													className: "gap-4 px-5",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ jsx("span", {
															className: "flex size-10 items-center justify-center rounded-xl bg-secondary/80 text-primary shadow-xs",
															children: /* @__PURE__ */ jsx(Icon, {
																className: "size-5",
																"aria-hidden": "true"
															})
														}), /* @__PURE__ */ jsxs(Badge, {
															variant: "secondary",
															className: "border border-border/40 bg-secondary/70 font-mono text-[0.625rem]",
															children: [
																String(index + 1).padStart(2, "0"),
																" · ",
																eyebrow
															]
														})]
													}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, {
														className: "text-lg leading-6",
														children: /* @__PURE__ */ jsx("h3", { children: title })
													}), /* @__PURE__ */ jsx(CardDescription, {
														className: "mt-2 leading-6",
														children: description
													})] })]
												}), /* @__PURE__ */ jsx(CardContent, {
													className: "mt-auto px-5",
													children: /* @__PURE__ */ jsx(Badge, {
														variant: "outline",
														className: "border-border/60 bg-background/60 font-mono text-[0.6875rem] text-muted-foreground",
														children: meta
													})
												})]
											})
										}, title))
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-8 rounded-3xl border border-border/60 bg-background/50 p-5 shadow-xl shadow-foreground/5 backdrop-blur-xl sm:p-7 lg:p-8",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "mx-auto mb-6 flex max-w-2xl flex-col items-center text-center",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20",
													children: /* @__PURE__ */ jsx(GitBranch, {
														className: "size-5",
														"aria-hidden": "true"
													})
												}),
												/* @__PURE__ */ jsx("h3", {
													className: "mt-4 text-xl font-semibold text-foreground",
													children: copy.delivery.distribution_title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm leading-6 text-muted-foreground",
													children: copy.delivery.distribution_description
												})
											]
										}), /* @__PURE__ */ jsx("div", {
											className: "grid gap-4 md:grid-cols-2",
											children: deliveryStores.map(({ icon: Icon, platform, title, description, artifact }) => /* @__PURE__ */ jsxs(Card, {
												className: "h-full gap-4 rounded-2xl border border-border/60 bg-card/60 py-5 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-card/85 hover:shadow-md",
												children: [/* @__PURE__ */ jsxs(CardHeader, {
													className: "gap-4 px-5",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ jsx("span", {
															className: "flex size-10 items-center justify-center rounded-xl bg-secondary/80 text-primary shadow-xs",
															children: /* @__PURE__ */ jsx(Icon, {
																className: "size-5",
																"aria-hidden": "true"
															})
														}), /* @__PURE__ */ jsx(Badge, {
															variant: "outline",
															className: "border-primary/25 bg-primary/10 text-primary",
															children: platform
														})]
													}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, {
														className: "text-lg leading-6",
														children: /* @__PURE__ */ jsx("h4", { children: title })
													}), /* @__PURE__ */ jsx(CardDescription, {
														className: "mt-2 leading-6",
														children: description
													})] })]
												}), /* @__PURE__ */ jsx(CardContent, {
													className: "mt-auto px-5",
													children: /* @__PURE__ */ jsxs(Badge, {
														variant: "secondary",
														className: "border border-border/40 bg-secondary/70 font-mono text-[0.6875rem]",
														children: [/* @__PURE__ */ jsx(PackageCheck, {
															"data-icon": "inline-start",
															"aria-hidden": "true"
														}), artifact]
													})
												})]
											}, title))
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("section", {
							className: "home-section py-20 sm:py-24",
							children: /* @__PURE__ */ jsx("div", {
								className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 px-6 py-10 text-foreground shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-12 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12 lg:px-14 lg:py-14",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "cta-grid pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-20",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute right-0 top-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 dark:bg-primary/35 blur-3xl",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative max-w-xl",
											children: [
												/* @__PURE__ */ jsxs(Badge, {
													variant: "outline",
													className: "mb-5 border-primary/30 bg-primary/10 text-primary backdrop-blur-xs",
													children: [/* @__PURE__ */ jsx(Rocket, { "aria-hidden": "true" }), copy.cta.badge]
												}),
												/* @__PURE__ */ jsx("h2", {
													className: "text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
													children: copy.cta.title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-4 text-base leading-7 text-muted-foreground sm:text-lg",
													children: copy.cta.description
												}),
												/* @__PURE__ */ jsx("div", {
													className: "mt-8",
													children: /* @__PURE__ */ jsx(Button, {
														size: "lg",
														className: "shadow-lg shadow-primary/20",
														asChild: true,
														children: /* @__PURE__ */ jsxs("a", {
															href: "#skills",
															children: [copy.cta.button, /* @__PURE__ */ jsx(ArrowRight, {
																"data-icon": "inline-end",
																"aria-hidden": "true"
															})]
														})
													})
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-7 border-l border-primary/60 pl-4 text-sm leading-6 text-muted-foreground",
													children: copy.cta.note
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative mt-10 lg:mt-0",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "mb-5 max-w-2xl",
												children: [/* @__PURE__ */ jsx("h3", {
													className: "text-xl font-semibold text-foreground",
													children: copy.cta.modules_title
												}), /* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm leading-6 text-muted-foreground",
													children: copy.cta.modules_description
												})]
											}), /* @__PURE__ */ jsx("div", {
												className: "grid gap-3 sm:grid-cols-2",
												children: ctaModules.map(({ icon: Icon, title, description, technologies }) => /* @__PURE__ */ jsxs(Card, {
													size: "sm",
													className: "rounded-xl border border-border/60 bg-background/50 text-foreground shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-background/80 hover:border-primary/40 hover:shadow-md",
													children: [/* @__PURE__ */ jsxs(CardHeader, { children: [
														/* @__PURE__ */ jsx("span", {
															className: "flex size-9 items-center justify-center rounded-lg bg-secondary/80 text-primary shadow-xs",
															children: /* @__PURE__ */ jsx(Icon, {
																className: "size-4",
																"aria-hidden": "true"
															})
														}),
														/* @__PURE__ */ jsx(CardTitle, {
															className: "mt-2 text-sm font-semibold text-foreground",
															children: /* @__PURE__ */ jsx("h4", { children: title })
														}),
														/* @__PURE__ */ jsx(CardDescription, {
															className: "text-xs leading-5 text-muted-foreground",
															children: description
														})
													] }), /* @__PURE__ */ jsx(CardContent, {
														className: "flex flex-wrap gap-2",
														children: technologies.map((technology) => /* @__PURE__ */ jsx(Badge, {
															variant: "outline",
															className: "border-border/60 bg-background/60 text-muted-foreground backdrop-blur-xs",
															children: technology
														}, technology))
													})]
												}, title))
											})]
										})
									]
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("footer", {
					className: "border-t border-border/50 bg-background/60 backdrop-blur-xl",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx(Brand, { compact: true }), /* @__PURE__ */ jsxs("span", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" ",
								copy.footer.copyright
							] })]
						}), /* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Braces, {
								className: "size-4",
								"aria-hidden": "true"
							}), copy.footer.summary]
						})]
					})
				})
			]
		})
	] });
}
//#endregion
export { Home as default };

//# sourceMappingURL=Home-Dtut6jfz.js.map