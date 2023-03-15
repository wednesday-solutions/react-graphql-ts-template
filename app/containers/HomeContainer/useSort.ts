import { setQueryParam } from '@app/utils';
import history from '@app/utils/history';

export default function useSort() {
  const orderQp = new URLSearchParams(history.location.search).get('order');
  const order = [null, 'asc', 'desc'].includes(orderQp) ? orderQp : null;

  const handleDateSort = (value: any) => setQueryParam({ param: 'order', value: value.target.value });
  const handleClearSort = () => setQueryParam({ param: 'order', deleteParam: true });

  return {
    order,
    handleClearSort,
    handleDateSort
  };
}
