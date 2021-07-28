import React,{Component} from 'react'
import Parking from '../../pages/Parking'
import {Route, Switch, Redirect, Router} from 'react-router-dom'

export default class Content extends Component{
    render() {
        return (
            <div className={"main-content"}>
                {/*<Switch>*/}
                {/*    <Route path={'/parking'} component={Parking}/>*/}
                {/*</Switch>*/}
            </div>

        )
    }
};