import { PercentageFormatInterface } from 'src/components/percentages/PercentageFormatInterface';


export function getPercentFormat (value: number, fractionDigits: number): PercentageFormatInterface
{
	const parameter_1 = value.toFixedNumber(fractionDigits);
	const parameter_2 = (parameter_1 * 100).toFixedNumber(fractionDigits);
	const parameter_3 = (parameter_2 - 100).toFixedNumber(fractionDigits);
	const prefix_3 = parameter_3 >= 0
		? '+'
		: '';

	return {
		k: parameter_1,
		'%': '(' + parameter_2 + '%)',
		'[+-]': '[' + prefix_3 + parameter_3 + '%]',
	};
}
