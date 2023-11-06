"use client";

import { useEffect, useState } from "react";

import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from "@radix-ui/react-tooltip";

import clsx from "clsx";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button, IconButton } from "~/components/core/index.ts";

import type { Theme } from "~/styles/types.ts";
import { getTheme, setDocumentThemeAttribute } from "~/styles/utils.ts";

import { toggleTheme } from "./actions.ts";

const MONITORS = Array.from({ length: 29 }).map((_, i) => `monitor-${i + 1}`);

const DAYS = Array.from({ length: 30 }).map((_, i) => i + 1);

export default function Index() {
	const [theme, setTheme] = useState<Theme>(() => getTheme(typeof window !== "undefined" && document.getElementById("html")?.getAttribute("data-theme")));

	const handleToggleTheme = () => {
		setTheme((current) => {
			const next = setDocumentThemeAttribute(current === "dark" ? "light" : "dark");
			toggleTheme(next);
			return next;
		});
	};

	useEffect(() => {
		setDocumentThemeAttribute(theme);
	}, []);

	return (
		<TooltipProvider delayDuration={100}>
			<ScrollArea className="w-screen h-screen overflow-hidden bg-cn-1 text-cn-12">
				<ScrollAreaViewport className="container mx-auto max-w-screen-xs h-full">
					<div className="p-4">
						<div className="flex flex-row justify-between p-2 bg-cn-1 border border-solid border-cn-6 rounded-12 shadow">
							<Button>
								<div className="rounded-full bg-cs-9 w-2 h-2 mr-2"></div>
								<div>Operational</div>
							</Button>

							<IconButton onClick={handleToggleTheme}>{theme === "dark" ? <SunIcon /> : <MoonIcon />}</IconButton>
						</div>
					</div>

					<div className="flex flex-col gap-4 p-4">
						{MONITORS.map((monitor, im) => (
							<div className="flex flex-row gap-1.5 p-2.5 bg-cn-1 border border-solid border-cn-6 rounded-16 shadow" key={monitor}>
								{DAYS.map((day, id) => (
									<Tooltip key={day}>
										<TooltipTrigger
											className={clsx(
												"flex-grow w-auto h-10 border border-solid",
												id === 0 ? "rounded-l-8 rounded-r-6" : id === DAYS.length - 1 ? "rounded-l-6 rounded-r-8" : "rounded-6",
												day < 2 + im ? "bg-cn-3 hover:bg-cn-4 border-cn-4" : "bg-cs-9 hover:bg-cs-10 border-cs-10"
											)}
										/>
										<TooltipPortal>
											<TooltipContent className="select-none bg-cn-1 text-cn-11 px-4 py-2 text-z2 leading-none border border-solid border-cn-2 rounded-8 shadow" sideOffset={2}>
												Operational
												<TooltipArrow className="fill-cn-2 stroke-cn-3" />
											</TooltipContent>
										</TooltipPortal>
									</Tooltip>
								))}
							</div>
						))}
					</div>
				</ScrollAreaViewport>
				<ScrollAreaScrollbar
					className="flex select-none touch-none p-0.5 bg-cn-2/50 transition-colors data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
					orientation="vertical"
				>
					<ScrollAreaThumb className="flex-1 bg-cn-5 hover:bg-cn-8 rounded-10 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
				</ScrollAreaScrollbar>
			</ScrollArea>
		</TooltipProvider>
	);
}
