import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux.ts';
import { selectFormData } from '@/store/slices/formDataSlice.tsx';

import classes from './mainPage.module.css';

const MainPage = () => {
  const formData = useAppSelector(selectFormData);

  const [active, setActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={classes.root}>
      <h1>Main</h1>
      {formData.length ? (
        <div className={classes.formRoot}>
          {[...formData]
            .reverse()
            .map(({ name, age, email, password, confirmPassword, image, gender, country, tc }, i) => (
              <div key={i} className={clsx(classes.formWrapper, i === 0 && active ? classes.active : null)}>
                <p>
                  Name: <span>{name}</span>
                </p>
                <p>
                  Age: <span>{age}</span>
                </p>
                <p>
                  Email: <span>{email}</span>
                </p>
                <p>
                  Password: <span> {password}</span>
                </p>
                <p>
                  Confirm password: <span>{confirmPassword}</span>
                </p>
                <div>
                  <p>Image:</p>
                  {image && <img className={classes.image} src={image} alt="form image" />}
                </div>
                <p>
                  Gender: <span>{gender}</span>
                </p>
                <p>
                  Country: <span>{country}</span>
                </p>
                <p>Accept T&C: {tc && <span>{`${tc}`}</span>}</p>
              </div>
            ))}
        </div>
      ) : (
        <p className={classes.noData}>Enter data from the forms, please</p>
      )}
    </div>
  );
};

export default MainPage;
