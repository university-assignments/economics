import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { calculateFullRowsPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateFullRowsPlannedIndicators';
import { calculateMiniRowsPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateMiniRowsPlannedIndicators';
import { calculateRowsWithSumPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateRowsWithSumPlannedIndicators';
import { PlannedRowIndicatorData } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorData';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}));

function ReplaceArrayValue<TArrayValue> (callback: Dispatch<SetStateAction<TArrayValue[]>>, index: number, value: TArrayValue)
{
	callback(function (prevState)
	{
		return prevState.map(function (currentValue, currentIndex)
		{
			return index === currentIndex
				? value
				: currentValue;
		});
	});
}

export default function PlannedIndicatorsPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ fuel, setFuel ] = useState(() => searchParams.get('fuel')?.split('|') || []);
	const [ units, setUnits ] = useState(() => searchParams.get('units')?.split('|') || []);
	const [ base, setBase ] = useState(() => searchParams.get('base')?.split('|') || []);
	const [ plan, setPlan ] = useState(() => searchParams.get('plan')?.split('|') || []);
	const [ fact, setFact ] = useState(() => searchParams.get('fact')?.split('|') || []);
	const [ k, setK ] = useState(() => searchParams.get('k')?.split('|') || []);

	const keys = [ fuel, units, base, plan, fact, k ];

	useEffect(
		() => setSearchParams({
			fuel: fuel.join('|'),
			units: units.join('|'),
			base: base.join('|'),
			plan: plan.join('|'),
			fact: fact.join('|'),
			k: k.join('|'),
		}),
		keys,
	);

	const rows = useMemo(
		function ()
		{
			const data: PlannedRowIndicatorData[] = [];

			for (const index in fuel)
			{
				data.push({
					'Вид топлива': fuel[index],
					'Единицы измерения': units[index],

					'Расход Абс.': {
						base: Number(base[index]),
						plan: Number(plan[index]),
						fact: Number(fact[index]),
					},

					k: Number(k[index]),
				});
			}

			const mini = calculateMiniRowsPlannedIndicators(data);
			const miniSum = calculateRowsWithSumPlannedIndicators(mini);
			const full = calculateFullRowsPlannedIndicators(miniSum);

			const fullSum = {
				...miniSum.sum,

				'Удельный вес (%)': {
					base: full.reduce((accumulator, row) => accumulator + row['Удельный вес (%)'].base, 0).toFixed(3),
					plan: full.reduce((accumulator, row) => accumulator + row['Удельный вес (%)'].plan, 0).toFixed(3),
					fact: full.reduce((accumulator, row) => accumulator + row['Удельный вес (%)'].fact, 0).toFixed(3),
				},
			};

			return [ ...full, fullSum ];
		},
		keys,
	);

	return (
		<Stack spacing={2} sx={{ p: 2 }}>
			<h1>Контрольная работа №2 "Плановые показатели"</h1>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell colSpan={1}>Вид топлива</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={1}>Ед. изм.</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>Расход Абс.</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={1}>К</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>Расход УЕ</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>ОВПЗ = П/Б</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>ОВВП = Ф/П</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>ОВФР = Ф/Б</TableCell>
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>Удельный вес (%)</TableCell>
						</TableRow>

						<TableRow>
							{ /* Вид топлива */ }
							<TableCell></TableCell>

							{ /* Единицы измерения */ }
							<TableCell sx={{ borderLeft: 1 }}></TableCell>

							{ /* Расход Абс. */ }
							<TableCell sx={{ borderLeft: 1 }}>База</TableCell>
							<TableCell>План</TableCell>
							<TableCell>Факт</TableCell>

							{ /* K */ }
							<TableCell sx={{ borderLeft: 1 }}></TableCell>

							{ /* Расход УЕ */ }
							<TableCell sx={{ borderLeft: 1 }}>База</TableCell>
							<TableCell>План</TableCell>
							<TableCell>Факт</TableCell>

							{ /* ОВПЗ = П/Б */ }
							<TableCell sx={{ borderLeft: 1 }}>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* ОВВП = Ф/П */ }
							<TableCell sx={{ borderLeft: 1 }}>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* ОВФР = Ф/Б */ }
							<TableCell sx={{ borderLeft: 1 }}>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* Удельный вес (%) */ }
							<TableCell sx={{ borderLeft: 1 }}>База</TableCell>
							<TableCell>План</TableCell>
							<TableCell>Факт</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							rows.map((row, index) => (
								<StyledTableRow key={row['Вид топлива']}>
									<TableCell>
										<TextField
											sx={{ minWidth: '100px' }}
											label='Вид топлива'
											value={row['Вид топлива']}
											onChange={ (ev) => ReplaceArrayValue(setFuel, index, ev.target.value) }
										/>
									</TableCell>

									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row['Единицы измерения'] === 'string'
												? <TextField
													sx={{ minWidth: '100px' }}
													label='Единицы измерения'
													value={row['Единицы измерения']}
													onChange={ (ev) => ReplaceArrayValue(setUnits, index, ev.target.value) }
												/>
												: '-'
										}
									</TableCell>

									{ /* Расход Абс. */ }
									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row['Расход Абс.'].base === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='База' value={row['Расход Абс.'].base} onChange={ (ev) => ReplaceArrayValue(setBase, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].plan === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='План' value={row['Расход Абс.'].plan} onChange={ (ev) => ReplaceArrayValue(setPlan, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].fact === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='Факт' value={row['Расход Абс.'].fact} onChange={ (ev) => ReplaceArrayValue(setFact, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* K */ }
									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row.k === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='К' value={row.k} onChange={ (ev) => ReplaceArrayValue(setK, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* Расход УЕ */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['Расход УЕ'].base}</TableCell>
									<TableCell>{row['Расход УЕ'].plan}</TableCell>
									<TableCell>{row['Расход УЕ'].fact}</TableCell>

									{ /* ОВПЗ = П/Б */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['ОВПЗ = П/Б'].k}</TableCell>
									<TableCell>{row['ОВПЗ = П/Б']['%']}</TableCell>
									<TableCell>{row['ОВПЗ = П/Б']['‰']}</TableCell>

									{ /* ОВВП = Ф/П */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['ОВВП = Ф/П'].k}</TableCell>
									<TableCell>{row['ОВВП = Ф/П']['%']}</TableCell>
									<TableCell>{row['ОВВП = Ф/П']['‰']}</TableCell>

									{ /* ОВФР = Ф/Б */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['ОВФР = Ф/Б'].k}</TableCell>
									<TableCell>{row['ОВФР = Ф/Б']['%']}</TableCell>
									<TableCell>{row['ОВФР = Ф/Б']['‰']}</TableCell>

									{ /* Удельный вес (%) */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['Удельный вес (%)'].base}</TableCell>
									<TableCell>{row['Удельный вес (%)'].plan}</TableCell>
									<TableCell>{row['Удельный вес (%)'].fact}</TableCell>
								</StyledTableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>

			<Accordion defaultExpanded sx={{ bgcolor: teal[50] }}>
				<AccordionSummary>
					<Typography>Используемые формулы (переписывать НЕ нужно)</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<Typography sx={{ fontFamily: 'Consolas, sans-serif' }}>Расход УЕ = Расход Абс. / К</Typography>

					<hr />

					<ul>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>ОВПЗ = (Расход Абс.) План / (Расход Абс.) База</li>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>ОВВП = (Расход Абс.) Факт / (Расход Абс.) План</li>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>ОВФР = (Расход Абс.) Факт / (Расход Абс.) База</li>
					</ul>

					<ul>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>К = исходное значение</li>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>% (процент) = К * 100</li>
						<li style={{ fontFamily: 'Consolas, sans-serif' }}>‰ (промилле) = К * 1000</li>
					</ul>

					<hr />

					<Typography sx={{ fontFamily: 'Consolas, sans-serif' }}>Удельный вес (%) = Расход Абс. / (Расход Абс.) Σ</Typography>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
}
