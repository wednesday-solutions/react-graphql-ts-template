import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
import { LaunchData } from '.';

export const LAUNCH_PER_PAGE = 6;

function usePaginate(launchData: LaunchData) {
  const page = +(new URLSearchParams(history.location.search).get('page') || 1);

  const handlePrev = () => setQueryParam('page', page - 1);

  const handleNext = () => setQueryParam('page', page + 1);

  const resetPage = () => setQueryParam('page', 1);
  return {
    page,
    hasPrevPage: launchData.launches?.length && page !== 1,
    hasNextPage: launchData.launches?.length && launchData.launches.length >= LAUNCH_PER_PAGE,
    handlePrev,
    handleNext,
    resetPage
  };
}

export default usePaginate;
