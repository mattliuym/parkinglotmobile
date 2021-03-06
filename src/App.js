import React from 'react';
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Header from './components/Header';
import Parking from './pages/Parking'
import Info from './pages/Info'
import Settings from "./pages/Settings";
import TabBarExample from './components/Tabbar'
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';

export default class App extends React.Component{

    componentDidMount(){
        //resize the main content to fit the screen size.
        let clHeight = document.documentElement.clientHeight;
        document.getElementById('main-content').style.height=clHeight-94+'px';
    }
    render(){
        return  (
            <div className="App">
                <Header/>
                <div id={"main-content"}>
                    <Switch>
                        <Route path={'/'} component={Parking} exact/>
                        <Route path={'/info'} component={Info}/>
                        <Route path={'/settings'} component={Settings}/>
                    </Switch>
                </div>
                <TabBarExample/>
            </div>
        )
    }
}