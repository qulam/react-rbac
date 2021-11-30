import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {Maybe} from "src/common/functions/maybe";
import {When} from "src/components/ui";

const useStyles = makeStyles({
    loader: {
        width: 18,
        height: 18,
        marginLeft: 18,
        marginTop: 2
    }
});

const ProgressLoader = () => {
    const classes = useStyles();
    return <CircularProgress className={classes.loader} size={18}/>;
};

const ReportARToolbar = ({fetchReportARByCountFlowQuery, fetchReportARByBalanceFlowQuery, ...rest}) => {

    const reportByCountResults = JSON.parse(Maybe.isJsonOrNone(fetchReportARByCountFlowQuery?.data?.results));
    const reportByBalanceResults = JSON.parse(Maybe.isJsonOrNone(fetchReportARByBalanceFlowQuery?.data?.results));

    return (
        <Box {...rest}>
            <Box sx={{mt: 3}}>
                <Card>
                    <CardContent>
                        <Box sx={{maxWidth: 500}}>
                            <Typography variant='h2'>A/R Aging Report</Typography>
                        </Box>
                        <Divider style={{marginTop: '15px'}}/>
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: '15px'
                        }}>
                            <Box sx={{minWidth: 145}}>
                                <Typography style={{fontSize: '14px'}}>#Claims</Typography>
                                <Typography variant='h4'>
                                    <When condition={!fetchReportARByCountFlowQuery.isLoading}>
                                        {reportByCountResults?.values[0]?.count || 0}
                                    </When>
                                    <When condition={fetchReportARByCountFlowQuery.isLoading}>
                                        <ProgressLoader />
                                    </When>
                                </Typography>
                            </Box>
                            <Box sx={{minWidth: 145}}>
                                <Typography style={{fontSize: '14px'}}>#Total A/R</Typography>
                                <Typography variant='h4'>
                                    <When condition={!fetchReportARByBalanceFlowQuery.isLoading}>
                                        ${reportByBalanceResults?.values[0]?.balance || 0}
                                    </When>
                                    <When condition={fetchReportARByBalanceFlowQuery.isLoading}>
                                        <ProgressLoader />
                                    </When>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )

};

export default ReportARToolbar;