import { InputTextProps } from '@/types/types.ts';

type createInputsProps = {
  nameRef: React.RefObject<HTMLInputElement>;
  ageRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  gendersRef: React.RefObject<HTMLSelectElement>;
  countriesRef: React.RefObject<HTMLInputElement>;
  tcRef: React.RefObject<HTMLInputElement>;
};

export const createInputs = (props: createInputsProps): InputTextProps[] => {
  const { nameRef, ageRef, emailRef, passwordRef, confirmPasswordRef, imageRef, gendersRef, countriesRef, tcRef } =
    props;
  return [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
      inputRef: nameRef,
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      name: 'age',
      inputRef: ageRef,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      name: 'email',
      inputRef: emailRef,
      autocomplete: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      name: 'password',
      autocomplete: 'new-password',
      inputRef: passwordRef,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      name: 'confirmPassword',
      autocomplete: 'new-password',
      inputRef: confirmPasswordRef,
    },
    {
      label: 'Upload image',
      type: 'file',
      name: 'image',
      id: 'image',
      inputRef: imageRef,
    },
    {
      label: 'Gender',
      type: 'select',
      name: 'gender',
      id: 'gender',
      inputRef: gendersRef,
    },
    {
      label: 'Countries',
      type: 'text',
      name: 'country',
      id: 'country',
      placeholder: 'Choose country',
      list: 'country-list',
      inputRef: countriesRef,
    },
    {
      label: 'Accept T&C',
      type: 'checkbox',
      name: 'tc',
      id: 'tc',
      inputRef: tcRef,
    },
  ];
};
