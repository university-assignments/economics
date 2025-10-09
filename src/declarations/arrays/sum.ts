import './sum.d';


if (typeof Array.prototype.sum === 'undefined')
{
	Array.prototype.sum = function (this, fractionDigits?: number): number
	{
		const response = this.reduce((accumulator, current) => accumulator + current, 0);

		return fractionDigits
			? response.toFixedNumber(fractionDigits)
			: response;
	};
}
