import {useContext, useState} from 'react';
import {Outlet} from 'react-router-dom';

import {useTokenVerification} from "src/common/context/Auth/hooks";
import {AccessControlContext} from "src/common/context/AccessControl";
import {DashboardNavbar, DashboardSidebar} from 'src/components';
import {View} from 'src/components/ui';

import {
    DashboardLayoutContainer,
    DashboardLayoutWrapper,
    DashboardLayoutContent,
    DashboardLayoutRoot
} from './blocks';

const DashboardLayout = () => {
    const {isAdmin, accessControl} = useContext(AccessControlContext);
    const {isLoading, tokenIsValid} = useTokenVerification();

    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const pageIsLoading = !tokenIsValid || isLoading || accessControl.waitForAccessControl;

    return (
        <View isLoading={pageIsLoading}>
            <DashboardLayoutRoot>
                <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)}/>
                <DashboardSidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                />
                <DashboardLayoutWrapper>
                    <DashboardLayoutContainer>
                        <DashboardLayoutContent>
                            <View isLoading={pageIsLoading} isAllowed={isAdmin()}>
                                <Outlet/>
                            </View>
                        </DashboardLayoutContent>
                    </DashboardLayoutContainer>
                </DashboardLayoutWrapper>
            </DashboardLayoutRoot>
        </View>
    );
};

export default DashboardLayout;
