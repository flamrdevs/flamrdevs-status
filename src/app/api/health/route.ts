import { kv } from "@vercel/kv";

import * as v from "valibot";

import type { Element } from "~/app/types.ts";

const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
	let ok = false;
	try {
		const { time, items } = v.parse(
			v.object({
				time: v.number(),
				items: v.array(v.tuple([v.string(), v.number(), v.number()])),
			}),
			await request.json()
		);
		await Promise.all(items.map(([name, status, ms]) => kv.lpush<Element>(name, [time, status, ms])));
		ok = true;
	} catch (error) {
		console.error(error);
	}

	return Response.json({ ok }, { status: ok ? 200 : 500, headers: CORS });
}
