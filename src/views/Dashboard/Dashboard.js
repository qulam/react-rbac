import {Helmet} from 'react-helmet';
import {Box, Container, Grid} from '@material-ui/core';

import {
    TrafficByDevice,
    Sales,
    TotalProfit,
    TotalCustomers,
    TasksProgress,
    LatestProducts,
    LatestOrders,
    Budget
} from 'src/components';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard | Alliance</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalCustomers/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TasksProgress/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalProfit sx={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <Sales/>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <TrafficByDevice sx={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <LatestProducts sx={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <LatestOrders/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Dashboard;
