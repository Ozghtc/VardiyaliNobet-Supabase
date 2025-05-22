import { useState, ChangeEvent } from 'react';

export function useCapitalization(initialValue: string = ''): [string, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase for Turkish
    setValue(e.target.value.toUpperCase());
  };

  return [value, handleChange];
}