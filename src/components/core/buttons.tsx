import type { ElementType } from "react";

import propsplit from "propsplit";

import * as Classes from "../classes.ts";
import * as Polymorphic from "../polymorphic.ts";

import * as ButtonKlass from "./styles/Button/klass.ts";
import * as IconButtonKlass from "./styles/IconButton/klass.ts";
import * as klass from "./styles/_/klass.ts";

const attribute = (as: ElementType) => {
	return {
		[as === "button" ? "type" : "role"]: "button",
	};
};

type ButtonOptions = Classes.WithProps<ButtonKlass.Variants & klass.Color6Variants>;

const Button = Polymorphic.create<"button", ButtonOptions>(({ as: As = "button", ...props }, ref) => {
	const [classes, root, color, rest] = propsplit(props, Classes.Keys, ButtonKlass.Root.vk, klass.Color6.vk);
	return <As ref={ref} {...attribute(As)} {...rest} className={Classes.x([ButtonKlass.Root(root), klass.Color6(color)], classes)} />;
});

if (process.env.NODE_ENV === "development") Button.displayName = "Button";

type IconButtonOptions = Classes.WithProps<IconButtonKlass.Variants & klass.Color6Variants>;

const IconButton = Polymorphic.create<"button", IconButtonOptions>(({ as: As = "button", ...props }, ref) => {
	const [classes, root, color, rest] = propsplit(props, Classes.Keys, IconButtonKlass.Root.vk, klass.Color6.vk);
	return <As ref={ref} {...attribute(As)} {...rest} className={Classes.x([IconButtonKlass.Root(root), klass.Color6(color)], classes)} />;
});

if (process.env.NODE_ENV === "development") IconButton.displayName = "IconButton";

export type { ButtonOptions, IconButtonOptions };
export { Button, IconButton };
