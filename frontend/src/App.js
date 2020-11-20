import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import VideoBg from "reactjs-videobg";
//import ogg from "./videos/Neon.ogg";
import webm from "./background/video.webm";
import mp4 from "./background/video.mp4";
// import poster from "./img/poster.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {Row, Container, Col} from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Image from "react-bootstrap/Image";
import {Home} from "@material-ui/icons";
import {WelcomeFrame} from "./WelcomeFrame";
import {HomeFrame} from "./HomeFrame";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


import {useHistory} from "react-router-dom";


function useApiHook() {
    //const [isOnline] = useState(null);
    let history = useHistory();
    const axios = require('axios');
    const rootUrl = "http://localhost:8181/api/v1"

    const login = (login, password, remember) => {
        axios({
            method: 'post',
            url: 'http://localhost:8181/api/v1/client/login',
            data: {
                login: login,
                password: password,
                remember: remember
            },

        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('token', response.data.payload.token);
                if (response.data.status === "ok") {
                    history.push("/mycloud");
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    const register = (nick, email, password, promo) => {
        axios({
            method: 'post',
            url: rootUrl + '/client/register',
            data: {
                login: nick,
                password: password,
                email: email,
                promo: promo
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === "ok") {
                    login(nick, password, false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const exit = () => {
        localStorage.clear();
    }

    const getLocalToken = () => {
        return localStorage.getItem('token');
    }

    const isOnline = () => {

    }

    const listFiles = async (path) => {
        return await new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: rootUrl + path,
                data: {
                    token: getLocalToken()
                }
            })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.status === "ok") {

                        resolve(response.data.payload);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    const uploadFile = (file, path) => {
        //alert("Закачиваю");
        var formData = new FormData();
        formData.append("file", file);
        formData.append("token", getLocalToken());

        return axios.post(rootUrl +"/upload" +path+"/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

    const downloadFile = (file) => {
        const FileDownload = require('js-file-download');

        return axios({
            url: rootUrl +"/download/mycloud/"+ file.filepath,
            method: 'POST',
            data: {
                token: getLocalToken()
            },
            responseType: 'blob', 
        }).then((response) => {
            FileDownload(response.data, file.filename);
        });

    }

    const deleteFile = (file) => {
        return axios({
            url: rootUrl +"/delete/mycloud/"+ file.filepath,
            method: 'POST',
            data: {
                token: getLocalToken()
            },
            responseType: 'blob', 
        })

    }

    const createFolder = (path) => {
        //alert("создаю папку "+rootUrl +"/mkdir"+ path+"/");

        return axios({
            url: rootUrl +"/mkdir"+ path+"/",
            method: 'POST',
            data: {
                token: getLocalToken()
            },
        })

    }


    const shareFile = (filepath) => {

    }

    useEffect(() => {

    });

    return [login, register, exit, getLocalToken, isOnline, listFiles, uploadFile, downloadFile, deleteFile, shareFile, createFolder];
}

function App(props) {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/welcome">
                        <WelcomeFrame useApiHook={useApiHook}/>
                    </Route>
                    <Route strict={false} exact={false} path="/mycloud">
                        <HomeFrame useApiHook={useApiHook}/>
                    </Route>
                    <Route path="/mygallery">
                        <HomeFrame useApiHook={useApiHook}/>
                    </Route>
                    <Route path="/mymusic">
                        <HomeFrame useApiHook={useApiHook}/>
                    </Route>
                    <Route path="/">
                        <WelcomeFrame useApiHook={useApiHook}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
