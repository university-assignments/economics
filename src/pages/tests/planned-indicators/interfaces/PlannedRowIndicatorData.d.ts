
export interface PlannedRowIndicatorData
{
	'Вид топлива': string;
	'Единицы измерения': string;

	'Расход Абс.': {
		base: number;
		plan: number;
		fact: number;
	};

	k: number;
}
