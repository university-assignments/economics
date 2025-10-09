import './toFixedNumber.d';


if (typeof Number.prototype.toFixedNumber === 'undefined')
{
	Number.prototype.toFixedNumber = function (this, fractionDigits?: number): number
	{
		return Number(this.toFixed(fractionDigits));
	};
}
