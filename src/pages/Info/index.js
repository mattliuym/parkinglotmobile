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
                this.setState({info:response.data[0]})
            },
            error=>{
                console.log(error);
            }
        );
    }
    render() {
        let span;
        if(this.state==null){
            span=<tr>NaN</tr>
        }else{
            if(this.state.info.isTwentyFour){
                span=
                    <td>24 hours</td>
            }else{
                span=
                    <td>{this.state.info.openTime} ~ {this.state.info.closeTime}</td>
            }
        }

        return(
            <div>
                <h5>Parking Lot Information</h5>
                <table>
                    <tbody>
                    <tr><td>Open hours:</td>{span}</tr>
                    </tbody>
                </table>
                <h5>Pricing</h5>
            </div>
        );
    }
}