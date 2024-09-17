export const ConvertVNDString = (number?: number) => {
	const handleString = (number: string) => {
		let split = number.trim().split("");
		split.splice(split.length - 3, 0, ".");
		if (number.split("").length >= 7) {
			split.splice(split.length - 7, 0, ".");
		}
		return split;
	};
	return number ? handleString(number.toString()) : 0;
};
