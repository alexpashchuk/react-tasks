import { useAppSelector } from '@/hooks/redux.ts';
import { selectUncontrolledFormData } from '@/store/slices/uncontrolledFormSlice.tsx';

import classes from './mainPage.module.css';

const MainPage = () => {
  const uncontrolledFormData = useAppSelector(selectUncontrolledFormData);
  const { name, age, email, password, confirmPassword, image, country, gender, tc } = uncontrolledFormData || {};

  return (
    <div className={classes.root}>
      <h1>Main</h1>
      <div className={classes.formWrapper}>
        <h2>Uncontrolled form Data:</h2>
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
          {image && <img className={classes.image} src={image} alt="uncontrolled form image" />}
        </div>
        <p>
          Gender: <span>{gender}</span>
        </p>
        <p>
          Country: <span>{country}</span>
        </p>
        <p>Accept T&C: {tc && <span>{`${tc}`}</span>}</p>
      </div>
    </div>
  );
};

export default MainPage;
