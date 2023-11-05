import clsx from "clsx";
import type { ClassValue } from "clsx";

type Props = {
	className?: ClassValue;
};

type WithProps<P> = Omit<P, keyof Props> & Props;

const Keys = ["className"] as const satisfies Readonly<(keyof Props)[]>;

const x = <T extends Props>(classValue: ClassValue, classes: T) => clsx(classValue, classes[Keys[0]]);

export type { WithProps };
export { Keys };
export { x };
