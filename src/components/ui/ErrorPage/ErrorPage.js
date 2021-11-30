import pt from 'prop-types';

import {errorStatuses} from "src/common/constants";

import {PageDefaultError, Page403, Page500} from "./pages";

const ErrorPageFactory = ({errorStatus}) => {
    switch (errorStatus) {
        case errorStatuses.INTERNAL_SERVER_ERROR:
            return <Page500/>;
        case errorStatuses.PERMISSION_DENIED:
            return <Page403/>;
        default:
            return <PageDefaultError/>;
    }
};

ErrorPageFactory.defaultProps = {
    errorStatus: 500
};

ErrorPageFactory.propTypes = {
    errorStatus: pt.number,
};

export default ErrorPageFactory;