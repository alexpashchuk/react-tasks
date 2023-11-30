import clsx from 'clsx';

import { SelectItemsProps } from '@/types/types.ts';

import classes from './selectItemst.module.css';

const SelectItems = (props: SelectItemsProps) => {
  const { id, label, name, inputRef, options, error } = props;
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
