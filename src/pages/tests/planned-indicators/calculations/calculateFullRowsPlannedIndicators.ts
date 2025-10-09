import { PlannedRowIndicatorFullResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorFullResponse';
import { PlannedRowsWithSumIndicators } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowsWithSumIndicators';


export function calculateFullRowsPlannedIndicators (rows: PlannedRowsWithSumIndicators)
{
	return rows.map<PlannedRowIndicatorFullResponse>(function (row)
	{
		return {
			...row,

			'Удельный вес (%)': {
				base: (row['Расход УЕ'].base / rows.sum['Расход УЕ'].base * 100).toFixedNumber(3),
				plan: (row['Расход УЕ'].plan / rows.sum['Расход УЕ'].plan * 100).toFixedNumber(3),
				fact: (row['Расход УЕ'].fact / rows.sum['Расход УЕ'].fact * 100).toFixedNumber(3),
			},
		};
	});
}
