import {styled} from "@material-ui/core/styles";

const DashboardLayoutWrapper = styled('div')(
    ({theme}) => ({
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    })
);

export default DashboardLayoutWrapper;