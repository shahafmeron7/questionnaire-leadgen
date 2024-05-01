import { useEffect } from 'react';

export const useLocalStorage = (state, key) => {
  useEffect(() => {
    const serializedState = JSON.stringify(state);
    console.log(serializedState)
    localStorage.setItem(key, serializedState);
  }, [state, key]);
};
