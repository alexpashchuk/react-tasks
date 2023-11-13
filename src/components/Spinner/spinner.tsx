import classes from './spinner.module.css';

const Spinner = ({ dataTest }: { dataTest?: string }) => {
  return <div data-testid={dataTest || ''} className={classes.loader}></div>;
};

export default Spinner;
