import type { CSSProperties } from "react";

import type { Metadata } from "next";

import { HOST } from "~/utils/exports.ts";

import "~/styles/normalize.css";
import "~/styles/fonts.css";
import "~/styles/globals.css";

export const metadata: Metadata = {
	title: "flamrdevs",
	description: "flamrdevs",
	icons: [
		{
			rel: "icon",
			url: HOST.STATIC("favicon-dark.ico"),
			type: "image/x-icon",
			media: "(prefers-color-scheme: dark)",
		},
		{
			rel: "icon",
			url: HOST.STATIC("favicon-light.ico"),
			type: "image/x-icon",
			media: "(prefers-color-scheme: light)",
		},
	],
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			data-theme="light"
			style={{
				...({
					"--filter-noise-svg": `url(${HOST.STATIC("svgs", "filter-noise.svg")})`,
				} as CSSProperties),
			}}
		>
			<body>{children}</body>
		</html>
	);
}
