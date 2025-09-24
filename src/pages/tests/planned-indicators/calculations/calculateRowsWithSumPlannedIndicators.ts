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
			base: Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].base, 0).toFixed(3)),
			plan: Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].plan, 0).toFixed(3)),
			fact: Number(rows.reduce((accumulator, row) => accumulator + row['Расход УЕ'].fact, 0).toFixed(3)),
		},

		'ОВПЗ = П/Б': {
			k: Number(rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б'].k, 0).toFixed(3)),
			'%': Number(rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б']['‰'], 0).toFixed(3)),
			'‰': Number(rows.reduce((accumulator, row) => accumulator + row['ОВПЗ = П/Б']['‰'], 0).toFixed(3)),
		},

		'ОВВП = Ф/П': {
			k: Number(rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П'].k, 0).toFixed(3)),
			'%': Number(rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П']['‰'], 0).toFixed(3)),
			'‰': Number(rows.reduce((accumulator, row) => accumulator + row['ОВВП = Ф/П']['‰'], 0).toFixed(3)),
		},

		'ОВФР = Ф/Б': {
			k: Number(rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б'].k, 0).toFixed(3)),
			'%': Number(rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б']['‰'], 0).toFixed(3)),
			'‰': Number(rows.reduce((accumulator, row) => accumulator + row['ОВФР = Ф/Б']['‰'], 0).toFixed(3)),
		},
	};

	return Object.assign(rows, { sum });
}
