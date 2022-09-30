import React from 'react';

interface InputSearchBoxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputSearchBox = ({ onChange }: InputSearchBoxProps) => {
  return (
    <div>
      <input onChange={onChange} type="text" />
    </div>
  );
};
