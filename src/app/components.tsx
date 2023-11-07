"use client";

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from "@radix-ui/react-tooltip";

import clsx from "clsx";

import type { Element } from "~/app/types.ts";

import style from "./components.module.css";

const Series = ({ date, elements }: { date: string; elements: Element[] }) => {
	return (
		<Tooltip>
			<TooltipTrigger className={clsx(style["tooltip-trigger-base"], elements.length > 0 ? "bg-cs-9 hover:bg-cs-10 border-cs-10" : "bg-cn-3 hover:bg-cn-4 border-cn-4")} />
			<TooltipPortal>
				<TooltipContent className={style["tooltip-content"]} sideOffset={5}>
					<div className="flex flex-col">
						<div className="flex flex-col gap-2">
							<div className="text-z1 font-w4">{date}</div>
							<div className="flex justify-between gap-2 text-z1">
								<span>Total requests</span>
								<span className="text-cs-9">{elements.length}</span>
							</div>
							<div className="flex justify-between gap-2 text-z1">
								<span>Failed requests</span>
								<span className="text-cd-9">{elements.filter(([, code]) => code !== 200).length}</span>
							</div>
						</div>
					</div>
					<TooltipArrow className="fill-cn-2 stroke-cn-3" />
				</TooltipContent>
			</TooltipPortal>
		</Tooltip>
	);
};

const Item = (props: {
	data: {
		name: string;
		series: {
			date: string;
			elements: Element[];
		}[];
	};
}) => {
	return (
		<TooltipProvider delayDuration={100}>
			<div className="relative flex flex-col gap-2 p-3 border border-solid border-transparent rounded-14 shadow va-n bg-border-gradient">
				<div className="flex items-center justify-between">
					<span className="text-z3 font-w5">{props.data.name}</span>
				</div>
				<div className="flex flex-row gap-1">
					{props.data.series.map(({ date, elements }, index) => (
						<Series key={index} date={date} elements={elements} />
					))}
				</div>
			</div>
		</TooltipProvider>
	);
};

export { Item };
