import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

interface InputSearchBoxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchLabel: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem auto;
`;

const CustomLabel = styled.label`
  display: block;
  font-size: 1.5rem;
`;

const CustomInput = styled(Input)`
  width: 30%;
  display: block;

  @media (max-width: 320px) {
    width: 80%;
  }
`;

export const InputSearchBox = ({ onChange, searchLabel }: InputSearchBoxProps) => {
  if (searchLabel === '') {
    searchLabel = 'Search here';
  }
  return (
    <InputContainer>
      <CustomLabel>{searchLabel}</CustomLabel>
      <CustomInput onChange={onChange} type="text" placeholder="search here" />
    </InputContainer>
  );
};
