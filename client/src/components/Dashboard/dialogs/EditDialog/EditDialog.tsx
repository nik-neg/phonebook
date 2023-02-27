import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AiFillEdit, MdDeleteForever } from 'react-icons/all';
import { red } from '@mui/material/colors';
import { EditDialogProps } from './types';

export const EditDialog = (props: EditDialogProps): JSX.Element => {
    const { onClose, selectedValue, open, onEdit } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleEditContact = (remove: boolean) => {
        onEdit?.(remove);
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Contact Details</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton onClick={() => handleEditContact(true)}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    bgcolor: red[100],
                                    color: red[600],
                                }}
                            >
                                <MdDeleteForever />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'remove contact'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleEditContact(false)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AiFillEdit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="update contact" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
};
