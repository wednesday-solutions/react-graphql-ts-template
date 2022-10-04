import React, { ChangeEvent } from 'react';
import { InputSearchBox } from '@app/components/Action';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash-es';
import LoadAbleCard from '@app/components/Card';
import { selectError, selectLoading, selectDataToShow } from './selector';
import { getSearchTerm, deleteResponse } from './reducer';
import ituneCallSaga from './saga';

const ItunesContainer = ({ dispatchArtistName, dataToShow }: any) => {
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
    const artistSearch = e.target.value;
    if (!isEmpty(artistSearch)) {
      dispatchArtistName(artistSearch);
    } else {
      dispatch(deleteResponse());
    }
  };

  const debouncedOnChange = React.useCallback(debounce(handleOnChange), []);
  console.log(dataToShow);
  return (
    <div>
      <InputSearchBox onChange={(e) => debouncedOnChange(e)} />
      <LoadAbleCard dataToShow={dataToShow} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  dataToShow: selectDataToShow(),
  error: selectError()
});

export function mapDispatchToProps(dispatch: (arg0: { type: string }) => void) {
  // eslint-disable-next-line no-unused-expressions
  return {
    dispatchArtistName: (payload: any) => {
      dispatch(getSearchTerm(payload));
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);
