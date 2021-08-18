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
        let pricing;
        let earlybird;
        let maximum;
        let park;
        let monthly;
        if(this.state==null){
            span=<td>NaN</td>
        }else{
            park = this.state.info.totalPark;
            if(this.state.info.isTwentyFour){
                span=
                    <td>24 hours</td>
            }else{
                span=
                    <td>{this.state.info.openTime} ~ {this.state.info.closeTime}</td>
            }
            if(this.state.info.haveEarlyBird){
                earlybird=
                    <tr><td>Early Bird (Before 10am)</td><td>${this.state.info.earlyBirdPrice}</td></tr>
            }
            if(this.state.info.haveMax){
                maximum=
                    <tr><td>Maximum: </td><td>${this.state.info.maxPrice}</td></tr>
            }
            if(this.state.info.isMonthly){
                monthly=
                    <tr><td>Lease a park</td><td>${this.state.info.monthlyFees}/month</td></tr>
            }
            if(!this.state.info.isFlatRate){
                pricing=
                    <div>
                        <div>You can enjoy {this.state.info.freeBefore} minutes free parking here.</div>
                        <table>
                            <tbody>
                                <tr><td>Every Hour</td><td>${this.state.info.pricePh}</td></tr>
                                {maximum}
                                {earlybird}
                                {monthly}
                            </tbody>
                        </table>
                    </div>
            }
            else{
                pricing=
                    <div>
                        <div>You can enjoy {this.state.info.freeBefore} minutes free parking here.</div>
                        <table>
                            <tbody>
                            <tr><td>Parking Price per day</td><td>{this.state.info.pricePh}</td></tr>
                            {earlybird}
                            {monthly}
                            </tbody>
                        </table>
                    </div>
            }

        }


        return(
            <div>
                <h5>Parking Lot Information</h5>
                <table>
                    <tbody>
                    <tr><td>Open hours:</td>{span}</tr>
                    <tr><td>Capacity: </td><td>{park} spaces</td></tr>
                    </tbody>
                </table>
                <h5>Pricing</h5>
                {pricing}
            </div>
        );
    }
}