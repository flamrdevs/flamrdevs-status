import { Button } from "~/components/core/index.ts";

import { Item } from "~/app/components.tsx";

import { getData } from "./get-data.ts";

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
