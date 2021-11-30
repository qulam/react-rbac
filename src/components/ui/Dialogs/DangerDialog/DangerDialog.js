import pt from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonLoader from "../../ButtonLoader";

const DangerDialog = ({
                          isOpen,
                          isLoading,
                          onClose,
                          onAccept,
                          dialogTitle,
                          dialogDescription,
                          acceptButtonName,
                          cancelButtonName,
                          ...dialogProps
                      }) => {

    const onAcceptHandler = () => {
        if (isLoading) return;
        if (!!onAccept) onAccept();

        setTimeout(() => onClose(), 250);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} {...dialogProps}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogDescription}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={isLoading}
                    onClick={onClose}
                >
                    {cancelButtonName}
                </Button>
                <ButtonLoader
                    color='error'
                    onClick={onAcceptHandler}
                    autoFocus
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >{acceptButtonName}
                </ButtonLoader>
            </DialogActions>
        </Dialog>
    );
};

DangerDialog.defaultProps = {
    isOpen: false,
    isLoading: false,
    dialogTitle: 'DangerDialog title (change me your title)',
    dialogDescription: 'DangerDialog description (change me your description)',
    acceptButtonName: 'Yes, I got it',
    cancelButtonName: 'Cancel'
};

DangerDialog.propTypes = {
    isOpen: pt.bool.isRequired,
    isLoading: pt.bool,
    onClose: pt.func.isRequired,
    onAccept: pt.func,
    dialogTitle: pt.string.isRequired,
    dialogDescription: pt.string.isRequired,
    acceptButtonName: pt.string.isRequired,
    cancelButtonName: pt.string.isRequired
};

export default DangerDialog;