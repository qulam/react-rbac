import pt from 'prop-types';
import {Helmet} from "react-helmet";
import {Box, Container} from '@material-ui/core';

import {View} from 'src/components/ui';
import {PermissionProvider} from "src/views/Permission/common/context";

const Body = ({children, pageTitle, isLoading, isAllowed}) => {
    return (
        <View isLoading={isLoading} isAllowed={isAllowed}>
            <PermissionProvider>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>
                <Box sx={{backgroundColor: 'background.default', minHeight: '100%', py: 3}}>
                    <Container maxWidth={false}>
                        {children}
                    </Container>
                </Box>
            </PermissionProvider>
        </View>
    )
};

Body.propTypes = {
    pageTitle: pt.string.isRequired,
    isLoading: pt.bool.isRequired,
    isAllowed: pt.bool.isRequired
};

export default Body;