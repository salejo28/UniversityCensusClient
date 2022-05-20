export interface TypeOfIdentificationUI {
  abbreviation: string;
  value: string;
  id: number;
}

export interface DataLoginUI {
  email: string;
  password: string;
}

export interface DataRgisterUI {
  firstName: string;
  middleName: string;
  surname: string;
  lastName: string;
  idType: string;
  idNumber: string;
  email: string;
  password: string;
}

export interface FieldRegisterUI {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'date';
  disabled?: boolean;
}

type RoleType = 'admin' | 'boss' | 'official' | 'client';
export interface UserUI {
  id: number;
  bornDate: string | null;
  cellphone: string | null;
  email: string;
  firstName: string;
  middleName: string;
  surname: string;
  lastName: string;
  role: RoleType;
  imgUri: string | null;
  idNumber: string;
  idType: string;
  createdAt: string;
}

export interface RoutesUI {
  path: string;
  name: string;
  icon?: string;
}
