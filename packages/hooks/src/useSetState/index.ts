import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

const useSetState = <T extends Record<string, any>>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  return [state, setMergeState];
};

export default useSetState;
