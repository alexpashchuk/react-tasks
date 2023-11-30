import * as yup from 'yup';

const REGEX_NAME = /^[A-ZА-ЯЁ]/;
const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD_LOWER = /[a-z]/;
const REGEX_PASSWORD_UPPER = /[A-Z]/;
const REGEX_PASSWORD_NUMERIC = /[0-9]/;
const REGEX_PASSWORD_CHARACTER = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
const IMAGE_SIZE = 2097152;

export const formValidationSchema = yup.object({
  name: yup.string().trim().required('Field is required').matches(REGEX_NAME, 'The first letter must be uppercase'),
  age: yup
    .number()
    .required('Field is required')
    .transform((value) => (isNaN(value) ? 0 : value))
    .positive('The age must be greater than 0'),
  email: yup
    .string()
    .required('Field is required')
    .email('Invalid entry. Please enter valid email address, for example, john@smith.com.')
    .matches(REGEX_EMAIL, 'Invalid entry. Please enter valid email address, for example, john@smith.com.'),
  password: yup
    .string()
    .required('Field is required')
    .matches(REGEX_PASSWORD_LOWER, 'Password must contain at least one lower case letter [a-z]')
    .matches(REGEX_PASSWORD_UPPER, 'Password must contain at least one upper case letter [A-Z]')
    .matches(REGEX_PASSWORD_NUMERIC, 'Password must contain at least one numeric character [0-9]')
    .matches(
      REGEX_PASSWORD_CHARACTER,
      'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    ),
  confirmPassword: yup
    .string()
    .required('Field is required')
    .oneOf([yup.ref('password')], 'Your passwords do not match')
    .matches(REGEX_PASSWORD_LOWER, 'Password must contain at least one lower case letter [a-z]')
    .matches(REGEX_PASSWORD_UPPER, 'Password must contain at least one upper case letter [A-Z]')
    .matches(REGEX_PASSWORD_NUMERIC, 'Password must contain at least one numeric character [0-9]')
    .matches(
      REGEX_PASSWORD_CHARACTER,
      'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    ),
  image: yup
    .mixed<FileList>()
    .required('Field is required')
    .test('is-image-upload', 'Upload image, please', (file) => !!file)
    .test('is-valid-image-size', 'Max allowed image size is 2MB', (fileList) => {
      return fileList.length === 1 && fileList[0].size <= IMAGE_SIZE;
    })
    .test('is-valid-image-type', 'Only png and jpeg files are allowed', (fileList) => {
      const allowedTypes = ['image/jpeg', 'image/png'];
      return fileList.length === 1 && allowedTypes.includes(fileList[0].type);
    }),
  gender: yup.string().required('Field is required'),
  country: yup.string().required('Field is required'),
  tc: yup.boolean().test('is-tc-checked', 'Accept T&C, please', (checked) => !!checked),
});
