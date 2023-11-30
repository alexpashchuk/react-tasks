import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createInputs } from '@/utils/createInputs.ts';
import { formValidationSchema } from '@/utils/createValidationSchema.ts';
import { getValidationMessages, isValidationError } from '@/utils/validationUtils.ts';
import { toBase64 } from '@/utils/base64Converter.ts';
import { useAppDispatch } from '@/hooks/redux.ts';
import { setUncontrolledFormData } from '@/store/slices/uncontrolledFormSlice.tsx';
import { genders } from '@/data/genderData.ts';
import InputText from '@/components/InputText/inputText.tsx';
import SelectItems from '@/components/SelectItems/selectItems.tsx';

import classes from './uncontrolledFormPage.module.css';

const UncontrolledFormPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const gendersRef = useRef<HTMLSelectElement>(null);
  const countriesRef = useRef<HTMLInputElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const inputs = createInputs({
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    imageRef,
    gendersRef,
    countriesRef,
    tcRef,
  });

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      image: imageRef.current?.files,
      country: countriesRef.current?.value,
      gender: gendersRef.current?.value,
      tc: tcRef.current?.checked,
    };
    const imageData = await toBase64(formData.image?.[0]);

    try {
      formValidationSchema.validateSync(formData, { abortEarly: false });
      dispatch(setUncontrolledFormData({ ...formData, image: imageData }));
      navigate('/');
      setFormError({});
    } catch (e) {
      if (!isValidationError(e)) return null;
      const validationError = getValidationMessages(e);
      setFormError(validationError);
    }
    return null;
  };

  return (
    <>
      <h1>Uncontrolled Form Page</h1>
      <form noValidate className={classes.wrapper} onSubmit={formSubmitHandler} ref={formRef} autoComplete="on">
        {inputs.map((input) => {
          const { id, type, label, name, autocomplete, placeholder, list, inputRef } = input;
          return type === 'select' ? (
            <SelectItems
              key={id}
              id={id}
              label={label}
              name={name}
              inputRef={inputRef}
              error={formError[name]}
              options={genders}
            />
          ) : (
            <InputText
              key={id}
              id={id}
              type={type}
              label={label}
              name={name}
              inputRef={inputRef}
              autocomplete={autocomplete}
              placeholder={placeholder}
              list={list}
              error={formError[name]}
            />
          );
        })}
        <button className={'button'} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default UncontrolledFormPage;
