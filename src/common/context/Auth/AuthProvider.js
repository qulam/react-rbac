import AuthContext from "./AuthContext";
import {useAuth} from "./hooks";

const AuthProvider = ({children}) => {
    const providerProps = useAuth();

    return (
        <AuthContext.Provider value={providerProps}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;