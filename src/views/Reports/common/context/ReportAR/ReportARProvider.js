import ReportARContext from "./ReportARContext";
import {useReportAR} from "./hooks";

const ReportARProvider = ({children}) => {
    const providerProps = useReportAR();

    return (
        <ReportARContext.Provider value={providerProps}>
            {children}
        </ReportARContext.Provider>
    )
};

export default ReportARProvider;