import React, { useState } from 'react';
import { create, ApisauceInstance } from 'apisauce';

const api = create({ baseURL: 'https://itunes.apple.com' });

const ItunesApiComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<ApisauceInstance | {}>({});
  const [searchItem, setSearchItem] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.currentTarget.value);
  };

  const handleApiCall = async () => {
    try {
      const res = await api.any({ method: 'GET', url: `/search?term=${searchItem}` });
      setData(res);
    } catch (error) {
      console.log(error);
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

export default ItunesApiComponent;
