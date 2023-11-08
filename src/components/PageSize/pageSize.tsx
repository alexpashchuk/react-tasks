import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import classes from './pageSize.module.css';

type SelectPageProps = {
  setSkip: (s: boolean) => void;
};

const PageSize = ({ setSkip }: SelectPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPageQuery = searchParams.get('per_page') || '20';
  const options = [
    { value: '20', label: '20 cards' },
    { value: '15', label: '15 cards' },
    { value: '10', label: '10 cards' },
    { value: '5', label: '5 cards' },
  ];

  const [selected, setSelected] = useState<string>(perPageQuery || options[0].value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSkip(false);
    const value = e.target.value;
    setSelected(value);
    // If the user changes items on the page, make a new API call and display the results from the first page.
    searchParams.set('page', '1');
    searchParams.set('per_page', `${value}`);
    setSearchParams(searchParams);
  };

  return (
    <div className={classes.root}>
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
