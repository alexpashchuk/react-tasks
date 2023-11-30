import clsx from 'clsx';

import { FormDataFields, SelectItemsProps } from '@/types/types.ts';

import classes from './selectItemst.module.css';

const SelectItems = (props: SelectItemsProps) => {
  const { id, label, name, inputRef, options, register, error } = props;
  return (
    <div className={classes.root}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={clsx(classes.select, error ? classes.errorSelect : null)}
        name={name}
        id={id}
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        {...(register ? register(name as FormDataFields) : null)}
      >
        {options.map(({ value, text }, i) => (
          <option value={value} key={i}>
            {text}
          </option>
        ))}
      </select>
      <p className={classes.errorMessage}>{error ? <span>{error}</span> : null}</p>
    </div>
  );
};

export default SelectItems;
