import {ARReportTypes} from "src/views/Reports/common/constants";

import {
    AgingSummaryChart,
    ReportByAgingPayerChart,
    ReportByLocationChart
} from "src/views/Reports/ui/pages/ReportAR/ui/components/index";

const ReportARResultsFactory = ({reportType}) => {
    switch (reportType) {
        case ARReportTypes.AGING_SUMMARY:
            return <AgingSummaryChart/>;
        case ARReportTypes.BY_LOCATION:
            return <ReportByLocationChart/>;
        case ARReportTypes.BY_AGING_PAYER_GROUP:
            return <ReportByAgingPayerChart />;
        default:
            return null;
    }
};

export default ReportARResultsFactory;