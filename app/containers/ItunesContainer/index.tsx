import React, { ChangeEvent } from 'react';
import debounce from 'lodash-es/debounce';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { compose } from '@reduxjs/toolkit';
import { selectSongListError, selectLoading, selectSongData } from './selector';
import { requestGetSongList } from './reducer';
import ituneCallSaga from './saga';
import { ItuneContainerProps } from './types';
import ItuneSongList from '@app/components/ItuneSongList';
import styled from 'styled-components';
import { Input } from 'antd';
import { media } from '@app/themes';
import { ErrorHandler, T } from '@app/components';

const InputContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
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

const ItunesContainer = ({ dispatchArtistName, songData, loading, songListError }: ItuneContainerProps) => {
  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const artistSearch = e.target.value;
    if (artistSearch.trim()) {
      dispatchArtistName(artistSearch);
    }
  }, 500);

  return (
    <div>
      <InputContainer>
        <T data-testid="search-label" id="song_search_default" />
        <CustomInput data-testid="search-bar" onChange={(e) => handleOnChange(e)} type="text" />
      </InputContainer>
      <ItuneSongList songData={songData} />
      <ErrorHandler loading={loading} launchListError={songListError} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songData: selectSongData(),
  songListError: selectSongListError()
});

export function mapDispatchToProps(dispatch: (arg0: { type: string }) => void) {
  return {
    dispatchArtistName: (payload: string) => dispatch(requestGetSongList(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);
