import { PlannedRowIndicatorData } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorData';
import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';


export function calculateMiniRowsPlannedIndicators (rows: PlannedRowIndicatorData[])
{
	return rows.map<PlannedRowIndicatorMiniResponse>(function (row)
	{
		const main = row['Расход Абс.'];

		const parameter1 = (main.plan / main.base).toFixedNumber(3);
		const parameter2 = (main.fact / main.plan).toFixedNumber(3);
		const parameter3 = (main.fact / main.base).toFixedNumber(3);

		return {
			...row,

			'Расход УЕ': {
				base: (main.base * row.k).toFixedNumber(3),
				plan: (main.plan * row.k).toFixedNumber(3),
				fact: (main.fact * row.k).toFixedNumber(3),
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
	});
}
