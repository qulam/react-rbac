import {useContext, useState} from "react";
import {Link as RouterLink, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Box,
    Container,
    Link,
    TextField,
    Typography,
    InputAdornment, IconButton
} from '@material-ui/core';

import {AuthContext} from "src/common/context/Auth";
import {privateRoutes, publicRoutes} from "src/common/mainRoutes";
import {ButtonLoader, View} from "src/components/ui";

import {stateCreator} from './common/data';
import {schema} from './common/constants';
import {useRegisterStyles} from "./Register.styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Register = () => {
    const classes = useRegisterStyles();
    const {auth, register} = useContext(AuthContext);

    const {handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: stateCreator.createEmptyForm()
    });

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    if (auth.isAuthenticated && !!auth.access && !!auth.refresh) {
        return <Navigate to={privateRoutes.DASHBOARD}/>;
    }

    return (
        <View isLoading={false}>
            <Helmet>
                <title>Register | Alliance</title>
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
                <Container maxWidth="sm">
                    <form onSubmit={handleSubmit(data => register.execute(data))}>
                        <Box sx={{mb: 3}}>
                            <Typography
                                color="textPrimary"
                                variant="h2"
                            >
                                Create new account
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use your email to create new account
                            </Typography>
                        </Box>
                        <Controller
                            control={control}
                            name='first_name'
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextField
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                    fullWidth
                                    label="First name"
                                    margin="normal"
                                    name="first_name"
                                    variant="outlined"
                                />)}
                        />
                        <Controller
                            control={control}
                            name='last_name'
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextField
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                    fullWidth
                                    label="Last name"
                                    margin="normal"
                                    name="last_name"
                                    variant="outlined"
                                />
                            )}
                        />
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
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    variant="outlined"
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
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    type={passwordIsVisible ? 'text' : 'password'}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visible"
                                                    onClick={() => setPasswordIsVisible(true)}
                                                    onMouseDown={() => setPasswordIsVisible(false)}
                                                    edge="end"
                                                >
                                                    {passwordIsVisible ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
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
                                isLoading={register.mutation.isLoading}
                                isDisabled={register.mutation.isLoading}
                            >
                                Register now
                            </ButtonLoader>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                            className={classes.linkWrapper}
                        >
                            Got have an account?
                            {' '}
                            <Link
                                className={classes.link}
                                variant="h6"
                                underline="hover"
                                component={RouterLink}
                                to={publicRoutes.LOGIN}
                            >
                                Log in
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </View>
    );
};

export default Register;
