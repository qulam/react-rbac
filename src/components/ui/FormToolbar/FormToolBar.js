import {Link} from 'react-router-dom';
import pt from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const FormToolBar = ({title, goBackUrl, ...rest}) => (
    <Box {...rest}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Link to={goBackUrl}>
                <Button
                    color='primary'
                    variant='contained'
                >
                    Go Back
                </Button>
            </Link>
        </Box>
        <Box sx={{mt: 3}}>
            <Card>
                <CardContent>
                    <Box sx={{maxWidth: 500}}>
                        <Typography variant='h3'>{title}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
);

FormToolBar.defaultProps = {
    title: 'Change me [title]!',
    goBackUrl: '/'
}

FormToolBar.propTypes = {
    title: pt.string.isRequired,
    goBackUrl: pt.string.isRequired,
};

export default FormToolBar;