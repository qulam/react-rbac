import PermissionContext from "./PermissionContext";
import {usePermission} from "./hooks";

const PermissionProvider = ({children}) => {
    const providerProps = usePermission();

    return (
        <PermissionContext.Provider value={providerProps}>
            {children}
        </PermissionContext.Provider>
    )
};

export default PermissionProvider;