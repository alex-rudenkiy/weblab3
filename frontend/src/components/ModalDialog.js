import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
//import Art from 'public/images/Summertime -  Kreayshawn feat. V-Nasty.jpg'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

export default function FormDialog(props) {
    const {open, setOpen, textField, setTextField, createFolder} = props;

    return (

            <Dialog open={open} onClose={()=>setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Создание папки</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>
                        Введите название папки
                    </DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название папки"
                        value={textField}
                        type="text"
                        fullWidth
                        onChange={(v)=>setTextField(v.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Закрыть
                    </Button>
                    <Button onClick={()=>{createFolder(textField); setOpen(false);}} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

    );
}
