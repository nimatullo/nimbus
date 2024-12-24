export const formatMoney = (value: number) => {
	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(value);
};

export const formatPercentage = (value: number) => {
	return Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 1
	}).format(value / 100);
};
