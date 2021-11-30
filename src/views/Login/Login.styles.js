import {makeStyles} from "@material-ui/styles";

export const useLoginStyles = makeStyles((theme) => ({
    ...theme,
    linkWrapper: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 17
    },
    link: {
        marginLeft: 5,
        alignItems: 'center',
        fontSize: 16,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));