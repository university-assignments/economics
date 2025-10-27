import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { StyledTableCell } from 'src/components/table/StyledTableCell';
import { StyledTableRow } from 'src/components/table/StyledTableRow';


const ln = (val: number) => Math.log(val);

const calc_ip1 = (p1: number) => ((p1 - 25) / (85 - 25)).toFixedNumber(3);
const calc_ip2 = (p2: number) => (p2 / 100).toFixedNumber(3);
const calc_ip3 = (p3: number) => (p3 / 100).toFixedNumber(3);
const calc_ip4 = (p4: number) => ((ln(p4) - ln(100)) / (ln(40000) - ln(100))).toFixedNumber(3);

const calc_educ_index = (ip2: number, ip3: number) => ((2 * ip2 + ip3) / 3).toFixedNumber(3);
const calc_irip = (ip1: number, i_educ: number, ip4: number) => ((ip1 + i_educ + ip4) / 3).toFixedNumber(3);

const calc_h3 = (h31: number, h32: number, h33: number) => ((h31 + h32 + h33) / 3).toFixedNumber(3);
const calc_inn1 = (h1: number, h2: number, h3: number) => Math.pow((Math.pow(h1, 3) + Math.pow(h2, 3) + Math.pow(h3, 3)) / 3, 1 / 3).toFixedNumber(3);
const calc_inn2 = (n1: number, n2: number, n3: number, n4: number) => Math.pow((Math.pow(n1, 3) + Math.pow(n2, 3) + Math.pow(n3, 3) + Math.pow(n4, 3)) / 4, 1 / 3).toFixedNumber(3);

