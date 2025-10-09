import { List, ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getPercentFormat } from 'src/components/percentages/getPercentFormat';
import { PercentageFormat } from 'src/components/percentages/PercentageFormat';
import { ReplaceArrayValue } from 'src/tools/ReplaceArrayValue';


export default function IndexesPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ products, setProducts ] = useState(() => searchParams.get('products')?.split('|') || []);
	const [ releases1, setReleases1 ] = useState(() => searchParams.get('releases1')?.split('|') || []);
	const [ releases2, setReleases2 ] = useState(() => searchParams.get('releases2')?.split('|') || []);
	const [ prices1, setPrices1 ] = useState(() => searchParams.get('prices1')?.split('|') || []);
	const [ prices2, setPrices2 ] = useState(() => searchParams.get('prices2')?.split('|') || []);

	const keys = [ products, releases1, releases2, prices1, prices2 ];

	useEffect(
		() => setSearchParams({
			products: products.join('|'),
			releases1: releases1.join('|'),
			releases2: releases2.join('|'),
			prices1: prices1.join('|'),
			prices2: prices2.join('|'),
		}),
		keys,
	);

	const data = useMemo(
		() => products.map((product, index) => ({
			product,
			release1: Number(releases1[index]),
			release2: Number(releases2[index]),
			price1: Number(prices1[index]),
			price2: Number(prices2[index]),
		})),
		keys,
	);

	const rows = useMemo(
		() => data.map(function (item)
		{
			return {
				...item,

				i_q: getPercentFormat(item.release2 / item.release1, 3),
				i_p: getPercentFormat(item.price2 / item.price1, 3),

				q_1_p_0: (item.release2 * item.price1).toFixedNumber(3),
				q_0_p_0: (item.release1 * item.price1).toFixedNumber(3),
				q_1_p_1: (item.release2 * item.price2).toFixedNumber(3),
				q_0_p_1: (item.release1 * item.price2).toFixedNumber(3),
			};
		}),
		[ data ],
	);

	const sum_q1p0 = rows.map((row) => row.q_1_p_0).sum(3);
	const sum_q0p0 = rows.map((row) => row.q_0_p_0).sum(3);
	const sum_q1p1 = rows.map((row) => row.q_1_p_1).sum(3);
	const sum_q0p1 = rows.map((row) => row.q_0_p_1).sum(3);

	return (
		<Stack spacing={2} sx={{ p: 2 }}>
			<h1>Контрольная работа №3 "Индексы"</h1>

			<MathJaxContext>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell rowSpan={3}>Продукция</TableCell>
								<TableCell colSpan={2}>Выпуск</TableCell>
								<TableCell colSpan={2}>Цена</TableCell>
								<TableCell rowSpan={3}><MathJax>{ '\\(i_q\\)' }</MathJax></TableCell>
								<TableCell rowSpan={3}><MathJax>{ '\\(i_p\\)' }</MathJax></TableCell>
								<TableCell colSpan={2}><MathJax>{ '\\(I_q\\)' }</MathJax></TableCell>
								<TableCell colSpan={2}><MathJax>{ '\\(I_p\\)' }</MathJax></TableCell>
							</TableRow>

							<TableRow>
								{ /* Выпуск */ }
								<TableCell>I</TableCell>
								<TableCell>II</TableCell>

								{ /* Цена */ }
								<TableCell>I</TableCell>
								<TableCell>II</TableCell>

								{ /* I_q */ }
								<TableCell rowSpan={2}><MathJax>{ '\\(q_1 p_0\\)' }</MathJax></TableCell>
								<TableCell rowSpan={2}><MathJax>{ '\\(q_0 p_0\\)' }</MathJax></TableCell>

								{ /* I_p */ }
								<TableCell rowSpan={2}><MathJax>{ '\\(p_1 q_1\\)' }</MathJax></TableCell>
								<TableCell rowSpan={2}><MathJax>{ '\\(p_0 q_1\\)' }</MathJax></TableCell>
							</TableRow>

							<TableRow>
								{ /* Выпуск */ }
								<TableCell><MathJax>{ '\\(q_0\\)' }</MathJax></TableCell>
								<TableCell><MathJax>{ '\\(q_1\\)' }</MathJax></TableCell>

								{ /* Цена */ }
								<TableCell><MathJax>{ '\\(p_0\\)' }</MathJax></TableCell>
								<TableCell><MathJax>{ '\\(p_1\\)' }</MathJax></TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{
								rows.map((row, index) => (
									<TableRow key={row.product}>
										<TableCell><TextField sx={{ minWidth: '100px' }} onChange={(ev) => ReplaceArrayValue(setProducts, index, ev.target.value)} value={row.product} /></TableCell>

										{ /* Выпуск */ }
										<TableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={(ev) => ReplaceArrayValue(setReleases1, index, ev.target.value)} value={row.release1} /></TableCell>
										<TableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={(ev) => ReplaceArrayValue(setReleases2, index, ev.target.value)} value={row.release2} /></TableCell>

										{ /* Выпуск */ }
										<TableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={(ev) => ReplaceArrayValue(setPrices1, index, ev.target.value)} value={row.price1} /></TableCell>
										<TableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={(ev) => ReplaceArrayValue(setPrices2, index, ev.target.value)} value={row.price2} /></TableCell>

										{ /* i_q */ }
										<TableCell>
											<List dense>
												<ListItem><ListItemText primary={row.i_q.k} /></ListItem>
												<ListItem><ListItemText primary={row.i_q['%']} /></ListItem>
												<ListItem><ListItemText primary={row.i_q['[+-]']} /></ListItem>
											</List>
										</TableCell>

										{ /* i_p */ }
										<TableCell>
											<List dense>
												<ListItem><ListItemText primary={row.i_p.k} /></ListItem>
												<ListItem><ListItemText primary={row.i_p['%']} /></ListItem>
												<ListItem><ListItemText primary={row.i_p['[+-]']} /></ListItem>
											</List>
										</TableCell>

										<TableCell>{row.q_1_p_0}</TableCell>
										<TableCell>{row.q_0_p_0}</TableCell>
										<TableCell>{row.q_1_p_1}</TableCell>
										<TableCell>{row.q_0_p_1}</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</MathJaxContext>

			<MathJaxContext key={keys.join('|')}>
				<Typography>1. Характеристики изменения выпуска каждого вида продукции вычисляются индивидуальные индексы физического объема продукции:</Typography>
				<Stack direction='row' spacing={2}>
					<div>
						<MathJax>{ '\\(i_q = \\frac{q_1}{q_0}\\)' }</MathJax>
					</div>

					<div>
						{
							rows.map((row) => (
								<Stack direction='row' spacing={1} key={row.product}>
									<MathJax>{ `\\(${row.product}: i_q = \\frac{${row.release2}}{${row.release1}} = \\)` }</MathJax>
									<PercentageFormat format={row.i_q} />
								</Stack>
							))
						}
					</div>
				</Stack>

				<Typography>2. Характеристика изменения выпуска продукции в целом по предприятию вычисляют сводный индекс физического объема продукции:</Typography>
				<Stack direction='row' spacing={1}>
					<MathJax>
						{
							'\\('
							+ 'I_q'
							+ '= \\frac {\\sum (q_1 p_0)}{\\sum (q_0 p_0)}'
							+ '= \\frac {' + rows.map((row) => row.q_1_p_0).join('+') + '}{' + rows.map((row) => row.q_0_p_0).join('+') + '}'
							+ '= \\frac {' + rows.map((row) => row.q_1_p_0).sum() + '}{' + rows.map((row) => row.q_0_p_0).sum() + '}'
							+ '= '
							+ '\\)'
						}
					</MathJax>

					<PercentageFormat value={rows.map((row) => row.q_1_p_0).sum() / rows.map((row) => row.q_0_p_0).sum()} fractionDigits={3} />
				</Stack>

				<Typography>3. Абсолютное изменение стоимости за счет изменения объема выпускаемой продукции:</Typography>
				<MathJax>
					{
						'\\('
						+ '\\Delta^q'
						+ '= \\sum (q_1 p_0) - \\sum (q_0 p_0)'
						+ '= (' + rows.map((row) => row.q_1_p_0).join('+') + ') - (' + rows.map((row) => row.q_0_p_0).join('+') + ')'
						+ '= ' + rows.map((row) => row.q_1_p_0).sum() + ' - ' + rows.map((row) => row.q_0_p_0).sum()
						+ '= ' + (rows.map((row) => row.q_1_p_0).sum() - rows.map((row) => row.q_0_p_0).sum()).toFixedNumber(3)
						+ '\\)'
					}
				</MathJax>

				<Typography>4. Характеристики изменения цен по каждому виду продукции вычисляют индивидуальные индексы цен:</Typography>
				<Stack direction='row' spacing={2}>
					<div>
						<MathJax>{ '\\(i_p = \\frac{p_1}{p_0}\\)' }</MathJax>
					</div>

					<div>
						{
							rows.map((row) => (
								<Stack direction='row' spacing={1} key={row.product}>
									<MathJax>{ `\\(${row.product}: i_p = \\frac{${row.price2}}{${row.price1}} = \\)` }</MathJax>
									<PercentageFormat format={row.i_p} />
								</Stack>
							))
						}
					</div>
				</Stack>

				<Typography>5. Характеристика изменения цен по всему ассортименту продукции вычисляется сводный индекс:</Typography>
				<Stack direction='row' spacing={1}>
					<MathJax>
						{
							'\\(I_p = \\frac {\\sum (p_1 q_1)}{\\sum (p_0 q_1)}'
							+ '= \\frac {' + rows.map((row) => row.q_1_p_1).join('+') + '}{' + rows.map((row) => row.q_0_p_1).join('+') + '}'
							+ '= \\frac {' + sum_q1p1 + '}{' + sum_q0p1 + '}'
							+ '= \\)'
						}
					</MathJax>
					<PercentageFormat value={sum_q1p1 / sum_q0p1} fractionDigits={3} />
				</Stack>

				<Typography>6. Абсолютное изменение стоимости продукции за счет изменения цен:</Typography>
				<MathJax>
					{
						'\\(\\Delta^p = \\sum (p_1 q_1) - \\sum (p_0 q_1)'
						+ '= (' + rows.map((row) => row.q_1_p_1).join('+') + ') - (' + rows.map((row) => row.q_0_p_1).join('+') + ')'
						+ '= ' + sum_q1p1 + ' - ' + sum_q0p1
						+ '= ' + (sum_q1p1 - sum_q0p1).toFixedNumber(3)
						+ '\\)'
					}
				</MathJax>

				<Typography>7. Абсолютное изменение стоимости продукции:</Typography>
				<MathJax>
					{
						'\\(\\Delta^{qp} = \\sum (q_1 p_1) - \\sum (q_0 p_0)'
						+ '= (' + rows.map((row) => row.q_1_p_1).join('+') + ') - (' + rows.map((row) => row.q_0_p_0).join('+') + ')'
						+ '= ' + sum_q1p1 + ' - ' + sum_q0p0
						+ '= ' + (sum_q1p1 - sum_q0p0).toFixedNumber(3)
						+ '\\)'
					}
				</MathJax>

				<Typography>8. Проверка абсолютного изменения стоимости продукции:</Typography>
				<MathJax>
					{
						'\\(\\Delta^{qp} = \\Delta^q + \\Delta^p'
						+ '= ' + (sum_q1p0 - sum_q0p0).toFixedNumber(3) + ' + ' + (sum_q1p1 - sum_q0p1).toFixedNumber(3)
						+ '= ' + (sum_q1p0 - sum_q0p0 + (sum_q1p1 - sum_q0p1)).toFixedNumber(3)
						+ '\\)'
					}
				</MathJax>
			</MathJaxContext>
		</Stack>
	);
}
