import { Classes } from '@/types/types.ts';

const useClassesMerge = (...args: Classes[]): Classes => Object.assign({}, ...args);

export default useClassesMerge;
