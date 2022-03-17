import styled from 'styled-components';

type StyledContainerProps = {
  maxWidth?: number;
  padding?: number;
};

const StyledContainer = styled.div<StyledContainerProps>`
  max-width: ${(props) => props.maxWidth || 62.5}rem;
  padding: ${(props) => props.maxWidth}rem;
  margin: 1rem auto;
`;

export default StyledContainer;
