import pt from 'prop-types';

import {Dialogs} from "src/components/ui";

const DeleteUserConfirmation = ({isOpen, isLoading, onClose, onAccept}) => {
    return (
        <Dialogs.DangerDialog
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            onAccept={onAccept}
            acceptButtonName='Yes, delete'
            cancelButtonName='Cancel'
            dialogTitle='Are you sure delete this group?'
            dialogDescription='If you continue this operation, the user you selected will be permanently deleted. You can click the `cancel` button to quit.'
        />
    );
};

DeleteUserConfirmation.defaultProps = {
    isOpen: false,
};

DeleteUserConfirmation.propTypes = {
    isOpen: pt.bool,
    onAccept: pt.func.isRequired,
    onClose: pt.func.isRequired
};

export default DeleteUserConfirmation;