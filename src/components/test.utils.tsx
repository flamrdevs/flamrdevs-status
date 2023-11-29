import type { JSX, JSXElementConstructor } from "react";

import { render } from "@testing-library/react";
import { expect } from "vitest";

type RenderBaseOptions = {
	container?: HTMLElement;
	wrapper?: JSXElementConstructor<{
		children: JSX.Element;
	}>;
};

export const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
export const Span = (props: JSX.IntrinsicElements["span"]) => <span {...props} />;
export const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;

const renderRootElement = (Callback: (props: { ["data-testid"]?: string }) => JSX.Element, options?: RenderBaseOptions) => {
	const testId = "root";
	const result = render(<Callback data-testid={testId} />, options);
	const element = result.getByTestId(testId);
	return [element, result] as const;
};

const expectElement = (element: HTMLElement) => {
	return {
		tagName(expected: string) {
			expect(element.tagName).toEqual(expected);
			return this;
		},
	};
};

export { renderRootElement, expectElement };
