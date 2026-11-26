import type { FilterDropdownOption, Step } from "../types/careers.type";

export const STEPS = [
  'Basic Details',
  'Education',
  'Experience',
  'Salary & Final',
] as const;

export const HOW_WE_HIRE_STEPS: Step[] = [
  { stepNo: "01", title: "Apply", description: "Choose a role and send your resume and details.", delay: 0 },
  { stepNo: "02", title: "Screen", description: "We review your application and call you within 5 working days.", delay: 120 },
  { stepNo: "03", title: "Interview", description: "A conversation with the team, and a short task where relevant.", delay: 240 },
  { stepNo: "04", title: "Offer", description: "We confirm the role, terms and joining date in writing.", delay: 360 },
];

export const SALARY_RANGE_OPTIONS: FilterDropdownOption[] = [
  { label: '₹0 - ₹3,00,000', value: '0-300000' },
  { label: '₹3,00,000 - ₹6,00,000', value: '300000-600000' },
  { label: '₹6,00,000 - ₹9,00,000', value: '600000-900000' },
  { label: '₹9,00,000 - ₹12,00,000', value: '900000-1200000' },
  { label: '₹12,00,000 - ₹18,00,000', value: '1200000-1800000' },
  { label: '₹18,00,000 - ₹25,00,000', value: '1800000-2500000' },
  { label: '₹25,00,000+', value: '2500000+' },
];

export const QUALIFICATION_RANGE_OPTIONS: FilterDropdownOption[] = [
  { label: '10th Pass', value: '10th pass' },
  { label: '12th Pass', value: '12th pass' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Graduate', value: 'graduate' },
  { label: 'Post Graduate', value: 'post graduate' },
  { label: 'PhD', value: 'phd' },
  { label: 'Other', value: 'other' },
];

export const EMPTY_OPTION: FilterDropdownOption = { label: '', value: '' };

export const getOptionByValue = (OPTIONS: FilterDropdownOption[], value: string) =>
  OPTIONS.find((opt) => opt.value === value) ?? EMPTY_OPTION;
