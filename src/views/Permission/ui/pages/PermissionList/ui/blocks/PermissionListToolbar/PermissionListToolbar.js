import {useState, useContext} from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';

import {useDebounce, useDidMountEffect} from "src/common/hooks";
import {PermissionContext} from "src/views/Permission/common/context";

const PermissionListToolbar = (props) => {
    const {helpers: {queryParams, queryParamsManager},} = useContext(PermissionContext);
    const [query, setQuery] = useState(queryParams.name || '');
    const debouncedQuery = useDebounce(query)

    useDidMountEffect(() => {
        queryParamsManager({name: debouncedQuery});
    }, [debouncedQuery]);

    return (
        <Box {...props}>
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
                                placeholder="Search permission"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default PermissionListToolbar;