import React from 'react';

interface Props {
  value: string | number;
  name: string;
  defaultValue: number | null;
}

export default function CustomRadio({ value, name, defaultValue }: Props) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        data-radio-name={name}
        defaultChecked={defaultValue === value}
      />
      {value}
    </label>
  );
}
