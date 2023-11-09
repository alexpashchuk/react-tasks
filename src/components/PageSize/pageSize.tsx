import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import classes from './pageSize.module.css';

const PageSize = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPageQuery = searchParams.get('per_page') || '20';
  const options = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
  ];

  const [selected, setSelected] = useState<string>(perPageQuery || options[0].value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    // If the user changes items on the page, make a new API call and display the results from the first page.
    searchParams.set('page', '1');
    searchParams.set('per_page', `${value}`);
    setSearchParams(searchParams);
  };

  return (
    <div className={classes.root}>
      <p>Page Size</p>
      <select className={classes.select} value={selected} onChange={handleChange}>
        {options.map((option) => (
          <option className={classes.option} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSize;
