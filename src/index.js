import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {QueryClientProvider} from "react-query";
import {SnackbarProvider} from 'notistack';

import {snackBarProviderConfig} from "src/common/constants";
import queryClient from "src/common/config/query-client";
import {AuthProvider} from "src/common/context/Auth"
import {AccessControlProvider} from "src/common/context/AccessControl"

import App from './App';

ReactDOM.render(
    (
        <Router>
            <SnackbarProvider {...snackBarProviderConfig}>
                <QueryClientProvider client={queryClient}>
                    <AccessControlProvider>
                        <AuthProvider>
                            <App/>
                        </AuthProvider>
                    </AccessControlProvider>
                </QueryClientProvider>
            </SnackbarProvider>
        </Router>
    ),
    document.getElementById('root')
);
