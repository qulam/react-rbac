import {useContext, useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useForm, Controller} from "react-hook-form";
import {
    Grid,
    Card,
    Checkbox,
    TextField,
    CardContent,
    FormControlLabel
} from "@material-ui/core";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

import {queryKeys} from "src/common/queryKeys";
import {Maybe} from "src/common/functions/maybe";
import {AutocompleteCheckbox, FormActions} from "src/components/ui";

import {fetchPermissions, fetchGroups} from "src/views/Group/common/api";
import {UserContext} from "src/views/User/common/context";
import {scheme} from "src/views/User/ui/pages/UserForm/common/constants";

const UserFormBlock = ({...rest}) => {
    const {
        isNewRecord,
        queries: {
            fetchUserDetailQuery
        },
        create: {
            saveUserHandler,
            createUserMutation
        }
    } = useContext(UserContext);
    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: scheme,
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone_number: '',
            date_of_birth: new Date(),
            is_superuser: false,
            is_admin: true,
            status: true,
            groups: [],
            user_permissions: []
        },
    });

    const resetUserForm = () => reset({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        date_of_birth: '',
        is_superuser: false,
        is_admin: true,
        status: true,
        groups: [],
        user_permissions: []
    });

    const [queryParams, setQueryParams] = useState({name: ''});
    const [groupQueryParams, setGroupQueryParams] = useState({name: ''});

    const queryParamsManager = (queryObject) => {
        setQueryParams(prevState => ({...prevState, ...queryObject}));
    };

    const groupQueryParamsManager = (queryObject) => {
        setGroupQueryParams(prevState => ({...prevState, ...queryObject}));
    };

    const fetchPermissionsQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_PERMISSIONS, queryParams],
        queryFn: () => fetchPermissions(queryParams)
    });
    
    const fetchGroupsQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_GROUPS, groupQueryParams],
        queryFn: () => fetchGroups(groupQueryParams)
    })

    const saveForm = (data, operation) => {
        saveUserHandler({requestData: data, operation, reset: resetUserForm});
    };

    useEffect(() => {
        if (!isNewRecord && !!fetchUserDetailQuery.data) {
            const {name, permissions_list} = fetchUserDetailQuery.data;
            reset({
                name,
                permissions: permissions_list
            });
        }
    }, [isNewRecord, fetchUserDetailQuery.data]);

    return (
        <form>
            <Card {...rest}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='first_name'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='first_name'
                                        placeholder='First name'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='last_name'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='last_name'
                                        placeholder='Last name'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.last_name}
                                        helperText={errors.last_name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='email'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='phone_number'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='phone_number'
                                        placeholder='Phone number'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.phone_number}
                                        helperText={errors.phone_number?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='password'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='user_permissions'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <AutocompleteCheckbox
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={Maybe.isNoneOrEmptyList(fetchPermissionsQuery.data?.results)}
                                        isLoading={fetchPermissionsQuery.isLoading}
                                        searchFieldOptions={{
                                            onInputChange: (query) => queryParamsManager({name: query}),
                                            placeholder: 'Permissions',
                                            label: 'Permissions',
                                            error: !!errors.user_permissions,
                                            helperText: errors.user_permissions?.message
                                        }}
                                    />)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='groups'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <AutocompleteCheckbox
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={Maybe.isNoneOrEmptyList(fetchGroupsQuery.data?.results)}
                                        isLoading={fetchGroupsQuery.isLoading}
                                        limitTags={2}
                                        searchFieldOptions={{
                                            onInputChange: (query) => groupQueryParamsManager({name: query}),
                                            placeholder: 'Groups',
                                            label: 'Groups',
                                            error: !!errors.groups,
                                            helperText: errors.groups?.message
                                        }}
                                    />)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='date_of_birth'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            fullWidth
                                            name='date_of_birth'
                                            label="Date of birth"
                                            date={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth {...params}
                                                    error={!!errors.date_of_birth}
                                                    helperText={errors.date_of_birth?.message}
                                                />
                                            )}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                control={control}
                                name='is_superuser'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <FormControlLabel
                                        label="Superuser"
                                        control={(
                                            <Checkbox
                                                color="secondary"
                                                name='is_superuser'
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                checked={value}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                control={control}
                                name='is_admin'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <FormControlLabel
                                        label="Admin"
                                        control={(
                                            <Checkbox
                                                name='is_admin'
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                checked={value}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                control={control}
                                name='status'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <FormControlLabel
                                        label="Status"
                                        control={(
                                            <Checkbox
                                                name='status'
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                checked={value}
                                                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <FormActions
                            handleSubmit={handleSubmit}
                            saveForm={saveForm}
                            isLoading={createUserMutation.isLoading}
                            isNewRecord={isNewRecord}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
};

export default UserFormBlock;