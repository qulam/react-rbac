import UserContext from "./UserContext";
import {useUser} from "./hooks";

const UserProvider = ({children}) => {
    const providerProps = useUser();

    return (
        <UserContext.Provider value={providerProps}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;