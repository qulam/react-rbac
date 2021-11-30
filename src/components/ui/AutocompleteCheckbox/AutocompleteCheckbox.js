import {useState} from "react";
import pt from 'prop-types';

import {Autocomplete, Checkbox, CircularProgress, TextField} from "@material-ui/core";

import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';

import {useDebounce, useDidMountEffect} from "src/common/hooks";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;

const AutocompleteCheckbox = ({options, isLoading, searchFieldOptions, onChange, ...rest}) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query);

    const {onInputChange, label, placeholder, error, helperText} = searchFieldOptions;

    useDidMountEffect(() => {
        onInputChange(debouncedQuery);
    }, [debouncedQuery]);

    return (
        <Autocomplete
            limitTags={3}
            {...rest}
            loading={isLoading}
            loadingText='Loading...'
            fullWidth
            multiple
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            filterOptions={options => options}
            onChange={(e, T) => onChange(T)}
            onInputChange={(event, value) => setQuery(value)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, {selected}) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    fullWidth {...params}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
};

AutocompleteCheckbox.propTypes = {
    options: pt.array.isRequired,
    isLoading: pt.bool,
    searchFieldOptions: pt.shape({
        onInputChange: pt.func.isRequired,
        placeholder: pt.string.isRequired,
        label: pt.string.isRequired,
        error: pt.bool,
        helperText: pt.string
    }).isRequired
};

export default AutocompleteCheckbox;