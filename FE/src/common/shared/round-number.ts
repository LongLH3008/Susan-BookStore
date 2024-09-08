export const MakeRoundToTwoDigitDecimal = (number?: number) => {
	return number ? Math.round(number * 100) / 100 : 0;
};
