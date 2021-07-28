import React from 'react';
import {Route, Switch, Redirect, Router} from 'react-router-dom'
import Header from './components/Header';
import Content from './components/Content';
import Parking from './pages/Parking'
import TabBarExample from './components/Tabbar'
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';

const App = () => (
    <div className="App">
        <Header/>
        <div>
            <Route path={'/parking'} component={Parking}/>
        </div>
        <TabBarExample/>
    </div>
);

export default App;