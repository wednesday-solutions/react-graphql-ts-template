import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

// const App: React.FC = () =>
interface InputSearchBoxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputContainer = styled.div`
  display: flex;
`;

const CustomInput = styled(Input)`
  width: 30%;
  margin: 1rem auto;
`;

export const InputSearchBox = ({ onChange }: InputSearchBoxProps) => {
  return (
    <InputContainer>
      <CustomInput onChange={onChange} type="text" placeholder="search here" />
    </InputContainer>
  );
};
