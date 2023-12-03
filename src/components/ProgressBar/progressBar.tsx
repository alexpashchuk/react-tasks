import usePasswordStrength from '@/hooks/usePasswordStrength.ts';

import classes from './progressBar.module.css';

type ProgressBarProps = {
  password: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { password, inputRef } = props;
  const passwordRef = inputRef?.current?.value;

  const passwordValue = password || passwordRef;

  const strength = usePasswordStrength(passwordValue);

  return (
    <div className={classes.wrapper}>
      <label htmlFor="progress">Password Strength</label>
      <progress className={classes.progress} id="progress" max="4" defaultValue="0" value={strength} />
    </div>
  );
};

export default ProgressBar;
