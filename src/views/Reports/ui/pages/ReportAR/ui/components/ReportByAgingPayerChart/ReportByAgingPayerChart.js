import {useQuery} from "react-query";
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Tooltip,

} from '@devexpress/dx-react-chart-bootstrap4';
import {Animation, EventTracker,} from '@devexpress/dx-react-chart';
import {makeStyles} from "@material-ui/styles";

import {queryKeys} from "src/common/queryKeys";
import {View} from "src/components/ui";

import {fetchReportARByLocationFlow, fetchReportARByPayerGroupFlow} from "src/views/Reports/common/api";
import {compareByGroupName} from "src/views/Reports/ui/pages/ReportAR/common/functions/tools";

const useStyles = makeStyles({
    root: {
        height: 450,
        paddingTop: 16,
        paddingBottom: 16,
        '& > #center-container': {
            height: '100%',
            padding: 25
        }
    },
});

const ReportByAgingPayerChart = () => {
    const classes = useStyles();

    const fetchReportARByPayerGroupFlowQuery = useQuery({
        queryKey: queryKeys.FETCH_REPORTS_AR_BY_PAYER_GROUP,
        queryFn: fetchReportARByPayerGroupFlow
    });

    const getDataFlow = () => {
        const dataFlow = fetchReportARByPayerGroupFlowQuery.data;
        if (!dataFlow) return [];

        const reportAgeFlow = JSON.parse(dataFlow.results);
        const reportAgeFlowStructured = reportAgeFlow.values.map(reportItem => ({
            ...reportItem,
            value: parseFloat(reportItem.values[0]?.balance) || 0
        }));

        return reportAgeFlowStructured.sort(compareByGroupName);
    }

    return (
        <View isLoading={fetchReportARByPayerGroupFlowQuery.isLoading}>
            <div className="card" style={{paddingRight: 30}}>
                <Chart
                    rotated={true}
                    data={getDataFlow()}
                    className={classes.root}
                >
                    <ArgumentAxis/>
                    <ValueAxis
                        max={7000000}
                    />
                    <BarSeries
                        name="Balance"
                        valueField="value"
                        argumentField="group_name"
                    />
                    <Animation/>
                    <Title text="A/R by Aging Payer Group"/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </div>
        </View>
    );
};

export default ReportByAgingPayerChart;