import { Dispatch, SetStateAction } from 'react';


export function ReplaceArrayValue<TArrayValue> (callback: Dispatch<SetStateAction<TArrayValue[]>>, index: number, value: TArrayValue)
{
	callback(function (prevState)
	{
		return prevState.map(function (currentValue, currentIndex)
		{
			return index === currentIndex
				? value
				: currentValue;
		});
	});
}
