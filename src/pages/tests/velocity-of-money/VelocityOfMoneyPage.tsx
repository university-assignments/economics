import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';


const D = 360;

const calculateV = (Q: number, M: number) => (Q / M).toFixedNumber(3);
const calculateB = (Q: number, N: number) => (Q / N).toFixedNumber(3);
const calculateT = (D: number, V: number) => (D / V).toFixedNumber(3);
const calculateP = (D: number, B: number) => (D / B).toFixedNumber(3);
const calculateZ = (N: number, M: number) => (N / M).toFixedNumber(3);

export default function VelocityOfMoneyPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ Q_0, setQ_0 ] = useState(Number(searchParams.get('Q_0')));
	const [ Q_1, setQ_1 ] = useState(Number(searchParams.get('Q_1')));
	const [ M_0, setM_0 ] = useState(Number(searchParams.get('M_0')));
	const [ M_1, setM_1 ] = useState(Number(searchParams.get('M_1')));
	const [ N_0, setN_0 ] = useState(Number(searchParams.get('N_0')));
	const [ N_1, setN_1 ] = useState(Number(searchParams.get('N_1')));

	const keys = [ D, Q_0, Q_1, M_0, M_1, N_0, N_1 ];

	useEffect(
		() => setSearchParams({
			Q_0: String(Q_0),
			Q_1: String(Q_1),
			M_0: String(M_0),
			M_1: String(M_1),
			N_0: String(N_0),
			N_1: String(N_1),
		}),
		[ setSearchParams, ...keys ],
	);

	const V_0 = calculateV(Q_0, M_0);
	const V_1 = calculateV(Q_1, M_1);

	const B_0 = calculateB(Q_0, N_0);
	const B_1 = calculateB(Q_1, N_1);

	const T_0 = calculateT(D, V_0);
	const T_1 = calculateT(D, V_1);

	const P_0 = calculateP(D, B_0);
	const P_1 = calculateP(D, B_1);

	const Z_0 = calculateZ(N_0, M_0);
	const Z_1 = calculateZ(N_1, M_1);

	const X = (B_1 * Z_1 - B_0 * Z_1).toFixedNumber(3);
	const Y = (B_0 * Z_1 - B_0 * Z_0).toFixedNumber(3);

	return (
		<Stack spacing={2} sx={{ p: 2 }}>
			<h1>Контрольная работа №1 "Скорость обращения денег"</h1>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Базисный период (0)</TableCell>
							<TableCell>Отчет (1)</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						<TableRow>
							<TableCell>Q</TableCell>
							<TableCell><TextField type='number' label='Q_0' value={Q_0} onChange={ (ev) => setQ_0(Number(ev.target.value)) } /></TableCell>
							<TableCell><TextField type='number' label='Q_1' value={Q_1} onChange={ (ev) => setQ_1(Number(ev.target.value)) } /></TableCell>
						</TableRow>

						<TableRow>
							<TableCell>M</TableCell>
							<TableCell><TextField type='number' label='M_0' value={M_0} onChange={ (ev) => setM_0(Number(ev.target.value)) } /></TableCell>
							<TableCell><TextField type='number' label='M_1' value={M_1} onChange={ (ev) => setM_1(Number(ev.target.value)) } /></TableCell>
						</TableRow>

						<TableRow>
							<TableCell>N</TableCell>
							<TableCell><TextField type='number' label='N_0' value={N_0} onChange={ (ev) => setN_0(Number(ev.target.value)) } /></TableCell>
							<TableCell><TextField type='number' label='N_1' value={N_1} onChange={ (ev) => setN_1(Number(ev.target.value)) } /></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<MathJaxContext key={ keys.join('|') }>
				<ul>
					<li>Q - объем продукции</li>
					<li>M - денежная масса</li>
					<li>N - наличные деньги</li>
				</ul>

				<h1>Определить за базисные и отчетные периоды:</h1>

				<h2>1. Скорость обращения денежной массы:</h2>
				<MathJax>{ `\\(V_0 = \\frac{Q_0}{M_0} = \\frac{${Q_0}}{${M_0}} = ${V_0} \\)` }</MathJax>
				<MathJax>{ `\\(V_1 = \\frac{Q_1}{M_1} = \\frac{${Q_1}}{${M_1}} = ${V_1} \\)` }</MathJax>

				<h2>2. Скорость обращения наличных денег:</h2>
				<MathJax>{ `\\(B_0 = \\frac{Q_0}{N_0} = \\frac{${Q_0}}{${N_0}} = ${B_0} \\)` }</MathJax>
				<MathJax>{ `\\(B_1 = \\frac{Q_1}{N_1} = \\frac{${Q_1}}{${N_1}} = ${B_1} \\)` }</MathJax>

				<h2>3. Продолжительность одного оборота денежной массы:</h2>
				<MathJax>{ `\\(T_0 = \\frac{D}{V_0} = \\frac{${D}}{${V_0}} = ${T_0} \\)` }</MathJax>
				<MathJax>{ `\\(T_1 = \\frac{D}{V_1} = \\frac{${D}}{${V_1}} = ${T_1} \\)` }</MathJax>
				<h3>D - число календарных дней анализируемого периода (360 дней).</h3>

				<h2>4. Продолжительность одного оборота наличных денег:</h2>
				<MathJax>{ `\\(P_0 = \\frac{D}{B_0} = \\frac{${D}}{${B_0}} = ${P_0} \\)` }</MathJax>
				<MathJax>{ `\\(P_1 = \\frac{D}{B_1} = \\frac{${D}}{${B_1}} = ${P_1} \\)` }</MathJax>

				<h2>5. Доля наличных денег в денежной массе:</h2>
				<MathJax>{ `\\(Z_0 = \\frac{N_0}{M_0} = \\frac{${N_0}}{${M_0}} = ${Z_0} \\)` }</MathJax>
				<MathJax>{ `\\(Z_1 = \\frac{N_1}{M_1} = \\frac{${N_1}}{${M_1}} = ${Z_1} \\)` }</MathJax>

				<h2>6. Прирост скорости обращения денежной массы за счет изменения скорости обращения наличных денег:</h2>
				<MathJax>{ `\\(X = (B_1 Z_1) - (B_0 Z_1) = (${B_1} * ${Z_1}) - (${B_0} * ${Z_1}) = ${X} \\)` }</MathJax>

				<h2>7. Прирост скорости обращения денежной массы за счет изменения долей наличных денег:</h2>
				<MathJax>{ `\\(Y = (B_0 Z_1) - (B_0 Z_0) = (${B_0} * ${Z_1}) - (${B_0} * ${Z_0}) = ${Y} \\)` }</MathJax>
			</MathJaxContext>
		</Stack>
	);
}
