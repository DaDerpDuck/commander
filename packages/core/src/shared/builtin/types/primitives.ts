import { t } from "@rbxts/t";
import { CommanderType } from ".";
import { TransformResult, TypeBuilder } from "../../util/type";

const transformToNumber = (text: string) => {
	const num = tonumber(text);
	if (num === undefined) {
		return TransformResult.err<number>("Invalid number");
	}

	return TransformResult.ok(num);
};

export const StringType = TypeBuilder.create<string>(CommanderType.String)
	.validate(t.string)
	.transform((text) => TransformResult.ok(text))
	.build();

export const NumberType = TypeBuilder.create<number>(CommanderType.Number)
	.validate(t.number)
	.transform(transformToNumber)
	.build();

export const IntegerType = TypeBuilder.create<number>(CommanderType.Integer)
	.validate(t.integer)
	.transform((text) => {
		const numResult = transformToNumber(text);
		if (!numResult.ok) {
			return numResult;
		}

		const num = numResult.value;
		return t.integer(num)
			? TransformResult.ok(num)
			: TransformResult.err("Invalid integer");
	})
	.build();

const truthyValues = new Set<string>(["true", "yes", "y"]);
const falsyValues = new Set<string>(["false", "no", "n"]);
export const BooleanType = TypeBuilder.create<boolean>(CommanderType.Boolean)
	.validate(t.boolean)
	.transform((text) => {
		const textLower = text.lower();
		if (truthyValues.has(textLower)) return TransformResult.ok(true);
		if (falsyValues.has(textLower)) return TransformResult.ok(false);

		return TransformResult.err("Invalid boolean");
	})
	.build();
