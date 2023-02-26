import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { SimpleDialogProps } from './types';
import { AiFillEdit, MdDeleteForever } from 'react-icons/all';
import { red } from '@mui/material/colors';

export const EditDialog = (props: SimpleDialogProps): JSX.Element => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Contact Details</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton onClick={() => handleListItemClick('')}>
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
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AiFillEdit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="edit account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
};
