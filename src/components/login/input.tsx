import React, { ReactElement } from "react";

interface Props {
  name: string;
  type: string;
  value: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onFocus?: () => any;
  onBlur?: () => any;
}

function Input({
  name,
  type,
  value,
  id,
  onChange,
  onBlur,
  onFocus,
}: Props): ReactElement {
  return (
    <div className="flex flex-col items-start mb-8">
      <label htmlFor={id} className="text-cyan p-2 text-lg font-bold pl-0">
        {name}:{" "}
      </label>
      <input
        className="p-2 w-full rounded-sm fix-focus"
        type={type}
        placeholder={name}
        value={value}
        id={id}
        onChange={(e) => onChange(e)}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
      />
      <p className="pt-0 w-0 h-[4px]"></p>
    </div>
  );
}

export default Input;
