import {makeStyles} from "@material-ui/styles";

export const useRegisterStyles = makeStyles((theme) => ({
    ...theme,
    linkWrapper: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 17
    },
    link: {
        marginLeft: 5,
        alignItems: 'center',
        fontSize: 16
    }
}));