import { PlannedRowIndicatorData } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorData';
import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';


export function calculateMiniRowsPlannedIndicators (rows: PlannedRowIndicatorData[])
{
	return rows.map<PlannedRowIndicatorMiniResponse>(function (row)
	{
		const main = row['Расход Абс.'];

		const parameter1 = Number((main.plan / main.base).toFixed(3));
		const parameter2 = Number((main.fact / main.plan).toFixed(3));
		const parameter3 = Number((main.fact / main.base).toFixed(3));

		return {
			...row,

			'Расход УЕ': {
				base: Number((main.base * row.k).toFixed(3)),
				plan: Number((main.plan * row.k).toFixed(3)),
				fact: Number((main.fact * row.k).toFixed(3)),
			},

			'ОВПЗ = П/Б': {
				k: parameter1,
				'%': parameter1 * 100,
				'‰': parameter1 * 1000,
			},

			'ОВВП = Ф/П': {
				k: parameter2,
				'%': parameter2 * 100,
				'‰': parameter2 * 1000,
			},

			'ОВФР = Ф/Б': {
				k: parameter3,
				'%': parameter3 * 100,
				'‰': parameter3 * 1000,
			},
		};
	});
}
