import history from '@app/utils/history';
import { useEffect, useState } from 'react';
import { LaunchData } from '.';

export const LAUNCH_PER_PAGE = 6;

function getSearchWithParam(param: string, value: string | number) {
  const urlParams = new URLSearchParams(history.location.search);
  urlParams.set(param, value as string);
  return urlParams.toString();
}

export default function useSortPaginate(launchData: LaunchData) {
  const [launches, setLaunches] = useState<LaunchData>({});
  const dateSort = new URLSearchParams(window.location.search).get('sort') || 'default';
  const page = +(new URLSearchParams(window.location.search).get('page') || 1);

  useEffect(() => {
    if (!launchData?.launches) {
      return;
    }
    const sortedLaunches = launchData.launches.slice();
    switch (dateSort) {
      case 'asc':
        sortedLaunches.sort((a, b) => a.launchDateUnix - b.launchDateUnix);
        break;
      case 'desc':
        sortedLaunches.sort((a, b) => b.launchDateUnix - a.launchDateUnix);
        break;
    }
    const offset = (page - 1) * LAUNCH_PER_PAGE;
    const paginatedLaunches = sortedLaunches.slice(offset, offset + LAUNCH_PER_PAGE);
    setLaunches({ launches: paginatedLaunches });
  }, [launchData]);

  const handleClearSort = () => history.push({ search: getSearchWithParam('sort', 'default') });

  const handleDateSort = (value: string) => {
    history.push({ search: getSearchWithParam('sort', value) });
  };

  const handlePrev = () => {
    history.push({ search: getSearchWithParam('page', page - 1) });
  };

  const handleNext = () => {
    history.push({ search: getSearchWithParam('page', page + 1) });
  };

  return {
    launches,
    dateSort,
    page,
    hasPrevPage: launchData.launches?.length && page !== 1,
    hasNextPage: launchData.launches?.length && page < launchData.launches.length / LAUNCH_PER_PAGE,
    handleClearSort,
    handleDateSort,
    handlePrev,
    handleNext
  };
}
