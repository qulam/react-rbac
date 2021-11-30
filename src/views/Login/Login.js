import {useContext} from "react";
import {Link as RouterLink, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {
    Box,
    Container,
    Link,
    TextField,
    Typography
} from '@material-ui/core';

import {privateRoutes, publicRoutes} from "src/common/mainRoutes";
import {AuthContext} from "src/common/context/Auth";
import {ButtonLoader, View} from 'src/components/ui';

import {stateCreator} from './common/data';
import {schema} from './common/constants';

import {useLoginStyles} from "./Login.styles";

const Login = () => {
    const classes = useLoginStyles();
    const {login, auth} = useContext(AuthContext);

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: stateCreator.createEmptyForm()
    });

    if (auth.isAuthenticated && !!auth.access && !!auth.refresh) {
        return <Navigate to={privateRoutes.DASHBOARD}/>;
    }

    return (
        <View isLoading={false}>
            <Helmet>
                <title>Login | Alliance</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth='sm'>
                    <form onSubmit={handleSubmit(data => login.execute(data))}>
                        <Box sx={{mb: 3}}>
                            <Typography
                                color='textPrimary'
                                variant='h2'
                            >
                                Sign in
                            </Typography>
                            <Typography
                                color='textSecondary'
                                gutterBottom
                                variant='body2'
                            >
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Controller
                            control={control}
                            name='email'
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextField
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    label='Email Address'
                                    margin='normal'
                                    name='email'
                                    type='email'
                                    variant='outlined'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='password'
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextField
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    fullWidth
                                    label='Password'
                                    margin='normal'
                                    name='password'
                                    type='password'
                                    variant='outlined'
                                />
                            )}
                        />
                        <Box sx={{py: 2}}>
                            <ButtonLoader
                                color='primary'
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                                isLoading={login.mutation.isLoading}
                                isDisabled={login.mutation.isLoading}
                            >
                                Sign in now
                            </ButtonLoader>
                        </Box>
                        <Typography
                            color='textSecondary'
                            variant='body1'
                            className={classes.linkWrapper}
                        >
                            Don&apos;t have an account?
                            {' '}
                            <Link
                                className={classes.link}
                                component={RouterLink}
                                to={publicRoutes.REGISTER}
                                variant='h6'
                            >
                                Register
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </View>
    );
};

export default Login;