import { cache } from "react";

import { kv } from "@vercel/kv";

import dayjs from "dayjs";

import { Element } from "~/app/types.ts";

export const revalidate = 900;

export const getData = cache(async () => {
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
});
