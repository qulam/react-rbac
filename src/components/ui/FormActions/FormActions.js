import pt from 'prop-types';
import {Grid} from "@material-ui/core";

import {formOperations} from "src/common/constants";
import {ButtonLoader, When} from "src/components/ui";

const FormActions = ({isLoading, saveForm, handleSubmit, isNewRecord}) => {
    return (
        <Grid item xs={12}>
            <ButtonLoader
                color='primary'
                variant='contained'
                isLoading={isLoading}
                onClick={handleSubmit(data => {
                    saveForm(data, formOperations.SAVE);
                })}
            >
                Save and exit
            </ButtonLoader>
            <When condition={isNewRecord}>
                <ButtonLoader
                    color='secondary'
                    variant='contained'
                    isLoading={isLoading}
                    onClick={handleSubmit(data => {
                        saveForm(data, formOperations.SAVE_AND_CONTINUE_CREATE);
                    })}
                >Save and continue create</ButtonLoader>
                <ButtonLoader
                    color='inherit'
                    variant='contained'
                    isLoading={isLoading}
                    onClick={handleSubmit(data => {
                        saveForm(data, formOperations.SAVE_AND_CONTINUE_EDIT);
                    })}
                >Save and continue edit</ButtonLoader>
            </When>
        </Grid>
    )
};

FormActions.defaultProps = {
    isLoading: false,
    isNewRecord: true
};

FormActions.propTypes = {
    isLoading: pt.bool,
    handleSubmit: pt.func.isRequired,
    saveForm: pt.func.isRequired,
    isNewRecord: pt.bool.isRequired
};

export default FormActions;