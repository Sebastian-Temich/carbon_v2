export interface SelectFilterOption {
  value: string;
  label?: string;
  imageUrl?: string;
}
export interface ResponseFecthData {
  id: string;
  name?: string;
  code?: string;
  imageUri?: string;
}

export interface DataForm {
  countries: SelectFilterOption[];
  standards: SelectFilterOption[];
  auditUnits: SelectFilterOption[];
  devGoals: SelectFilterOption[];
  unitTypes: SelectFilterOption[];
  status: SelectFilterOption[];
  currencies: SelectFilterOption[];
}
