import { forwardRef } from "react";
import type { ComponentProps, ComponentRef, ElementType, ForwardedRef, JSX, PropsWithChildren } from "react";

type AsProp<C extends ElementType> = { as?: C };

type RefValue<T extends any> = T extends { ref?: any } ? T["ref"] : unknown;

type Props<C extends ElementType, Props = {}> = PropsWithChildren<Props & AsProp<C>> &
	Omit<
		Omit<ComponentProps<C>, "ref"> & { ref?: C extends keyof JSX.IntrinsicElements ? RefValue<JSX.IntrinsicElements[C]> : RefValue<ComponentProps<C>> },
		keyof (AsProp<C> & Props)
	>;

type AsChildProp = {
	asChild?: boolean;
};

type PropsWithoutAsChild<P extends AsChildProp> = Omit<P, keyof AsChildProp>;

const create = forwardRef as <DC extends ElementType, P>(
	component: (props: { as: DC } & P, ref: ForwardedRef<ComponentRef<DC>>) => JSX.Element
) => {
	<C extends ElementType = DC>(props: Props<C, P>): JSX.Element;
	displayName?: string;
};

export type { PropsWithoutAsChild };
export { create };
