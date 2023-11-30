import clsx from 'clsx';
import { useState } from 'react';

import useClassesMerge from '@/hooks/useClassesMerge.tsx';
import { FormDataFields, InputTextProps } from '@/types/types.ts';
import { countries } from '@/data/countriesData.ts';
import LogoEye from '@/assets/icons/eye.svg';
import LogoEyeSlash from '@/assets/icons/eye-slash.svg';
import LogoClose from '@/assets/icons/close.svg';

import defaultClasses from './inputText.module.css';

const InputText = (props: InputTextProps) => {
  const {
    id,
    label,
    type = 'text',
    name,
    autocomplete = 'on',
    placeholder,
    list,
    inputRef,
    error,
    register,
    classes: propClasses = {},
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const classes = useClassesMerge(defaultClasses, propClasses);

  const resetFile = () => {
    const input = inputRef?.current as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes.root, classes[type])}>
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={clsx(classes.input, error ? classes.errorInput : null)}
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          autoComplete={autocomplete}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          placeholder={placeholder}
          list={list}
          {...(register ? register(name as FormDataFields) : null)}
        />
        {type === 'password' ? (
          <div
            role="button"
            aria-label={showPassword ? 'Show password' : 'Hide password'}
            className={classes.showHide}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LogoEye /> : <LogoEyeSlash />}
          </div>
        ) : null}
        {type === 'file' ? (
          <div role="button" aria-label="Remove Image" className={classes.resetImage} onClick={resetFile}>
            <LogoClose />
          </div>
        ) : null}
        {list && (
          <datalist id={list}>
            {countries.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </datalist>
        )}
      </div>
      <p className={classes.errorMessage}>{error ? <span>{error}</span> : null}</p>
    </div>
  );
};

export default InputText;
