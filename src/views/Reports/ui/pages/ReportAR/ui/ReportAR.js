import {useRBAC} from "src/common/hooks";
import {Body} from "src/views/Reports/ui/partials";
import {ReportARProvider} from "src/views/Reports/common/context/ReportAR";

import {ReportARBody} from "./partials";

const ReportAR = () => {
    const {isLoading: isRBACLoading, isAllowed} = useRBAC({
        permissions: ["*"]
    });

    return (
        <ReportARProvider>
            <Body
                pageTitle='Alliance | A/R Aging Report'
                isLoading={isRBACLoading}
                isAllowed={isAllowed}
            >
                <ReportARBody/>
            </Body>
        </ReportARProvider>
    )
};

export default ReportAR;