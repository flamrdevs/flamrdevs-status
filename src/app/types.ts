type Element = [number, number, number];

type Key = string;
type Value = Element[];

type KV = {
	key: Key;
	value: Value;
};

export type { Element, Key, Value, KV };
