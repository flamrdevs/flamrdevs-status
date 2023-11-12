import { kv } from "@vercel/kv";

import dayjs from "dayjs";

import { Button } from "~/components/core/index.ts";

import { Item } from "~/app/components.tsx";
import type { Element } from "~/app/types.ts";

const getData = async () => {
	const length = 45;

	const startDayjs = dayjs().subtract(length, "day").startOf("day");
	const startTime = startDayjs.toDate().getTime();

	const FORMAT = "DD-MM-YYYY";

	const days = Array.from({ length }).map((_, i) =>
		startDayjs
			.clone()
			.add(i + 1, "day")
			.format(FORMAT)
	);

	const keys = await kv.keys("*");

	const data: {
		name: string;
		series: {
			date: string;
			elements: Element[];
		}[];
	}[] = [];

	for await (const key of keys) {
		const elements = await kv.lrange<Element>(key, 0, -1);

		const preseries = days.reduce((object, key) => {
			object[key] = [];
			return object;
		}, {} as { [key: string]: Element[] });

		for (const element of elements) {
			const [time] = element;
			if (time >= startTime) {
				const key = dayjs(time).format(FORMAT);
				if (key in preseries) preseries[key].push(element);
			}
		}

		data.push({
			name: key,
			series: Object.entries(preseries).map(([key, value]) => ({
				date: key,
				elements: value,
			})),
		});
	}

	return data;
};

export const revalidate = 900;

export default async function Index() {
	const data = await getData();

	return (
		<main className="w-screen h-screen overflow-hidden bg-cn-1 text-cn-12">
			<div className="container mx-auto max-w-screen-sm h-full">
				<div className="block p-4">
					<div className="relative flex flex-row justify-start p-2 bg-cn-1 border border-solid border-transparent rounded-14 shadow va-n bg-border-gradient">
						<Button className="z-10">
							<div className="rounded-full bg-cs-9 w-2 h-2 mr-2.5"></div>
							<div>Operational</div>
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-4">
					{data.map((item) => (
						<Item key={item.name} data={item} />
					))}
				</div>
			</div>
		</main>
	);
}
