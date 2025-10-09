import { Typography } from '@mui/material';
import { getPercentFormat } from 'src/components/percentages/getPercentFormat';
import { PercentageFormatInterface } from 'src/components/percentages/PercentageFormatInterface';


export interface PercentageFormatProps
{
	value?: number;
	fractionDigits?: number;

	format?: PercentageFormatInterface;
}

export function PercentageFormat (props: PercentageFormatProps)
{
	const { value, fractionDigits, format } = props;

	let percentage: PercentageFormatInterface | null = null;

	if (format)
	{
		percentage = format;
	}

	if (value && fractionDigits)
	{
		percentage = getPercentFormat(value, fractionDigits);
	}

	if (!percentage)
	{
		throw new Error('для форматирования процента ожидалось число');
	}

	return (
		<Typography>
			{
				[ percentage.k, percentage['%'], percentage['[+-]'] ].join(' ')
			}
		</Typography>
	);
}
