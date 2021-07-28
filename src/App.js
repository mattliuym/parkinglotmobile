import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import TabBarExample from './components/Tabbar'
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';

const App = () => (
    <div className="App">
        <Header/>
        <Content/>
        <TabBarExample/>
    </div>
);

export default App;