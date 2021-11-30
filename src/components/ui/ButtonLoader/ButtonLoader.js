import pt from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    textWrapper: {
        marginRight: '15px'
    },
    root: {
        marginRight: '7px !important'
    },
});

const ButtonLoader = ({ children, isLoading, isDisabled, ...rest }) => {
    const classes = useStyles();

    return (
        <Button className={classes.root} disabled={isLoading || isDisabled} {...rest}>
            <span className={classes.textWrapper}>{children}</span>
            {
                isLoading && <CircularProgress size={18} />
            }
        </Button>
    );
};

ButtonLoader.defaultProps = {
    isLoading: false
};

ButtonLoader.propTypes = {
    isLoading: pt.bool
};

export default ButtonLoader;