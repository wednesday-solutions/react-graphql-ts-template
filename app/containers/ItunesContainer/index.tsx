import React, { ChangeEvent } from 'react';
import debounce from 'lodash-es/debounce';
import { InputSearchBox } from '@app/components/InputSearchBox';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
import { selectSongListError, selectLoading, selectSongData } from './selector';
import { requestGetSongList } from './reducer';
import ituneCallSaga from './saga';
import { ItuneContainerProps } from './types';
import ItuneSongList from '@app/components/ItuneSongList';

const ItunesContainer = ({ dispatchArtistName, songData }: ItuneContainerProps) => {
  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const artistSearch = e.target.value;
    if (artistSearch.trim()) {
      dispatchArtistName(artistSearch);
    }
  }, 500);

  return (
    <div>
      <InputSearchBox
        onChange={(e) => handleOnChange(e)}
        searchLabel={'Search your favourite singer'}
        placeholder={'search here'}
      />
      <ItuneSongList songData={songData} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songData: selectSongData(),
  error: selectSongListError()
});

export function mapDispatchToProps(dispatch: (arg0: { type: string }) => void) {
  return {
    dispatchArtistName: (payload: string) => dispatch(requestGetSongList(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);
