import React from 'react';

interface Props {
  value: string | number;
  name: string;
  defaultValue: number | null;
  clickEvent: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function CustomRadio({
  value,
  name,
  defaultValue,
  clickEvent,
}: Props) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        data-radio-name={name}
        defaultChecked={defaultValue === value}
        onClick={(e) => clickEvent(e)}
      />
      {value}
    </label>
  );
}
