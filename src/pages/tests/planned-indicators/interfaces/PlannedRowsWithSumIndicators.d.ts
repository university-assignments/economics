import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';


export interface PlannedMiniSumIndicator
	extends Omit<PlannedRowIndicatorMiniResponse, 'Единицы измерения' | 'Расход Абс.' | 'k'>
{
	'Единицы измерения': undefined;

	'Расход Абс.': {
		base: undefined;
		plan: undefined;
		fact: undefined;
	};

	k: undefined;
}

export interface PlannedRowsWithSumIndicators
	extends Array<PlannedRowIndicatorMiniResponse>
{
	sum: PlannedMiniSumIndicator;
}
