"use server";

import { cookies } from "next/headers";

import type { Theme } from "~/styles/types.ts";
import { getTheme } from "~/styles/utils.ts";

const toggleTheme = async (data: Theme) => {
	cookies().set("theme", getTheme(data));
};

export { toggleTheme };
