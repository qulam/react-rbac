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

import {fetchReportARFlow} from "src/views/Reports/common/api";
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

const AgingSummaryChart = () => {
    const classes = useStyles();

    const fetchReportARFlowQuery = useQuery({
        queryKey: queryKeys.FETCH_REPORTS_AR,
        queryFn: fetchReportARFlow
    });

    const getDataFlow = () => {
        const dataFlow = fetchReportARFlowQuery.data;
        if (!dataFlow) return [];

        const reportAgeFlow = JSON.parse(dataFlow.results);
        const reportAgeFlowStructured = reportAgeFlow.values.map(reportItem => ({
            ...reportItem,
            value: parseFloat(reportItem.values[0]?.balance) || 0
        }));

        return reportAgeFlowStructured.sort(compareByGroupName);
    }

    return (
        <View isLoading={fetchReportARFlowQuery.isLoading}>
            <div className="card">
                <Chart
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
                    <Title text="A/R Aging Report - Aging Summary"/>
                    <EventTracker/>
                    <Tooltip/>
                </Chart>
            </div>
        </View>
    );
};

export default AgingSummaryChart;