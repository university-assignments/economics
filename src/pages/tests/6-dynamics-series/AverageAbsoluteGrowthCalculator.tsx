import { Stack, Typography } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { useMemo } from 'react';
import { DynamicsSeriesRow } from 'src/pages/tests/6-dynamics-series/DynamicsSeriesCalculators';


export interface AverageAbsoluteGrowthCalculatorProps
{
	deltaY: {
		back: DynamicsSeriesRow;
		curr: DynamicsSeriesRow;
		value: number;
	}[];

	yearsWithValues: Array<Record<'year' | 'value', number>>;
}

export function AverageAbsoluteGrowthCalculator (props: AverageAbsoluteGrowthCalculatorProps)
{
	const { deltaY, yearsWithValues } = props;

	const sum = useMemo(
		() => deltaY.map((row) => row.value).sum(3),
		[ deltaY ],
	);

	const last = yearsWithValues.at(-1);

	if (typeof last === 'undefined')
	{
		return <>typeof last = 'undefined'</>;
	}

	return (
		<>
			<Typography>5. Средний абсолютный прирост</Typography>
			<Stack spacing={1}>
				<MathJax>
					{
						'\\('
						+ '\\overline{\\Delta Y_Ц}'
						+ '= \\frac{\\sum \\Delta Y_Ц}{n}'
						+ `= \\frac{${deltaY.map((row) => row.value).join('+')}}{${deltaY.length}}`
						+ `= \\frac{${sum}}{${deltaY.length}}`
						+ `= ${(sum / deltaY.length).toFixedNumber(3)}`
						+ '\\)'
					}
				</MathJax>

				<MathJax>
					{
						'\\('
						+ '\\overline{\\Delta Y_Б}'
						+ '= \\frac{Y_k - Y_0}{m - 1}'
						+ `= \\frac{${last.value} - ${yearsWithValues[0].value}}{${yearsWithValues.length} - 1}`
						+ `= ${((last.value - yearsWithValues[0].value) / (yearsWithValues.length - 1)).toFixedNumber(3)}`
						+ '\\)'
					}
				</MathJax>
			</Stack>
		</>
	);
}
