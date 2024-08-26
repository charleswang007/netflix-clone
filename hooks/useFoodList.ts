import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useFoods = () => {
  const { data, error, isLoading } = useSwr('/api/foods', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useFoods;
