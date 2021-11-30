import GroupContext from "./GroupContext";
import {useGroup} from "./hooks";

const GroupProvider = ({children}) => {
    const providerProps = useGroup();

    return (
        <GroupContext.Provider value={providerProps}>
            {children}
        </GroupContext.Provider>
    )
};

export default GroupProvider;