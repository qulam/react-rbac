import {useState, useContext} from "react";
import {Link} from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from "@material-ui/core";
import {Search as SearchIcon} from 'react-feather';

import {privateRoutes} from "src/common/mainRoutes";
import {useDebounce, useDidMountEffect} from "src/common/hooks";
import {UserContext} from "src/views/User/common/context";
import {Can} from 'src/common/context/AccessControl/components';
import {permissions} from "src/common/context/AccessControl/authorization";

const UserListToolbar = (props) => {
    const {helpers: {queryParams, queryParamsManager}} = useContext(UserContext);
    const [query, setQuery] = useState(queryParams.first_name || '');
    const debouncedQuery = useDebounce(query);

    useDidMountEffect(() => {
        queryParamsManager({first_name: debouncedQuery});
    }, [debouncedQuery]);

    return (
        <Box {...props}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Can permissions={[permissions.add_user]}>
                    <Link to={privateRoutes.USER_FORM}>
                        <Button color='primary' variant='contained'>
                            Add user
                        </Button>
                    </Link>
                </Can>
            </Box>
            <Box sx={{mt: 3}}>
                <Card>
                    <CardContent>
                        <Box sx={{maxWidth: 500}}>
                            <TextField
                                fullWidth
                                name='name'
                                value={query}
                                onChange={({target}) => setQuery(target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SvgIcon fontSize='small' color='action'>
                                                <SearchIcon/>
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Search group"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )

};

export default UserListToolbar;