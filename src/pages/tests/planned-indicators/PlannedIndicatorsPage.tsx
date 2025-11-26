import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { StyledTableRow } from 'src/components/table/StyledTableRow';
import { calculateFullRowsPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateFullRowsPlannedIndicators';
import { calculateMiniRowsPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateMiniRowsPlannedIndicators';
import { calculateRowsWithSumPlannedIndicators } from 'src/pages/tests/planned-indicators/calculations/calculateRowsWithSumPlannedIndicators';
import { PlannedRowIndicatorData } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorData';
import { replaceArrayValue } from 'src/tools/replaceArrayValue';


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
					base: full.map((row) => row['Удельный вес (%)'].base).sum(3),
					plan: full.map((row) => row['Удельный вес (%)'].plan).sum(3),
					fact: full.map((row) => row['Удельный вес (%)'].fact).sum(3),
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
							<TableCell sx={{ borderLeft: 1 }} colSpan={3}>РВПЗ = П/Б</TableCell>
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

							{ /* РВПЗ = П/Б */ }
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
											onChange={ (ev) => replaceArrayValue(setFuel, index, ev.target.value) }
										/>
									</TableCell>

									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row['Единицы измерения'] === 'string'
												? <TextField
													sx={{ minWidth: '100px' }}
													label='Единицы измерения'
													value={row['Единицы измерения']}
													onChange={ (ev) => replaceArrayValue(setUnits, index, ev.target.value) }
												/>
												: '-'
										}
									</TableCell>

									{ /* Расход Абс. */ }
									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row['Расход Абс.'].base === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='База' value={row['Расход Абс.'].base} onChange={ (ev) => replaceArrayValue(setBase, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].plan === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='План' value={row['Расход Абс.'].plan} onChange={ (ev) => replaceArrayValue(setPlan, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									<TableCell>
										{
											typeof row['Расход Абс.'].fact === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='Факт' value={row['Расход Абс.'].fact} onChange={ (ev) => replaceArrayValue(setFact, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* K */ }
									<TableCell sx={{ borderLeft: 1 }}>
										{
											typeof row.k === 'number'
												? <TextField sx={{ minWidth: '100px' }} type='number' label='К' value={row.k} onChange={ (ev) => replaceArrayValue(setK, index, ev.target.value) } />
												: '-'
										}
									</TableCell>

									{ /* Расход УЕ */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['Расход УЕ'].base}</TableCell>
									<TableCell>{row['Расход УЕ'].plan}</TableCell>
									<TableCell>{row['Расход УЕ'].fact}</TableCell>

									{ /* РВПЗ = П/Б */ }
									<TableCell sx={{ borderLeft: 1 }}>{row['РВПЗ = П/Б'].k}</TableCell>
									<TableCell>{row['РВПЗ = П/Б']['%']}</TableCell>
									<TableCell>{row['РВПЗ = П/Б']['‰']}</TableCell>

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

			<Box
				sx={{
					border: '3px dashed #ccc',
					borderRadius: '10px',
					p: 2,
				}}
			>
				<a href='/economics/storage/tests/planned-indicators/economics-2.xlsx'>В формате EXCEL</a>
			</Box>
		</Stack>
	);
}
