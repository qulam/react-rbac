import pt from 'prop-types';

import {errorStatuses} from "src/common/constants";
import { Loader, ErrorPage } from 'src/components/ui';

const View = ({ isLoading, isAllowed, children }) => {
    if (isLoading) return <Loader />;

    if(!isAllowed) return <ErrorPage errorStatus={errorStatuses.PERMISSION_DENIED} />

    return children;
};

View.defaultProps = {
    isLoading: false,
    isAllowed: true,
};

View.propTypes = {
    isLoading: pt.bool,
    isAllowed: pt.bool,
    children: pt.oneOfType([
        pt.arrayOf(pt.node),
        pt.node
    ]).isRequired
};

export default View;