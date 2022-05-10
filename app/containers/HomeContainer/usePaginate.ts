import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';
import { LaunchData } from './types';

export const LAUNCH_PER_PAGE = 6;

function usePaginate(launchData: LaunchData) {
  const pageQp = Number(new URLSearchParams(history.location.search).get('page'));
  const page = Number.isNaN(pageQp) || pageQp < 1 ? 1 : pageQp;

  const handlePrev = () => setQueryParam({ param: 'page', value: page - 1 });
  const handleNext = () => setQueryParam({ param: 'page', value: page + 1 });
  const resetPage = () => setQueryParam({ param: 'page', value: 1 });

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
