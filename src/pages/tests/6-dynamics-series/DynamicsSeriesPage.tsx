import { Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { NumericField } from 'src/components/field/NumericField';
import { StyledTableCell } from 'src/components/table/StyledTableCell';
import { StyledTableRow } from 'src/components/table/StyledTableRow';
import { AverageAbsoluteGrowthCalculator } from 'src/pages/tests/6-dynamics-series/AverageAbsoluteGrowthCalculator';
import { AverageGrowthRateCalculator } from 'src/pages/tests/6-dynamics-series/AverageGrowthRateCalculator';
import { DynamicsSeriesCalculators } from 'src/pages/tests/6-dynamics-series/DynamicsSeriesCalculators';
import { replaceArrayValue } from 'src/tools/replaceArrayValue';


export default function DynamicsSeriesPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ years, setYears ] = useState(() => (searchParams.get('years') ?? '').split('|').map(Number));
	const [ values, setValues ] = useState(() => (searchParams.get('y') ?? '').split('|').map(Number));

	const keys = [ years, values ];

	const [ overlineK, setOverlineK ] = useState(0);

	useEffect(
		() => setSearchParams({
			years: years.join('|'),
			y: values.join('|'),
		}),
		[ setSearchParams, ...keys ],
	);

	const yearsWithValues = useMemo(
		() => DynamicsSeriesCalculators.yearsWithValues(years, values),
		keys,
	);

	// ===== ===== ===== ===== =====

	const deltaYЦ = useMemo(
		() => DynamicsSeriesCalculators.deltaYЦ(yearsWithValues),
		[ yearsWithValues ],
	);

	const deltaYБ = useMemo(
		() => DynamicsSeriesCalculators.deltaYБ(yearsWithValues),
		[ yearsWithValues ],
	);

	// ===== ===== ===== ===== =====

	const kЦ = useMemo(
		() => DynamicsSeriesCalculators.kЦ(yearsWithValues),
		[ yearsWithValues ],
	);

	const kБ = useMemo(
		() => DynamicsSeriesCalculators.kБ(yearsWithValues),
		[ yearsWithValues ],
	);

	// ===== ===== ===== ===== =====

	const deltaKЦ = useMemo(
		() => DynamicsSeriesCalculators.deltaK(kЦ.map((row) => ({
			year: row.curr.year,
			value: row.value,
		}))),
		[ kЦ ],
	);

	const deltaKБ = useMemo(
		() => DynamicsSeriesCalculators.deltaK(kБ.map((row) => ({
			year: row.curr.year,
			value: row.value,
		}))),
		[ kБ ],
	);

	// ===== ===== ===== ===== =====

	const aPercent = useMemo(
		function ()
		{
			const response: {
				year: number;
				y: number;
				value: number;
			}[] = [];

			for (const index in Array.from({ length: yearsWithValues.length - 1 }))
			{
				const offset = Number(index);

				const back = yearsWithValues[offset];
				const curr = yearsWithValues[offset + 1];

				response.push({
					year: curr.year,
					y: back.value,
					value: (0.01 * back.value).toFixedNumber(3),
				});
			}

			return response;
		},
		[ yearsWithValues ],
	);

	// ===== ===== ===== ===== =====

	return (
		<Stack margin={2} spacing={2}>
			<Typography variant='h4'>Контрольная работа №6 "Ряды динамики"</Typography>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{
								years.map((year, index) => (
									<StyledTableCell>
										<NumericField onChange={ (ev) => replaceArrayValue(setYears, index, Number(ev.target.value)) } value={year} />
									</StyledTableCell>
								))
							}

							<StyledTableCell>год</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						<StyledTableRow>
							{
								values.map((value, index) => (
									<StyledTableCell>
										<NumericField onChange={ (ev) => replaceArrayValue(setValues, index, Number(ev.target.value)) } value={value} />
									</StyledTableCell>
								))
							}

							<StyledTableCell>y</StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<MathJaxContext key={ keys.join('|') }>
				<Typography>1. Абсолютный прирост</Typography>
				<Stack direction='row' spacing={3}>
					<Stack spacing={1}>
						<MathJax>{ '\\(\\Delta Y_Ц = Y_i - Y_{(i - 1)} \\)' }</MathJax>

						<Stack>
							{
								deltaYЦ.map((row) => (
									<MathJax key={row.curr.year}>
										{ `\\(\\Delta Y_Ц (${row.curr.year}) = ${row.curr.value} - ${row.back.value} = ${row.value} \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>

					<Stack spacing={1}>
						<MathJax>{ '\\(\\Delta Y_Б = Y_i - Y_0 \\)' }</MathJax>

						<Stack>
							{
								deltaYБ.map((row) => (
									<MathJax key={row.curr.year}>
										{ `\\(\\Delta Y_Б (${row.curr.year}) = ${row.curr.value} - ${row.first.value} = ${row.value} \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>
				</Stack>

				<Typography>2. Темпы роста</Typography>
				<Stack direction='row' spacing={3}>
					<Stack spacing={1}>
						<MathJax>{ '\\(K_Ц = \\frac{Y_i}{Y_{(i - 1)}} \\)' }</MathJax>

						<Stack>
							{
								kЦ.map((row) => (
									<MathJax key={row.curr.year}>
										{ `\\(K_Ц (${row.curr.year}) = \\frac{${row.curr.value}}{${row.back.value}} = ${row.value} \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>

					<Stack spacing={1}>
						<MathJax>{ '\\(K_Б = \\frac{Y_i}{Y_0} \\)' }</MathJax>

						<Stack>
							{
								kБ.map((row) => (
									<MathJax key={row.curr.year}>
										{ `\\(K_Б (${row.curr.year}) = \\frac{${row.curr.value}}{${row.first.value}} = ${row.value} \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>
				</Stack>

				<Typography>3. Темпы прироста</Typography>
				<Stack direction='row' spacing={3}>
					<Stack spacing={1}>
						<MathJax>{ '\\(\\Delta K_Ц = K_Ц * 100 - 100 \\)' }</MathJax>

						<Stack>
							{
								deltaKЦ.map((row) => (
									<MathJax key={row.year}>
										{ `\\(\\Delta K_Ц (${row.year}) = ${row.k} * 100 - 100 = ${row.value} \\% \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>

					<Stack spacing={1}>
						<MathJax>{ '\\(\\Delta K_Б = K_Б * 100 - 100 \\)' }</MathJax>

						<Stack>
							{
								deltaKБ.map((row) => (
									<MathJax key={row.year}>
										{ `\\(\\Delta K_Б (${row.year}) = ${row.k} * 100 - 100 = ${row.value} \\% \\)` }
									</MathJax>
								))
							}
						</Stack>
					</Stack>
				</Stack>

				<Typography>4. Абсолютные значения 1% прироста</Typography>
				<Stack spacing={1}>
					<MathJax>{ '\\(A \\% = 0.01 * Y_{(i-1)} \\)' }</MathJax>

					<Stack>
						{
							aPercent.map((row) => (
								<MathJax key={row.year}>
									{ `\\(\\Delta K_Ц (${row.year}) = 0.01 * ${row.y} = ${row.value} \\)` }
								</MathJax>
							))
						}
					</Stack>
				</Stack>

				<AverageAbsoluteGrowthCalculator
					deltaY={deltaYЦ}
					yearsWithValues={yearsWithValues}
				/>

				<AverageGrowthRateCalculator
					k={kЦ}
					yearsWithValues={yearsWithValues}
					setOverlineK={setOverlineK}
				/>

				<Typography>7. Средний темп прироста</Typography>
				<MathJax>
					{
						'\\('
						+ '\\overline{\\Delta K}'
						+ '= \\overline{K} \\% * 100 - 100'
						+ `= ${overlineK} * 100 - 100`
						+ `= ${(overlineK * 100 - 100).toFixedNumber(3)} \\%`
						+ '\\)'
					}
				</MathJax>

				<Typography>8. Средний уровень ряда</Typography>
				<MathJax>
					{
						'\\('
						+ '\\overline{Y}'
						+ '= \\frac{\\sum Y}{m}'
						+ `= \\frac{${values.join('+')}}{${values.length}}`
						+ `= \\frac{${values.sum(3)}}{${values.length}}`
						+ `= ${(values.sum(3) / values.length).toFixedNumber(3)}`
						+ '\\)'
					}
				</MathJax>
			</MathJaxContext>
		</Stack>
	);
}
