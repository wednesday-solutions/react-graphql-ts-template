import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';

export default function useSort() {
  const order = new URLSearchParams(history.location.search).get('order');

  const handleDateSort = (value: string) => setQueryParam('order', value);
  const handleClearSort = () => setQueryParam('order', 'default', 'delete');

  return {
    order,
    handleClearSort,
    handleDateSort
  };
}
