import { PlannedRowIndicatorData } from 'src/pages/tests/planned-indicators/interfaces/PlannedRowIndicatorData';


export interface PlannedRowIndicatorMiniResponse
	extends PlannedRowIndicatorData
{
	'Расход УЕ': {
		base: number;
		plan: number;
		fact: number;
	};

	'ОВПЗ = П/Б': {
		k: number;
		'%': number;
		'‰': number;
	};

	'ОВВП = Ф/П': {
		k: number;
		'%': number;
		'‰': number;
	};

	'ОВФР = Ф/Б': {
		k: number;
		'%': number;
		'‰': number;
	};
}
