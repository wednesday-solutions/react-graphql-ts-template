import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const SumComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<AxiosResponse | {}>({});
  const [searchItem, setSearchItem] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.currentTarget.value);
  };

  const handleApiCall = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `https://itunes.apple.com/search?term=${searchItem}`,
        withCredentials: false
      });
      setData(res);
    } catch (error) {
      //   console.log(error)
    }
    setSearchItem('');
  };

  console.log(data);

  return (
    <div>
      <input onChange={handleOnChange} value={searchItem} />
      <button onClick={handleApiCall}>Submit Data</button>
    </div>
  );
};

export default SumComponent;
