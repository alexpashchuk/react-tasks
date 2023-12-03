import { UseFormRegisterReturn } from 'react-hook-form';

export type InputTextProps = {
  id: string;
  label: string;
  type?: string;
  name: string;
  autocomplete?: string;
  placeholder?: string;
  list?: string;
  inputRef?: React.RefObject<HTMLInputElement | HTMLElement>;
  error?: string;
  register?: (name: FormDataFields) => UseFormRegisterReturn<FormDataFields>;
  passwordValue?: string;
  resetField?: (image: FormDataFields.image, p: { keepError: boolean }) => void;
};

type SelectOptions = {
  value: string;
  text: string;
};

export type SelectItemsProps = Omit<InputTextProps, 'type' | 'list' | 'placeholder' | 'passwordValue'> & {
  options: SelectOptions[];
};

export type FormData<T> = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  image: T;
  gender: string;
  country: string;
  tc?: boolean | undefined;
};

export type FormDataSlice<T> = {
  data: FormData<T>[];
};

export enum FormDataFields {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  image = 'image',
  gender = 'gender',
  country = 'country',
  tc = 'tc',
}
