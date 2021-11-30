import {AccessControlContext} from "./index";
import {useAccessControl} from "./hooks";

const AccessControlProvider = ({children}) => {
    const providerProps = useAccessControl();

    return (
        <AccessControlContext.Provider value={providerProps}>
            {children}
        </AccessControlContext.Provider>
    )
};

export default AccessControlProvider;