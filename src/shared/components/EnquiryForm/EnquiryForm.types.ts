export interface EnquiryFormData {
  fullName: string;
  email: string;
  mobile: string;
  countryCode: string;
  consent: boolean;
}

export interface EnquiryFormErrors {
  projectLocation?: string;
  projectName?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  consent?: string;
}
