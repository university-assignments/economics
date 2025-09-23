import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';
import { PlannedRowsWithSumIndicators } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowsWithSumIndicators';


export function calculateRowsWithSumPlannedIndicators (rows: PlannedRowIndicatorMiniResponse[]): PlannedRowsWithSumIndicators
{
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
			base: rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].base, 0),
			plan: rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].plan, 0),
			fact: rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].fact, 0),
		},

		'ОВПЗ = П/Б': {
			k: rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б'].k, 0),
			'%': rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б']['‰'], 0),
			'‰': rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б']['‰'], 0),
		},

		'ОВВП = Ф/П': {
			k: rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П'].k, 0),
			'%': rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П']['‰'], 0),
			'‰': rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П']['‰'], 0),
		},

		'ОВФР = Ф/Б': {
			k: rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б'].k, 0),
			'%': rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б']['‰'], 0),
			'‰': rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б']['‰'], 0),
		},
	};

	return Object.assign(rows, { sum });
}
