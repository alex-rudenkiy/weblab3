import React, {useState} from 'react';
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
import DirSVG from "../assets/images/folder.svg"

import {useHistory} from "react-router-dom";



export function ItemFigure(props) {
    const [isClicked, setIsClicked] = useState(false);
    const [lastTimeClick, setLastTimeClick] = useState(Math.round(new Date() / 1000));
    const history = useHistory();
    const path = require('path');

    const onDoubleClicked = ()=>{
        setIsClicked(!isClicked);
        console.log(Math.abs(new Date()-lastTimeClick));
        if((new Date()-lastTimeClick)<300){
            //alert("clicked");
            history.push("/mycloud/"+props.data.filename);
        }

        setLastTimeClick(new Date());
    }

    return (
        <Figure onClick={()=>onDoubleClicked()}

                style={{width:"5em",
            paddingBottom: "5px",
            paddingTop: "0.5em",
            marginBottom: "15px",
            //marginLeft: "0.5em",
            paddingLeft: "0.5em",
            paddingRight: "0.5em",
            textAlign: "center",
            boxShadow: (isClicked)?"0 0 10px rgba(0,0,0,0.35)":"unset",
            borderRadius: "5px"
        }}>
            
            <Figure.Image
                width={50}
                height={50}
                src={props.data.isDir?DirSVG:FileSVG}
            />
            <Figure.Caption >
                <p style={{  textAlign: "center",
                    textDecoration: "none",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    margin: "unset"
                }}>{path.basename(props.data.filename)}</p>
            </Figure.Caption>
        </Figure>
    );
}

