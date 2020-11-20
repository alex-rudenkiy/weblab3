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
import { StyledDropZone } from 'react-drop-zone'

import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { Transition } from 'react-transition-group';
import FilterDramaTwoToneIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button/Button";
import SettingsIcon from '@material-ui/icons/Settings';



export function HeaderBar() {

    return (

        <AppBar style={{
            backgroundColor: "transparent",
            boxShadow: "none", color: "dimgrey", paddingLeft: "3.5em", paddingTop: "1em"
        }} position="static">
            <Toolbar style={{
                marginTop: "0.5em",
                marginBottom: "0.5em",
            }}>


                <Container style={{ margin: "inherit", display: "contents", width:"100%" }}>

                    <FilterDramaTwoToneIcon style={{ height: "auto", width: "2em" }} color="primary" />
                    <Col>
                        <Typography color="textPrimary" variant="h6" style={{fontWeight: "600"}}>
                            MyCloud
                        </Typography>
                        {/*style={{marginLeft: "auto"}}*/}

                        <Typography variant="subtitle2" color="textSecondary">
                            alex-rudenkiy
                        </Typography>
                    </Col>

                    <Button disableElevation style={{    padding: "1em",
                        paddingLeft: "2em",
                        paddingRight: "2em"
                    }}><Typography variant="subtitle2"style={{  }}  >
                        Настройки <SettingsIcon/>
                    </Typography></Button>




                </Container>


            </Toolbar>
        </AppBar>
    );
}

