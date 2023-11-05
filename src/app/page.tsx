"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";

import clsx from "clsx";

import { GithubIcon } from "lucide-react";

import { Button, IconButton } from "~/components/core/index.ts";

const MONITORS = Array.from({ length: 30 }).map((_, i) => `monitor-${i + 1}`);

const DAYS = Array.from({ length: 90 }).map((_, i) => i + 1);

export default function Index() {
	return (
		<ScrollArea.Root className="w-screen h-screen overflow-hidden bg-cn-1 text-cn-12">
			<ScrollArea.Viewport className="container mx-auto max-w-screen-sm h-full">
				<div className="p-4">
					<div className="flex flex-row justify-between p-2 bg-cn-1 border border-solid border-cn-6 rounded-10 shadow">
						<Button>Operational</Button>

						<IconButton>
							<GithubIcon />
						</IconButton>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-4">
					{MONITORS.map((monitor, i) => (
						<div className="flex flex-row gap-0.5 p-2 bg-cn-1 border border-solid border-cn-6 rounded-10 shadow" key={monitor}>
							{DAYS.map((day) => (
								<div className={clsx("flex-grow w-auto h-10 border border-solid rounded-6", day < 15 + i * 2 ? "bg-cn-3 border-cn-4" : "bg-cs-9 border-cs-10")} key={day} />
							))}
						</div>
					))}
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				className="flex select-none touch-none p-0.5 bg-cn-2/50 transition-colors data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="flex-1 bg-cn-5 hover:bg-cn-8 rounded-10 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Scrollbar
				className="flex select-none touch-none p-0.5 bg-cn-2/50 transition-colors data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3"
				orientation="horizontal"
			>
				<ScrollArea.Thumb className="flex-1 bg-cn-5 hover:bg-cn-8 rounded-10 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner className="bg-black-5" />
		</ScrollArea.Root>
	);
}
