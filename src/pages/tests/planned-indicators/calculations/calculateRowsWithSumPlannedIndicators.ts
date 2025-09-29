import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';
import { PlannedRowsWithSumIndicators } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowsWithSumIndicators';


export function calculateRowsWithSumPlannedIndicators (rows: PlannedRowIndicatorMiniResponse[]): PlannedRowsWithSumIndicators
{
	const base = Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].base, 0).toFixed(3));
	const plan = Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].plan, 0).toFixed(3));
	const fact = Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].fact, 0).toFixed(3));

	const parameter1 = Number((plan / base).toFixed(3));
	const parameter2 = Number((fact / plan).toFixed(3));
	const parameter3 = Number((fact / base).toFixed(3));

	const sum = {
		'Вид топлива': 'Σ',
		'Единицы измерения': undefined,

		'Расход Абс.': {
			base: undefined,
			plan: undefined,
			fact: undefined,
		},

		k: undefined,

		// ===== ===== ===== ===== =====

		'Расход УЕ': {
			base,
			plan,
			fact,
		},

		'ОВПЗ = П/Б': {
			k: parameter1,
			'%': Number((parameter1 * 100).toFixed(3)),
			'‰': Number((parameter1 * 1000).toFixed(3)),
		},

		'ОВВП = Ф/П': {
			k: parameter2,
			'%': Number((parameter2 * 100).toFixed(3)),
			'‰': Number((parameter2 * 1000).toFixed(3)),
		},

		'ОВФР = Ф/Б': {
			k: parameter3,
			'%': Number((parameter3 * 100).toFixed(3)),
			'‰': Number((parameter3 * 1000).toFixed(3)),
		},
	};

	return Object.assign(rows, { sum });
}
