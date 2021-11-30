import {useState} from "react";
import {Box, Button, ButtonGroup, Card, Divider} from "@material-ui/core";

import {ARReportTypes} from "src/views/Reports/common/constants";

import {ReportARResultsFactory} from "../../components";

const ReportARResults = (props) => {
    const [reportType, setReportType] = useState(ARReportTypes.AGING_SUMMARY);

    const variantActive = (rt) => reportType === rt ? 'contained' : 'outlined';

    return (
        <Card {...props}>
            <Box sx={{minWidth: 1050, display: 'flex', justifyContent: 'center', padding: '15px'}}>
                <ButtonGroup variant="outlined" aria-label="report-ar-button-groups">
                    <Button
                        variant={variantActive(ARReportTypes.AGING_SUMMARY)}
                        onClick={() => setReportType(ARReportTypes.AGING_SUMMARY)}
                    >
                        Aging Summary
                    </Button>
                    <Button
                        variant={variantActive(ARReportTypes.BY_LOCATION)}
                        onClick={() => setReportType(ARReportTypes.BY_LOCATION)}
                    >
                        A/R by Location
                    </Button>
                    <Button
                        variant={variantActive(ARReportTypes.BY_AGING_PAYER_GROUP)}
                        onClick={() => setReportType(ARReportTypes.BY_AGING_PAYER_GROUP)}
                    >
                        A/R by Aging Payer Group
                    </Button>
                </ButtonGroup>
            </Box>
            <Divider/>
            <Box sx={{minWidth: 1050}}>
                <ReportARResultsFactory reportType={reportType}/>
            </Box>
        </Card>
    )
};

export default ReportARResults;