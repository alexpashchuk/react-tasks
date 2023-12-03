import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createInputs } from '@/utils/createInputs.ts';
import { toBase64 } from '@/utils/base64Converter.ts';
import { formValidationSchema } from '@/utils/createValidationSchema.ts';
import { genders } from '@/data/genderData.ts';
import { FormDataFields, FormData } from '@/types/types.ts';
import { useAppDispatch } from '@/hooks/redux.ts';
import { setFormData } from '@/store/slices/formDataSlice.tsx';
import SelectItems from '@/components/SelectItems/selectItems.tsx';
import InputText from '@/components/InputText/inputText.tsx';

import classes from '@/pages/UncontrolledFormPage/uncontrolledFormPage.module.css';

const ReactHookFormPage = () => {
  const inputs = createInputs(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<FormData<FileList>>({
    mode: 'onChange',
    resolver: yupResolver(formValidationSchema),
  });

  const passwordValue = watch('password');

  const onSubmit = handleSubmit(async (data) => {
    const imageData: string | null = await toBase64(data.image?.[0] as File | undefined);
    dispatch(setFormData({ ...data, image: imageData }));
    navigate('/');
  });

  return (
    <>
      <h1>React Hook Form Page</h1>
      <form noValidate className={classes.wrapper} onSubmit={onSubmit} autoComplete="on">
        {inputs.map((input) => {
          const { id, type, label, name, autocomplete, placeholder, list } = input;
          return type === 'select' ? (
            <SelectItems
              key={id}
              id={id}
              label={label}
              name={name}
              register={register}
              error={errors[name as FormDataFields]?.message}
              options={genders}
            />
          ) : (
            <InputText
              key={id}
              id={id}
              type={type}
              label={label}
              name={name}
              autocomplete={autocomplete}
              placeholder={placeholder}
              list={list}
              register={register}
              error={errors[name as FormDataFields]?.message}
              passwordValue={passwordValue}
              resetField={resetField}
            />
          );
        })}
        <button className={'button'} disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ReactHookFormPage;
