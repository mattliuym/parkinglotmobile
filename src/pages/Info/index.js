import React,{Component} from "react";
import axios from 'axios';
import index from './index.module.css';
import {Toast} from 'antd-mobile';
export default class Info extends Component{
    componentDidMount() {
        Toast.loading('Loading...', 30, () => {
        });
        axios.get('/api/Pricing/GetPricing').then(
            response=>{
                if(!response.data[0])
                    return;
                console.log(response.data[0]);
                this.setState({info:response.data[0]});
                Toast.hide();
                document.getElementById("infoForm").style.display="flex";
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
            //document.getElementById("infoForm").style.display="none";
            span=<td>NaN</td>
        }else{
            //document.getElementById("infoForm").style.display="block";
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
                    <tr><td>Early Bird (Before 10am)</td><td className={index.price}>${this.state.info.earlyBirdPrice}</td></tr>
            }
            if(this.state.info.haveMax){
                maximum=
                    <tr><td>Maximum: </td><td className={index.price}>${this.state.info.maxPrice}</td></tr>
            }
            if(this.state.info.isMonthly){
                monthly=
                    <tr><td>Lease a park</td><td className={index.price}>${this.state.info.monthlyFees}/month</td></tr>
            }
            if(!this.state.info.isFlatRate){
                pricing=
                    <div>
                        <div className={index.notice}>You can enjoy {this.state.info.freeBefore} minutes free parking here.</div>
                        <table className={index.tableStyle}>
                            <tbody>
                                <tr><td className={index.priceClass}>Every Hour:</td><td className={index.price}>${this.state.info.pricePh}</td></tr>
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
                        <div className={index.notice}>You can enjoy {this.state.info.freeBefore} minutes free parking here.</div>
                        <table className={index.tableStyle}>
                            <tbody>
                            <tr><td className={index.priceClass}>Parking Price per day:</td><td className={index.price}>{this.state.info.pricePh}</td></tr>
                            {earlybird}
                            {monthly}
                            </tbody>
                        </table>
                    </div>
            }

        }


        return(
            <div id={"infoForm"} className={index.infoContent}>
                <div className={index.parkInfo}>
                    <h4>Parking Lot Information</h4>
                    <table className={index.tableStyle}>
                        <tbody>
                        <tr><td>Open hours:</td>{span}</tr>
                        <tr><td>Capacity: </td><td>{park} spaces</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className={index.priceInfo}>
                    <h4>Pricing</h4>
                    {pricing}
                </div>
            </div>
        );
    }
}