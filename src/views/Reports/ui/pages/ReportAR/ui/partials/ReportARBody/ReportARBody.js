import {Box, Slide} from "@material-ui/core";

import {View} from "src/components/ui";
import {useReportAR} from "src/views/Reports/common/context/ReportAR/hooks";

import {ReportARToolbar, ReportARResults} from "../../blocks";

const ReportARBody = () => {
    const {queries: {fetchReportARByCountFlowQuery, fetchReportARByBalanceFlowQuery}} = useReportAR();

    return (
        <View>
            <ReportARToolbar
                fetchReportARByCountFlowQuery={fetchReportARByCountFlowQuery}
                fetchReportARByBalanceFlowQuery={fetchReportARByBalanceFlowQuery}
            />
            <Slide direction='up' in={true}>
                <Box sx={{pt: 3}}>
                    <ReportARResults/>
                </Box>
            </Slide>
        </View>
    );
};

export default ReportARBody;