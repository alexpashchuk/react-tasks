import clsx from 'clsx';

import { useAppSelector } from '@/hooks/redux.ts';
import { selectUncontrolledFormData } from '@/store/slices/uncontrolledFormSlice.tsx';
import { selectReactHookFormData } from '@/store/slices/reactHookFormSlice.tsx';

import classes from './mainPage.module.css';

const MainPage = () => {
  const uncontrolledFormData = useAppSelector(selectUncontrolledFormData);
  const reactHookFormData = useAppSelector(selectReactHookFormData);

  const { name, age, email, password, confirmPassword, image, gender, country, tc } = uncontrolledFormData || {};
  const {
    name: nameRHF,
    age: ageRHF,
    email: emailRHF,
    password: passwordRHF,
    confirmPassword: confirmPasswordRHF,
    image: imageRHF,
    gender: genderRHF,
    country: countryRHF,
    tc: tcRHF,
  } = reactHookFormData || {};

  return (
    <div className={classes.root}>
      <h1>Main</h1>
      <div className={clsx(classes.formWrapper, classes.border)}>
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
      <div className={clsx(classes.formWrapper, classes.border)}>
        <h2>React Hook Form Data:</h2>
        <p>
          Name: <span>{nameRHF}</span>
        </p>
        <p>
          Age: <span>{ageRHF}</span>
        </p>
        <p>
          Email: <span>{emailRHF}</span>
        </p>
        <p>
          Password: <span> {passwordRHF}</span>
        </p>
        <p>
          Confirm password: <span>{confirmPasswordRHF}</span>
        </p>
        <div>
          <p>Image:</p>
          {imageRHF && <img className={classes.image} src={imageRHF} alt="react hook form image" />}
        </div>
        <p>
          Gender: <span>{genderRHF}</span>
        </p>
        <p>
          Country: <span>{countryRHF}</span>
        </p>
        <p>Accept T&C: {tcRHF && <span>{`${tcRHF}`}</span>}</p>
      </div>
    </div>
  );
};

export default MainPage;
