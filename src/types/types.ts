import { UseFormRegisterReturn } from 'react-hook-form';

export type Classes = Record<string, string | undefined>;

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
  classes?: Classes;
  register?: (name: FormDataFields) => UseFormRegisterReturn<FormDataFields>;
};

type SelectOptions = {
  value: string;
  text: string;
};

export type SelectItemsProps = Omit<InputTextProps, 'type' | 'list' | 'placeholder' | 'classes'> & {
  options: SelectOptions[];
};

export type FormData = {
  data: {
    name: string;
    age: string;
    email: string;
    password: string;
    confirmPassword: string;
    image: string;
    gender: string;
    country: string;
    tc: boolean;
  };
};

export type FormDataHook = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  image: FileList;
  gender: string;
  country: string;
  tc?: boolean | undefined;
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
