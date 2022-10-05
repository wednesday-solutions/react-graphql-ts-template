import React, { ChangeEvent } from 'react';
import debounce from 'lodash-es/debounce';
import { InputSearchBox } from '@app/components/InputSearchBox';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
import LoadAbleCard from '@app/components/ItuneCard';
import { selectError, selectLoading, selectDataToShow } from './selector';
import { requestGetSongList } from './reducer';
import ituneCallSaga from './saga';

const ItunesContainer = ({ dispatchArtistName, songData }: any) => {
  console.log(songData, 'in ItuneContainer');
  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const artistSearch = e.target.value;
    if (artistSearch.trim()) {
      console.log(artistSearch);
      dispatchArtistName(artistSearch);
    }
  }, 500);

  return (
    <div>
      <InputSearchBox onChange={(e) => handleOnChange(e)} searchLabel={'Search your favourite singer'} />
      <LoadAbleCard songData={songData} cardTitle={'Artist Name'} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songData: selectDataToShow(),
  error: selectError()
});

export function mapDispatchToProps(dispatch: (arg0: { type: string }) => void) {
  return {
    dispatchArtistName: (payload: string) => {
      dispatch(requestGetSongList(payload));
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);
