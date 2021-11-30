import pt from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DefaultDialog = ({
                           isOpen,
                           onClose,
                           onAccept,
                           dialogTitle,
                           dialogDescription,
                           acceptButtonName,
                           cancelButtonName,
                           ...dialogProps
                       }) => {

    const onAcceptHandler = () => {
        onClose();
        if (!!onAccept) onAccept();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} {...dialogProps}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogDescription}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancelButtonName}</Button>
                <Button onClick={onAcceptHandler} autoFocus>{acceptButtonName}</Button>
            </DialogActions>
        </Dialog>
    );
};

DefaultDialog.defaultProps = {
    isOpen: false,
    dialogTitle: 'DefaultDialog title (change me your title)',
    dialogDescription: 'DefaultDialog description (change me your description)',
    acceptButtonName: 'Yes, I got it',
    cancelButtonName: 'Cancel'
};

DefaultDialog.propTypes = {
    isOpen: pt.bool.isRequired,
    onClose: pt.func.isRequired,
    onAccept: pt.func,
    dialogTitle: pt.string.isRequired,
    dialogDescription: pt.string.isRequired,
    acceptButtonName: pt.string.isRequired,
    cancelButtonName: pt.string.isRequired
};

export default DefaultDialog;