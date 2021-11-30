import {useRoutes} from 'react-router-dom';
import {ThemeProvider, StyledEngineProvider} from '@material-ui/core';

import routes from 'src/routes';
import theme from 'src/common/config/theme';
import {GlobalStyles} from 'src/components';

import 'react-perfect-scrollbar/dist/css/styles.css';

const App = () => {
    const content = useRoutes(routes);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyles/>
                {content}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
