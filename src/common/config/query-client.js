import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: false,
        }
    }
});

export default queryClient;