export async function POST(request: Request) {
	const json = await request.json();

	console.log(json);

	return Response.json(
		{
			ok: true,
		},
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);
}
