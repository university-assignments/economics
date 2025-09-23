import { PlannedRowIndicatorFullResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorFullResponse';
import { PlannedRowsWithSumIndicators } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowsWithSumIndicators';


export function calculateFullRowsPlannedIndicators (rows: PlannedRowsWithSumIndicators)
{
	return rows.map<PlannedRowIndicatorFullResponse>(function (row)
	{
		return {
			...row,

			'Удельный вес (%)': {
				base: Number((row['Расход УЕ'].base / rows.sum['Расход УЕ'].base * 100).toFixed(3)),
				plan: Number((row['Расход УЕ'].plan / rows.sum['Расход УЕ'].plan * 100).toFixed(3)),
				fact: Number((row['Расход УЕ'].fact / rows.sum['Расход УЕ'].fact * 100).toFixed(3)),
			},
		};
	});
}
