import { PlannedRowIndicatorMiniResponse } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorMiniResponse';


export interface PlannedRowIndicatorFullResponse
	extends PlannedRowIndicatorMiniResponse
{
	'Удельный вес (%)': {
		base: number;
		plan: number;
		fact: number;
	};
}
