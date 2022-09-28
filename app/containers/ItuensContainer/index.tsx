import React, { ChangeEvent } from 'react';
import { InputSearchBox } from '@app/components/Action';
import { getSearchTerm } from './reducer';
import { useDispatch, connect } from 'react-redux';
import ituneCallSaga from './saga';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
// import { initialState } from './reducer';

// const api = create({ baseURL: 'https://itunes.apple.com' });
const ItunesApiComponent = () => {
  const dispatch = useDispatch();
  const debounce = (func: any) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(context, args);
      }, 500);
    };
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getSearchTerm(e.target.value));
  };

  const debouncedOnChange = React.useCallback(debounce(handleOnChange), []);
  return (
    <div>
      <InputSearchBox onChange={(e) => debouncedOnChange(e)} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

const mapDispatchToProps = (dispatch: (arg0: { type: string }) => void) => {
  console.log('in dispatch');
  // eslint-disable-next-line no-unused-expressions
  (payload: any) => dispatch(getSearchTerm(payload));
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesApiComponent);
