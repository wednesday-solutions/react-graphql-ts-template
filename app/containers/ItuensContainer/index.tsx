import React, { ChangeEvent, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
import { isEmpty } from 'lodash-es';
import { InputSearchBox } from '@app/components/Action';
import { getSearchTerm } from './reducer';
import ituneCallSaga from './saga';
import { selectError, selectLoading, selectDataToShow } from './selector';

const ItunesApiComponent = ({ dispatchArtistName }: any) => {
  const dispatch = useDispatch();
  const artistName = new URLSearchParams(history.location.search).get('artist_name');
  const setArtistName = (artistName: string) => setQueryParam({ param: 'artist_name', value: artistName });

  useEffect(() => {
    dispatchArtistName({ artistName });
  }, []);

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
      setArtistName(artistSearch);
      dispatch(getSearchTerm(e.target.value));
    }
  };

  const debouncedOnChange = React.useCallback(debounce(handleOnChange), []);
  return (
    <div>
      <InputSearchBox onChange={(e) => debouncedOnChange(e)} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  dataToShow: selectDataToShow(),
  error: selectError()
});

const mapDispatchToProps = (dispatch: (arg0: { type: string }) => void) => {
  // eslint-disable-next-line no-unused-expressions
  return {
    dispatchArtistName: (payload: any) => {
      dispatch(getSearchTerm(payload.artistName));
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesApiComponent);
