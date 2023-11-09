import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		include: ["src/**/*.test.[jt]s?(x)"],
		setupFiles: "./vitest.setup.ts",
	},
});
