/**
 *
 * For
 *
 */

import React, { PropsWithChildren } from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import { Property } from 'csstype';

type FlexContainerProps = {
  orientation?: Property.FlexDirection;
  children?: React.ReactNode;
};

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.orientation};
`;

type ForProps<T> = {
  of?: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  ParentComponent?: React.FC;
  noParent?: boolean;
};

export function For<T>({
  of,
  ParentComponent = <Props,>(props: PropsWithChildren<Props>) => <FlexContainer {...props} />,
  renderItem,
  noParent,
  ...props
}: ForProps<T>) {
  const items = () => of?.map((item, index) => ({ ...renderItem(item, index), key: index }));
  if (noParent) {
    ParentComponent = ({ children }: PropsWithChildren<{}>) => <>{children}</>;
  }
  const list = () => (
    <ParentComponent {...props} data-testid="for">
      {items()}
    </ParentComponent>
  );

  return (of || []).length ? list() : null;
}

For.propTypes = {
  of: Proptypes.array,
  type: Proptypes.node,
  parent: Proptypes.object,
  renderItem: Proptypes.func.isRequired,
  noParent: Proptypes.bool,
  orientation: Proptypes.oneOf(['row', 'column'])
};

For.defaultProps = {
  orientation: 'row'
};
export default For;