export default function StandardLivingPopulationPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ p1, setP1 ] = useState(() => Number(searchParams.get('P1') || 0));
	const [ p2, setP2 ] = useState(() => Number(searchParams.get('P2') || 0));
	const [ p3, setP3 ] = useState(() => Number(searchParams.get('P3') || 0));
	const [ p4, setP4 ] = useState(() => Number(searchParams.get('P4') || 0));

	const [ h1, setH1 ] = useState(() => Number(searchParams.get('H1') || 0));
	const [ h2, setH2 ] = useState(() => Number(searchParams.get('H2') || 0));
	const [ h31, setH31 ] = useState(() => Number(searchParams.get('H31') || 0));
	const [ h32, setH32 ] = useState(() => Number(searchParams.get('H32') || 0));
	const [ h33, setH33 ] = useState(() => Number(searchParams.get('H33') || 0));

	const [ n1, setN1 ] = useState(() => Number(searchParams.get('N1') || 0));
	const [ n2, setN2 ] = useState(() => Number(searchParams.get('N2') || 0));
	const [ n3, setN3 ] = useState(() => Number(searchParams.get('N3') || 0));
	const [ n4, setN4 ] = useState(() => Number(searchParams.get('N4') || 0));

	const keys = [ p1, p2, p3, p4, h1, h2, h31, h32, h33, n1, n2, n3, n4 ];

	useEffect(
		() => setSearchParams({
			P1: String(p1),
			P2: String(p2),
			P3: String(p3),
			P4: String(p4),

			H1: String(h1),
			H2: String(h2),
			H31: String(h31),
			H32: String(h32),
			H33: String(h33),

			N1: String(n1),
			N2: String(n2),
			N3: String(n3),
			N4: String(n4),
		}),
		keys,
	);

	const ip1 = calc_ip1(p1);
	const ip2 = calc_ip2(p2);
	const ip3 = calc_ip3(p3);
	const ip4 = calc_ip4(p4);
	const iobr = calc_educ_index(ip2, ip3);
	const irip = calc_irip(ip1, iobr, ip4);

	const h3 = calc_h3(h31, h32, h33);
	const inn1 = calc_inn1(h1, h2, h3);

	const inn2 = calc_inn2(n1, n2, n3, n4);

	return (
		<MathJaxContext>
			<Stack spacing={2} p={2}>
				<Typography variant='h4'>Контрольная работа №4 "Уровень жизни населения"</Typography>

				<Stack spacing={2}>
					<Stack direction='row' spacing={2}>
						<TextField label='P₁ (лет)' type='number' value={p1} onChange={(e) => setP1(Number(e.target.value))} />
						<TextField label='P₂ (%)' type='number' value={p2} onChange={(e) => setP2(Number(e.target.value))} />
						<TextField label='P₃ (%)' type='number' value={p3} onChange={(e) => setP3(Number(e.target.value))} />
						<TextField label='P₄ ($)' type='number' value={p4} onChange={(e) => setP4(Number(e.target.value))} />
					</Stack>

					<Stack direction='row' spacing={2}>
						<TextField label='H₁' type='number' value={h1} onChange={(e) => setH1(Number(e.target.value))} />
						<TextField label='H₂' type='number' value={h2} onChange={(e) => setH2(Number(e.target.value))} />
						<TextField label='H₃₁' type='number' value={h31} onChange={(e) => setH31(Number(e.target.value))} />
						<TextField label='H₃₂' type='number' value={h32} onChange={(e) => setH32(Number(e.target.value))} />
						<TextField label='H₃₃' type='number' value={h33} onChange={(e) => setH33(Number(e.target.value))} />
					</Stack>

					<Stack direction='row' spacing={2}>
						<TextField label='N₁' type='number' value={n1} onChange={(e) => setN1(Number(e.target.value))} />
						<TextField label='N₂' type='number' value={n2} onChange={(e) => setN2(Number(e.target.value))} />
						<TextField label='N₃' type='number' value={n3} onChange={(e) => setN3(Number(e.target.value))} />
						<TextField label='N₄' type='number' value={n4} onChange={(e) => setN4(Number(e.target.value))} />
					</Stack>
				</Stack>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>Ед. Изм.</TableCell>
								<TableCell>P min</TableCell>
								<TableCell>P max</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							<StyledTableRow>
								<StyledTableCell>P1</StyledTableCell>
								<StyledTableCell>лет</StyledTableCell>
								<StyledTableCell>25</StyledTableCell>
								<StyledTableCell>85</StyledTableCell>
							</StyledTableRow>

							<StyledTableRow>
								<StyledTableCell>P2</StyledTableCell>
								<StyledTableCell>%</StyledTableCell>
								<StyledTableCell>0</StyledTableCell>
								<StyledTableCell>100</StyledTableCell>
							</StyledTableRow>

							<StyledTableRow>
								<StyledTableCell>P3</StyledTableCell>
								<StyledTableCell>%</StyledTableCell>
								<StyledTableCell>0</StyledTableCell>
								<StyledTableCell>100</StyledTableCell>
							</StyledTableRow>

							<StyledTableRow>
								<StyledTableCell>P4</StyledTableCell>
								<StyledTableCell>$</StyledTableCell>
								<StyledTableCell>100</StyledTableCell>
								<StyledTableCell>40000</StyledTableCell>
							</StyledTableRow>
						</TableBody>
					</Table>
				</TableContainer>

				<Stack direction='row' spacing={2}>
					<Typography variant='h6'>1)</Typography>

					<Stack spacing={1} mt={2}>
						<MathJax>{ `\\(i(P_1) = \\frac{P1(Ф) - P1(min)}{P1(max) - P1(min)} = \\frac{${p1}-25}{85-25} = \\frac{${p1 - 25}}{60} = ${ip1}\\)` }</MathJax>
						<MathJax>{ `\\(i(P_2) = \\frac{P2(Ф) - P2(min)}{P2(max) - P2(min)} = \\frac{${p2}-0}{100-0} = ${ip2}\\)` }</MathJax>
						<MathJax>{ `\\(i(P_3) = \\frac{P3(Ф) - P3(min)}{P3(max) - P3(min)} = \\frac{${p3}-0}{100-0} = ${ip3}\\)` }</MathJax>
						<MathJax>{ `\\(i(обр) = \\frac{2 * i(P2) + i(P3)}{3} = \\frac{2 * ${ip2} + ${ip3}}{3} = ${iobr}\\)`}</MathJax>
						<MathJax>{ `\\(i(P_4) = \\frac{P4(Ф) - P4(min)}{P4(max) - P4(min)} = \\frac{\\ln ${p4} - \\ln 100}{\\ln 40000 - \\ln 100} = ${ip4}\\)` }</MathJax>
						<MathJax>{ `\\(ИРИП = \\frac{i(P1) + i(обр) + i(p4)}{3} = \\frac{${ip1} + ${iobr} + ${ip4}}{3} = \\boxed{${irip}}\\)` }</MathJax>
					</Stack>
				</Stack>

				<Stack direction='row' spacing={2}>
					<Typography variant='h6'>2)</Typography>

					<Stack spacing={1} mt={2}>
						<MathJax>{ `\\(H_3 = \\frac{H_{31} + H_{32} + H_{33}}{3} = \\frac{${h31} + ${h32} + ${h33}}{3} = ${h3}\\)` }</MathJax>
						<MathJax>{ `\\(ИНН(1) = (\\frac{M_1^3 + M_2^3 + M_3^3}{3})^{\\frac{1}{3}} = \\sqrt[3]{\\frac{${h1}^3 + ${h2}^3 + ${h3}^3}{3}} = \\boxed{${inn1}\\%}\\)` }</MathJax>
					</Stack>
				</Stack>

				<Stack direction='row' spacing={2}>
					<Typography variant='h6'>3)</Typography>

					<MathJax>{ `\\(ИНН(2) = (\\frac{N_1^3 + N_2^3 + N_3^3 + N_4^3}{4})^{\\frac{1}{3}} = \\sqrt[3]{\\frac{${n1}^3 + ${n2}^3 + ${n3}^3 + ${n4}^3}{4}} = \\boxed{${inn2}\\%}\\)` }</MathJax>
				</Stack>
			</Stack>
		</MathJaxContext>
	);
}
