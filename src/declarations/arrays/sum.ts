import './sum.d';


if (typeof Array.prototype.sum === 'undefined')
{
	Object.defineProperty(Array.prototype, 'sum', {
		configurable: true,
		enumerable: false,
		writable: true,

		value: function (this: number[], fractionDigits?: number): number
		{
			const response = this.reduce((accumulator, current) => accumulator + current, 0);

			return fractionDigits
				? response.toFixedNumber(fractionDigits)
				: response;
		},
	});
}
