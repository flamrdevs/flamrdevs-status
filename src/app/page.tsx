import { kv } from "@vercel/kv";

import dayjs from "dayjs";

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

	const record: Record<
		string,
		{
			date: string;
			elements: Element[];
		}[]
	> = {};

	const action = async (key: string) => {
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

		record[key] = Object.entries(preseries).map(([key, value]) => ({
			date: key,
			elements: value,
		}));
	};

	await Promise.all((await kv.keys("*")).map((key) => action(key)));

	return Object.entries(record);
};

export const revalidate = 900;

export default async function Index() {
	const data = await getData();

	return (
		<main className="w-screen h-screen overflow-hidden bg-cn-1 text-cn-12">
			<div className="container mx-auto max-w-screen-sm h-full">
				<div className="block p-4">
					<div className="block px-4 border border-solid border-transparent rounded-14 shadow va-n bg-border-gradient">
						<h3>Status</h3>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-4">
					{data.map(([name, series]) => (
						<Item key={name} name={name} series={series} />
					))}
				</div>
			</div>
		</main>
	);
}
