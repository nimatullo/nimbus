export const averageReturns = {
	investment: 0.07,
	savings: 0.03
};

export enum PayFrequency {
	Weekly = 52,
	Biweekly = 26,
	Monthly = 12,
	Semimonthly = 24,
	Quarterly = 4,
	Annually = 1
}

export const payFrequencyOptions = [
	{
		label: 'Weekly',
		value: PayFrequency.Weekly
	},
	{
		label: 'Biweekly',
		value: PayFrequency.Biweekly
	},
	{
		label: 'Monthly',
		value: PayFrequency.Monthly
	},
	{
		label: 'Semimonthly',
		value: PayFrequency.Semimonthly
	},
	{
		label: 'Quarterly',
		value: PayFrequency.Quarterly
	},
	{
		label: 'Annually',
		value: PayFrequency.Annually
	}
];

export const savingsColor = {
	borderColor: 'oklch(70.4% 0.191 22.216)',
	backgroundColor: 'oklch(63.7% 0.237 25.331)'
};
export const investmentsColor = {
	borderColor: 'oklch(84.1% 0.238 128.85)',
	backgroundColor: 'oklch(76.8% 0.233 130.85)'
};
