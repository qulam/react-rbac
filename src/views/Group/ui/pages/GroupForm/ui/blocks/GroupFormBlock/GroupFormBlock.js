import {useContext, useState, useEffect} from "react";
import {useQuery} from "react-query";
import {useForm, Controller} from "react-hook-form";
import {
    Card,
    CardContent,
    Grid,
    TextField
} from "@material-ui/core";

import {queryKeys} from "src/common/queryKeys";
import {Maybe} from "src/common/functions/maybe";
import {AutocompleteCheckbox, FormActions} from "src/components/ui";

import {fetchPermissions} from "src/views/Group/common/api";
import {GroupContext} from "src/views/Group/common/context";
import {scheme} from "src/views/Group/ui/pages/GroupForm/common/constants";

const GroupFormBlock = ({...rest}) => {
    const {
        isNewRecord,
        queries: {
            fetchGroupDetailQuery
        },
        create: {
            saveGroupHandler,
            createGroupMutation
        }
    } = useContext(GroupContext);
    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: scheme,
        defaultValues: {
            name: '',
            permissions: []
        },
    });

    const resetGroupForm = () => reset({
        name: '',
        permissions: [],
    });

    const [queryParams, setQueryParams] = useState({name: ''});

    const queryParamsManage = (queryObject) => {
        setQueryParams(prevState => ({...prevState, ...queryObject}));
    };

    const fetchPermissionsQuery = useQuery({
        queryKey: [queryKeys.AUTHORIZATION_PERMISSIONS, queryParams],
        queryFn: () => fetchPermissions(queryParams)
    });

    const saveForm = (data, operation) => {
        saveGroupHandler({requestData: data, operation, reset: resetGroupForm});
    };

    useEffect(() => {
        if (!isNewRecord && !!fetchGroupDetailQuery.data) {
            const {name, permissions_list} = fetchGroupDetailQuery.data;
            reset({
                name,
                permissions: permissions_list
            });
        }
    }, [isNewRecord, fetchGroupDetailQuery.data]);

    return (
        <form>
            <Card {...rest}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='name'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextField
                                        fullWidth
                                        name='name'
                                        placeholder='Group name'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                control={control}
                                name='permissions'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <AutocompleteCheckbox
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        options={Maybe.isNoneOrEmptyList(fetchPermissionsQuery.data?.results)}
                                        isLoading={fetchPermissionsQuery.isLoading}
                                        searchFieldOptions={{
                                            onInputChange: (query) => queryParamsManage({name: query}),
                                            placeholder: 'Permissions',
                                            label: 'Permissions',
                                            error: !!errors.permissions,
                                            helperText: errors.permissions?.message
                                        }}
                                    />)}
                            />
                        </Grid>
                        <FormActions
                            handleSubmit={handleSubmit}
                            saveForm={saveForm}
                            isLoading={createGroupMutation.isLoading}
                            isNewRecord={isNewRecord}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
};

export default GroupFormBlock;