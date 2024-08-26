import useSwr from 'swr'
import fetcher from '@/libs/fetcher';

const useOffices = () => {
  const { data, error, isLoading } = useSwr('/api/offices', fetcher, {
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

export default useOffices;
