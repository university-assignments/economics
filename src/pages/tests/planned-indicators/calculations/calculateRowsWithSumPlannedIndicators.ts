import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';
import { PlannedRowsWithSumIndicators } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowsWithSumIndicators';


export function calculateRowsWithSumPlannedIndicators (rows: PlannedRowIndicatorMiniResponse[]): PlannedRowsWithSumIndicators
{
	const base = rows.map((row) => row['Расход УЕ'].base).sum(3);
	const plan = rows.map((row) => row['Расход УЕ'].plan).sum(3);
	const fact = rows.map((row) => row['Расход УЕ'].fact).sum(3);

	const parameter1 = (plan / base).toFixedNumber(3);
	const parameter2 = (fact / plan).toFixedNumber(3);
	const parameter3 = (fact / base).toFixedNumber(3);

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

		'РВПЗ = П/Б': {
			k: parameter1,
			'%': (parameter1 * 100).toFixedNumber(3),
			'‰': (parameter1 * 1000).toFixedNumber(3),
		},

		'ОВВП = Ф/П': {
			k: parameter2,
			'%': (parameter2 * 100).toFixedNumber(3),
			'‰': (parameter2 * 1000).toFixedNumber(3),
		},

		'ОВФР = Ф/Б': {
			k: parameter3,
			'%': (parameter3 * 100).toFixedNumber(3),
			'‰': (parameter3 * 1000).toFixedNumber(3),
		},
	};

	return Object.assign(rows, { sum });
}
