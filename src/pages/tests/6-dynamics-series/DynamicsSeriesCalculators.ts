
export type DynamicsSeriesRow = Record<'year' | 'value', number>;

export type DynamicsSeriesDeltaЦ = {
	back: DynamicsSeriesRow;
	curr: DynamicsSeriesRow;
	value: number;
};

export type DynamicsSeriesDeltaБ = {
	first: DynamicsSeriesRow;
	curr: DynamicsSeriesRow;
	value: number;
};

export class DynamicsSeriesCalculators
{
	static yearsWithValues (years: number[], values: number[])
	{
		const array: Array<DynamicsSeriesRow> = [];

		for (const index in years)
		{
			const year = years[index];
			const value = values[index];

			array.push({
				year,
				value,
			});
		}

		return array;
	}

	// ===== ===== ===== ===== =====

	static deltaYЦ (array: Array<DynamicsSeriesRow>)
	{
		const response: DynamicsSeriesDeltaЦ[] = [];

		for (const index in Array.from({ length: array.length - 1 }))
		{
			const offset = Number(index);

			const back = array[offset];
			const curr = array[offset + 1];

			response.push({
				back,
				curr,
				value: (curr.value - back.value).toFixedNumber(3),
			});
		}

		return response;
	}

	static deltaYБ (array: Array<DynamicsSeriesRow>)
	{
		const response: DynamicsSeriesDeltaБ[] = [];

		const first = array[0];

		for (const index in Array.from({ length: array.length - 1 }))
		{
			const offset = Number(index);
			const curr = array[offset + 1];

			response.push({
				first,
				curr,
				value: (curr.value - first.value).toFixedNumber(3),
			});
		}

		return response;
	}

	// ===== ===== ===== ===== =====

	static kЦ (array: Array<DynamicsSeriesRow>)
	{
		const response: DynamicsSeriesDeltaЦ[] = [];

		for (const index in Array.from({ length: array.length - 1 }))
		{
			const offset = Number(index);

			const back = array[offset];
			const curr = array[offset + 1];

			response.push({
				back,
				curr,
				value: (curr.value / back.value).toFixedNumber(3),
			});
		}

		return response;
	}

	static kБ (array: Array<DynamicsSeriesRow>)
	{
		const response: DynamicsSeriesDeltaБ[] = [];

		const first = array[0];

		for (const index in Array.from({ length: array.length - 1 }))
		{
			const offset = Number(index);
			const curr = array[offset + 1];

			response.push({
				first,
				curr,
				value: (curr.value / first.value).toFixedNumber(3),
			});
		}

		return response;
	}

	// ===== ===== ===== ===== =====

	static deltaK (array: Array<DynamicsSeriesRow>)
	{
		const response: {
			year: number;
			k: number;
			value: number;
		}[] = [];

		for (const row of array)
		{
			response.push({
				year: row.year,
				k: row.value,
				value: (row.value * 100 - 100).toFixedNumber(3),
			});
		}

		return response;
	}
}
