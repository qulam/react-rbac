import {useQuery} from "react-query";

import {queryKeys} from "src/common/queryKeys";

import {fetchReportARByBalance, fetchReportARByCount} from "src/views/Reports/common/api";

const useReportAR = () => {
    const fetchReportARByCountFlowQuery = useQuery({
        queryKey: queryKeys,
        queryFn: fetchReportARByCount
    });

    const fetchReportARByBalanceFlowQuery = useQuery({
        queryKey: queryKeys.FETCH_REPORTS_AR_BY_BALANCE,
        queryFn: fetchReportARByBalance
    });

    return {
        queries: {
            fetchReportARByCountFlowQuery,
            fetchReportARByBalanceFlowQuery
        }
    }
};

export default useReportAR;