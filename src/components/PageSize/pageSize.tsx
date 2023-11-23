import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import classes from './pageSize.module.css';

const PageSize = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const options = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push({ pathname, query: { ...query, perPage: value, page: '1' } }, undefined, { scroll: false });
  };

  return (
    <div className={classes.root}>
      <p>Page Size</p>
      <select className={classes.select} value={query.perPage || '20'} onChange={handleChange}>
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
