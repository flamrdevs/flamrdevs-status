import { HOST } from "~/const/exports.ts";

export const SITE = (...paths: string[]) => [process.env.NODE_ENV === "production" ? HOST.SITE_PROD : HOST.SITE_DEV, ...paths].join("/");

export const STATIC = (...paths: string[]) => [process.env.NODE_ENV === "production" ? HOST.STATIC_PROD : HOST.STATIC_DEV, ...paths].join("/");

export const WEB = (...paths: string[]) => [process.env.NODE_ENV === "production" ? HOST.WEB_PROD : HOST.WEB_DEV, ...paths].join("/");

export const API = (...paths: string[]) => [process.env.NODE_ENV === "production" ? HOST.API_PROD : HOST.API_DEV, ...paths].join("/");

export const IMAGE = (...paths: string[]) => [process.env.NODE_ENV === "production" ? HOST.IMAGE_PROD : HOST.IMAGE_DEV, ...paths].join("/");
