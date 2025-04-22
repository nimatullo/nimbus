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
