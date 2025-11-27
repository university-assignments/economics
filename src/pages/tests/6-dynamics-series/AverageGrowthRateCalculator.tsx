import { Stack, Typography } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { useEffect, useMemo } from 'react';
import { DynamicsSeriesRow } from 'src/pages/tests/6-dynamics-series/DynamicsSeriesCalculators';


export interface AverageGrowthRateCalculatorProps
{
	k: {
		back: DynamicsSeriesRow;
		curr: DynamicsSeriesRow;
		value: number;
	}[];

	yearsWithValues: Array<Record<'year' | 'value', number>>;
	setOverlineK: (prevState: number) => void;
}

export function AverageGrowthRateCalculator (props: AverageGrowthRateCalculatorProps)
{
	const { k, yearsWithValues, setOverlineK } = props;

	const sum = useMemo(
		() => k.reduce((accumulator, current) => accumulator * current.value, 1).toFixedNumber(3),
		[ k ],
	);

	const last = yearsWithValues.at(-1);

	const res1 = (sum ** (1 / k.length)).toFixedNumber(3);
	useEffect(() => setOverlineK(res1), [ setOverlineK, res1 ]);

	if (typeof last === 'undefined')
	{
		return <>typeof last = 'undefined'</>;
	}
	const res2 = ((last.value / yearsWithValues[0].value) ** (1 / (yearsWithValues.length - 1))).toFixedNumber(3);

	return (
		<>
			<Typography>6. Средний темп роста</Typography>
			<Stack spacing={1}>
				<MathJax>
					{
						'\\('
						+ '\\overline{K_Ц}'
						+ '= \\sqrt[n]{П(K)}'
						+ `= \\sqrt[${k.length}]{${k.map((row) => row.value).join('*')}}`
						+ `= \\sqrt[${k.length}]{${sum}}`
						+ `= ${res1}`
						+ '\\)'
					}
				</MathJax>

				<MathJax>
					{
						'\\('
						+ '\\overline{K_Б}'
						+ '= \\sqrt[m - 1]{\\frac{Y_K}{Y_0}}'
						+ `= \\sqrt[${yearsWithValues.length} - 1]{\\frac{${last.value}}{${yearsWithValues[0].value}}}`
						+ `= \\sqrt[${yearsWithValues.length - 1}]{${(last.value / yearsWithValues[0].value).toFixedNumber(3)}}`
						+ `= ${res2}`
						+ '\\)'
					}
				</MathJax>
			</Stack>

			{
				res1 !== res2
					? <Typography color='error'>ВНИМАНИЕ! Ответы не совпадают. Ошибка расчета</Typography>
					: null
			}
		</>
	);
}
