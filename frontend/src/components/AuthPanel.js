import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme} from '@material-ui/core/styles';
import {Row, Container, Col} from 'react-bootstrap';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import FileSVG from "../assets/images/file.svg"
import {ItemFigure} from "./ItemFigure";
import '../assets/css/myStyle.css';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {StyledDropZone} from 'react-drop-zone'

import {Menu, Item, Separator, Submenu, MenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import {Transition} from 'react-transition-group';
import {motion} from "framer-motion";
import Button from "@material-ui/core/Button/Button";
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField/TextField";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabPanel} from "../TabPanel";


const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#979797',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(0),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    demo2: {
        backgroundColor: '#ffffff',
    },
}));


export function AuthPanel(props) {
    const {panelIndex,setPanelIndex} = props;

    const classes = useStyles();
    //const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setPanelIndex(newValue);
    };


    return (

        <div className={classes.demo2} >

            <StyledTabs value={panelIndex} onChange={handleChange} aria-label="styled tabs example" >
                <StyledTab label="Авторизация" />
                <StyledTab label="Регистрация" />
            </StyledTabs>
            <Typography className={classes.padding} />


        </div>

    );
}

