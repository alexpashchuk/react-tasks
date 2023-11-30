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
    gender: string;
    tc: boolean;
    image: string;
    country: string;
  };
};
