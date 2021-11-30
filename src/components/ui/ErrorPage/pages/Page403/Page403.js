import {Box, Container, Typography} from "@material-ui/core";

import './Page403.css';

import AccessDenied from 'src/assets/images/access-denied.gif';

const Page403 = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h1"
                >
                    403: Forbidden access denied
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="subtitle2"
                >
                    Sorry, you're not allowed in here. Please, contact IT
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        alt="Under development"
                        src={AccessDenied}
                        style={{
                            marginTop: 50,
                            display: 'inline-block',
                            maxWidth: '100%',
                            borderRadius: '5px',
                            width: 560
                        }}
                    />
                </Box>
            </Container>
        </Box>
    )
};

export default Page403;