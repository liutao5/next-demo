export type ICompany = {
  id: string;
	full_name: string;
  short_name: string;
  is_owner: boolean;
  logo?: string;
  warehouse?: string;
  invoice?: IInvoice;
}

export type ICompanyBase = {
	full_name: string;
  short_name: string;
  logo?: string;
  warehouse?: string;
}

export type IInvoice = {
  is_vat_invoice_special: boolean;
  title: string;
  duty_paragraph: string;
  address: string | null;
  phone_number: string | null;
  deposit_bank: string | null;
  bank_account: string | null;
}