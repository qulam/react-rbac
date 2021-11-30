import { Helmet } from 'react-helmet';

import {Page403} from "src/components/ui/ErrorPage/pages";

const NotFound = () => (
    <>
        <Helmet>
            <title>403 | Access Denied</title>
        </Helmet>
        <Page403 />
    </>
);

export default NotFound;