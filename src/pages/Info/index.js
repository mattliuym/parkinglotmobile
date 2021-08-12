import React,{Component} from "react";
import axios from 'axios';
//import {Toast,SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator} from 'antd-mobile';
export default class Info extends Component{
    componentDidMount() {
        axios.get('/api/Pricing/GetPricing').then(
            response=>{
                if(!response.data[0])
                    return;
                console.log(response.data[0]);
            },
            error=>{
                console.log(error);
            }
        );
    }
    render() {

        return(
            <div>123</div>
        );
    }
}