import { Stack, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { StyledTableCell } from 'src/components/table/StyledTableCell';
import { StyledTableRow } from 'src/components/table/StyledTableRow';
import { ReplaceArrayValue } from 'src/tools/ReplaceArrayValue';


// Количество месяцев в году.
const N = 12;

interface TableRowData
{
	M: number;
	x: number;
	t: number;
	t2: number;
	xt: number;
	Y?: number;
}

export default function SalaryTrendPage ()
{
	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ parametersX, setParametersX ] = useState(() => (searchParams.get('x') ?? '').split('|').map((value) => Number(value)));
	const [ parametersT, setParametersT ] = useState(() => (searchParams.get('t') ?? '').split('|').map((value) => Number(value)));

	useEffect(
		() => setSearchParams({
			x: parametersX.join('|'),
			t: parametersT.join('|'),
		}),
		[ parametersX, parametersT ],
	);

	const tableRows = useMemo(
		() => parametersX.map(function (_, index): TableRowData
		{
			const parameterX = Number(parametersX[index]);
			const parameterT = Number(parametersT[index]);

			return {
				M: index + 1,
				x: parameterX,
				t: parameterT,
				t2: (parameterT ** 2).toFixedNumber(3),
				xt: (parameterX * parameterT).toFixedNumber(3),
			};
		}),
		[ parametersX, parametersT ],
	);

	const tableSum = useMemo(
		() => ({
			x: tableRows.map((v) => v.x).sum(3),
			t: tableRows.map((v) => v.t).sum(3),
			t2: tableRows.map((v) => v.t2).sum(3),
			xt: tableRows.map((v) => v.xt).sum(3),
		}),
		[ tableRows ],
	);

	const a0 = useMemo(() => (tableSum.x / N).toFixedNumber(3), [ tableSum ]);
	const a1 = useMemo(() => (tableSum.xt / tableSum.t2).toFixedNumber(3), [ tableSum ]);

	const tableRowsWithY = useMemo(
		() => tableRows.map((row) => ({
			...row,
			Y: (a0 + a1 * row.t).toFixedNumber(3),
		})),
		[ tableRows ],
	);

	const sumY = useMemo(() => tableRowsWithY.map((v) => v.Y).sum(3), [ tableRowsWithY ]);

	return (
		<Stack spacing={2}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCell>M</StyledTableCell>
							<StyledTableCell>x</StyledTableCell>
							<StyledTableCell>t</StyledTableCell>
							<StyledTableCell>t^2</StyledTableCell>
							<StyledTableCell>xt</StyledTableCell>
							<StyledTableCell>Y</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							tableRowsWithY.map((row, index) => (
								<StyledTableRow key={row.M}>
									<StyledTableCell>{row.M}</StyledTableCell>
									<StyledTableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={ (ev) => ReplaceArrayValue(setParametersX, index, Number(ev.target.value)) } value={row.x} /></StyledTableCell>
									<StyledTableCell><TextField sx={{ minWidth: '100px' }} type='number' onChange={ (ev) => ReplaceArrayValue(setParametersT, index, Number(ev.target.value)) } value={row.t} /></StyledTableCell>
									<StyledTableCell>{row.t2}</StyledTableCell>
									<StyledTableCell>{row.xt}</StyledTableCell>
									<StyledTableCell>{row.Y}</StyledTableCell>
								</StyledTableRow>
							))
						}

						<StyledTableRow>
							<StyledTableCell>Σ</StyledTableCell>
							<StyledTableCell>{tableSum.x}</StyledTableCell>
							<StyledTableCell>{tableSum.t}</StyledTableCell>
							<StyledTableCell>{tableSum.t2}</StyledTableCell>
							<StyledTableCell>{tableSum.xt}</StyledTableCell>
							<StyledTableCell>{sumY}</StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<Stack spacing={2} paddingX={2}>
				<MathJaxContext key={ parametersX.join('|') + parametersT.join('|') }>
					<MathJax>{ `\\(a_0 = \\frac{\\sum (x)}{n} = \\frac{${tableSum.x}}{${N}} = ${a0} \\)` }</MathJax>
					<MathJax>{ `\\(a_1 = \\frac{\\sum (xt)}{\\sum (t^2)} = \\frac{${tableSum.xt}}{${tableSum.t2}} = ${a1} \\)` }</MathJax>
				</MathJaxContext>
			</Stack>
		</Stack>
	);
}
