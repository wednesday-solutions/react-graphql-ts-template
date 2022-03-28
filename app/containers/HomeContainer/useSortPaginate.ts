import history from '@app/utils/history';
import { useEffect, useState } from 'react';
import { Launch, LaunchData } from '.';

export const LAUNCH_PER_PAGE = 6;

function setQueryParam(param: string, value: string | number, op: 'set' | 'delete' = 'set') {
  const urlParams = new URLSearchParams(history.location.search);
  urlParams[op](param, value as string);
  history.push({ search: urlParams.toString() });
}
export function sortPaginate(launches: Launch[], dateSort: string, page: number) {
  const sortedLaunches = launches.slice();
  switch (dateSort) {
    case 'asc':
      sortedLaunches.sort((a, b) => a.launchDateUnix - b.launchDateUnix);
      break;
    case 'desc':
      sortedLaunches.sort((a, b) => b.launchDateUnix - a.launchDateUnix);
      break;
  }
  const offset = (page - 1) * LAUNCH_PER_PAGE;
  return sortedLaunches.slice(offset, offset + LAUNCH_PER_PAGE);
}

export default function useSortPaginate(launchData: LaunchData) {
  const [launches, setLaunches] = useState<LaunchData>({});
  const dateSort = new URLSearchParams(history.location.search).get('sort') || 'default';
  const page = +(new URLSearchParams(history.location.search).get('page') || 1);

  const handleClearSort = () => setQueryParam('sort', 'default', 'delete');

  const handleDateSort = (value: string) => setQueryParam('sort', value);

  const handlePrev = () => setQueryParam('page', page - 1);

  const handleNext = () => setQueryParam('page', page + 1);

  const resetPage = () => setQueryParam('page', 1);

  useEffect(() => {
    if (launchData?.launches?.length) {
      const sortPaginatedLaunches = sortPaginate(launchData.launches, dateSort, page);
      if (!sortPaginatedLaunches.length && page !== 1) {
        resetPage();
        return;
      }
      setLaunches({ launches: sortPaginatedLaunches });
    }
  }, [launchData]);

  return {
    launches,
    dateSort,
    page,
    hasPrevPage: launchData.launches?.length && page !== 1,
    hasNextPage: launchData.launches?.length && page < launchData.launches.length / LAUNCH_PER_PAGE,
    handleClearSort,
    handleDateSort,
    handlePrev,
    handleNext,
    resetPage
  };
}
