export interface TypeOfIdentificationUI {
  abbreviation: string;
  value: string;
  id: number;
}

export interface DataLoginUI {
  email: string;
  password: string;
}

export interface FieldRegisterUI {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select';
}
