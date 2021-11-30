import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';

import {privateRoutes} from "src/common/mainRoutes";
import {useDebounce, useDidMountEffect} from "src/common/hooks";
import {GroupContext} from "src/views/Group/common/context";
import {Can} from "src/common/context/AccessControl/components";
import {permissions} from "src/common/context/AccessControl/authorization";

const GroupListToolbar = (props) => {
    const {helpers: {queryParams, queryParamsManager},} = useContext(GroupContext);
    const [query, setQuery] = useState(queryParams.name || '');
    const debouncedQuery = useDebounce(query)

    useDidMountEffect(() => {
        queryParamsManager({name: debouncedQuery});
    }, [debouncedQuery]);

    return (
        <Box {...props}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Can permissions={[permissions.add_group]}>
                    <Link to={privateRoutes.AUTHORIZATION_GROUP_FORM}>
                        <Button color="primary" variant="contained">
                            Add group
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
                                        <InputAdornment position="start">
                                            <SvgIcon fontSize="small" color="action">
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
    );
}

export default GroupListToolbar;