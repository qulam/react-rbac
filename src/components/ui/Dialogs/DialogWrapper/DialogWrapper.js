import pt from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogWrapper = ({isOpen, onClose, dialogTitle, children, ...dialogProps}) => {
    if (!isOpen) return null;

    return (
        <Dialog open={true} onClose={onClose} {...dialogProps}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

DialogWrapper.defaultProps = {
    isOpen: false,
    dialogTitle: 'DialogWrapper title (change me your title)',
};

DialogWrapper.propTypes = {
    isOpen: pt.bool.isRequired,
    onClose: pt.func.isRequired,
    dialogTitle: pt.string.isRequired,
};

export default DialogWrapper;