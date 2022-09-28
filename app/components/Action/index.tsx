import React from 'react';

// const api = create({ baseURL: 'https://itunes.apple.com' });
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
