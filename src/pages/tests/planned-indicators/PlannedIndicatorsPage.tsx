import { Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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

	const replaceArrayValue = (callback: Function, array: any[], index: number, value: string) => callback(array.map((v, i) => index === i ? value : v));

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
							<TableCell colSpan={1}>Ед. изм.</TableCell>
							<TableCell colSpan={3}>Расход Абс.</TableCell>
							<TableCell colSpan={1}>К</TableCell>
							<TableCell colSpan={3}>Расход УЕ</TableCell>
							<TableCell colSpan={3}>ОВПЗ = П/Б</TableCell>
							<TableCell colSpan={3}>ОВВП = Ф/П</TableCell>
							<TableCell colSpan={3}>ОВФР = Ф/Б</TableCell>
							<TableCell colSpan={3}>Удельный вес (%)</TableCell>
						</TableRow>

						<TableRow>
							{ /* Вид топлива */ }
							<TableCell></TableCell>

							{ /* Единицы измерения */ }
							<TableCell></TableCell>

							{ /* Расход Абс. */ }
							<TableCell>base</TableCell>
							<TableCell>План</TableCell>
							<TableCell>Факт</TableCell>

							{ /* K */ }
							<TableCell></TableCell>

							{ /* Расход УЕ */ }
							<TableCell>base</TableCell>
							<TableCell>План</TableCell>
							<TableCell>Факт</TableCell>

							{ /* ОВПЗ = П/Б */ }
							<TableCell>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* ОВВП = Ф/П */ }
							<TableCell>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* ОВФР = Ф/Б */ }
							<TableCell>К</TableCell>
							<TableCell>%</TableCell>
							<TableCell>‰</TableCell>

							{ /* Удельный вес (%) */ }
							<TableCell>base</TableCell>
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
											onChange={ (ev) => replaceArrayValue(setFuel, fuel, index, ev.target.value) }
										/>
									</TableCell>

									<TableCell>
										{
											typeof row['Единицы измерения'] === 'string'
												? <TextField
													sx={{ minWidth: '100px' }}
													label='Единицы измерения'
													value={row['Единицы измерения']}
													onChange={ (ev) => replaceArrayValue(setUnits, units, index, ev.target.value) }
												/>
												: '-'
										}
									</TableCell>

									{ /* Расход Абс. */ }
									<TableCell>
										{
											typeof row['Расход Абс.'].base === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='base' value={row['Расход Абс.'].base} onChange={ (ev) => replaceArrayValue(setBase, base, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].plan === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='Q_0' value={row['Расход Абс.'].plan} onChange={ (ev) => replaceArrayValue(setPlan, plan, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].fact === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='Q_0' value={row['Расход Абс.'].fact} onChange={ (ev) => replaceArrayValue(setFact, fact, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* K */ }
									<TableCell>
										{
											typeof row.k === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='Q_0' value={row.k} onChange={ (ev) => replaceArrayValue(setK, k, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* Расход УЕ */ }
									<TableCell>{row['Расход УЕ'].base}</TableCell>
									<TableCell>{row['Расход УЕ'].plan}</TableCell>
									<TableCell>{row['Расход УЕ'].fact}</TableCell>

									{ /* ОВПЗ = П/Б */ }
									<TableCell>{row['ОВПЗ = П/Б'].k}</TableCell>
									<TableCell>{row['ОВПЗ = П/Б']['%']}</TableCell>
									<TableCell>{row['ОВПЗ = П/Б']['‰']}</TableCell>

									{ /* ОВВП = Ф/П */ }
									<TableCell>{row['ОВВП = Ф/П'].k}</TableCell>
									<TableCell>{row['ОВВП = Ф/П']['%']}</TableCell>
									<TableCell>{row['ОВВП = Ф/П']['‰']}</TableCell>

									{ /* ОВФР = Ф/Б */ }
									<TableCell>{row['ОВФР = Ф/Б'].k}</TableCell>
									<TableCell>{row['ОВФР = Ф/Б']['%']}</TableCell>
									<TableCell>{row['ОВФР = Ф/Б']['‰']}</TableCell>

									{ /* Удельный вес (%) */ }
									<TableCell>{row['Удельный вес (%)'].base}</TableCell>
									<TableCell>{row['Удельный вес (%)'].plan}</TableCell>
									<TableCell>{row['Удельный вес (%)'].fact}</TableCell>
								</StyledTableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
}
