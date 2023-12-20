import { kv } from "@vercel/kv";

import * as v from "valibot";

import type { Element } from "~/app/types.ts";

const CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, PUT",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: Request) {
	let ok = false;
	try {
		const { t, r } = v.parse(
			v.object({
				t: v.number(),
				r: v.record(v.tuple([v.number(), v.number()])),
			}),
			await request.json()
		);
		await Promise.all(Object.entries(r).map(([name, [status, ms]]) => kv.lpush<Element>(name, [t, status, ms])));
		ok = true;
	} catch (error) {
		console.error(error);
	}

	return Response.json({ ok }, { status: ok ? 200 : 500, headers: CORS });
}

export async function PUT() {
	let ok = false;
	try {
		await Promise.all((await kv.keys("*")).map((key) => kv.ltrim(key, 0, 2880)));
		ok = true;
	} catch (error) {
		console.error(error);
	}

	return Response.json({ ok }, { status: ok ? 200 : 500, headers: CORS });
}
