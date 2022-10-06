import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { media } from '@app/themes';

interface InputSearchBoxProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  searchLabel: string;
}

const InputContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
  }
`;

const CustomLabel = styled.label`
  && {
    display: block;
    font-size: 1.5rem;
  }
`;

const CustomInput = styled(Input)`
  && {
    width: 30%;
    display: block;

    ${media.lessThan('tablet')`
    width: 80%;`}
  }
`;

export const InputSearchBox = ({ onChange, searchLabel = 'Search here', placeholder }: InputSearchBoxProps) => {
  return (
    <InputContainer>
      <CustomLabel>{searchLabel}</CustomLabel>
      <CustomInput onChange={onChange} type="text" placeholder={placeholder} />
    </InputContainer>
  );
};
