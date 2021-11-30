import {Helmet} from 'react-helmet';
import {Box, Container} from '@material-ui/core';
import {CustomerListResults, CustomerListToolbar} from 'src/components';

import {useRBAC} from "src/common/hooks";
import {permissions} from "src/common/context/AccessControl/authorization";
import {View} from "src/components/ui";

import customers from '../../__mocks__/customers';

const CustomerList = () => {
    const {isLoading: isRBACLoading} = useRBAC({
        permissions: [permissions.view_user]
    });

    return (
        <View isLoading={isRBACLoading}>
            <Helmet>
                <title>Customers | Alliance</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <CustomerListToolbar/>
                    <Box sx={{pt: 3}}>
                        <CustomerListResults customers={customers}/>
                    </Box>
                </Container>
            </Box>
        </View>
    );
}

export default CustomerList;
