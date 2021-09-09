import React,{Component} from "react";
import './index.css';
import Parkimg from './images.jpeg';
// import LoadingImg from './loading-buffering.gif';
import axios from 'axios';
import {Toast,SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator} from 'antd-mobile';

export default class Parking extends Component {
    state = {
        value: '',
        result:'',
    };
    componentDidMount() {
        //this.autoFocusInst.focus();
    }
    onChange= (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    // handleClick = () => {
    //     //this.manualFocusInst.focus();
    // }
    //get the car information from backend
    getPlate = () =>{
        const {searchInput} = this;
        this.searchPlate(searchInput.state.value);
    }
    //reformat the date format into a readable style.
    getDate=(time)=>{
        let myDate = new Date(time);
        let year = myDate.getFullYear();
        let month = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) ;
        let date = (myDate.getDate()<10? '0'+myDate.getDate() : myDate.getDate());
        let  h = (myDate.getHours()<10? '0'+myDate.getHours() : myDate.getHours());
        let m = (myDate.getMinutes()<10? '0'+myDate.getMinutes():myDate.getMinutes());
        let now = `${date}-${month}-${year}   ${h}:${m}`;
        return now;
    }
    //this method is for searching plate by Axios from the database
    searchPlate=(plate)=>{
        //show loading img
        if(plate===""){
            Toast.info("Please enter your plate");
            return;
        }
        if(document.getElementById("loadingImg").style.display==="none"){
            document.getElementById("loadingImg").style.display="block";
        }
        //use axios to get data from webapi.
        axios.get('/api/SearchPlate/GetCarInfo',{params:{s:plate}}).then(
            response=>{
                if(!response.data[0])
                    return;
                this.setState({result:response.data[0]});
                //hide loading img
                if(document.getElementById("loadingImg").style.display==="block"){
                    document.getElementById("loadingImg").style.display="none";
                }
            },
            error=>{
                if(document.getElementById("loadingImg").style.display==="block"){
                    document.getElementById("loadingImg").style.display="none";
                }
                Toast.fail("Cannot find any information. Please check your plate number!");
            }
        );
    }
    render() {
        let plateinfo;
        let payinfo;
        if(this.state.result!==""){
            plateinfo=
                <div id={'plateInfo'}>
                    <table>
                        <tbody>
                            <tr><td>Plate Number: </td><td>{this.state.result.plate}</td></tr>
                            <tr><td>Entered Time: </td><td>{this.getDate(this.state.result.inTime)}</td></tr>
                            <tr><td>You have parked for:</td><td>{this.state.result.timeLength} minutes</td></tr>
                            <tr><td>You have to pay: </td><td>${this.state.result.fees}</td></tr>
                        </tbody>
                    </table>
                </div>;
            if(this.state.result.isPaid&&!this.state.result.isMonthly){
                payinfo=
                    <div>
                        <span>Yes, you have paid the parking fees. Please leave the parking lot in 20 minues.</span>
                    </div>
            }else{
                payinfo=
                    <div>
                        <span>You have yet paid the parking fees.</span>
                        <Button size="small" className={"payButton"}>Tap here to pay</Button>
                    </div>
            }
        }

        return (<div>
            {/*<WingBlank><div className="sub-title">Normal</div></WingBlank>*/}
            <div className={'imgBox'}>
                <img alt={""} src={Parkimg} />
            </div>
            <SearchBar placeholder="Please enter your plate"
                       maxLength={6}
                       cancelText={"Cancel"}
                       onSubmit={value=>this.searchPlate(value.toUpperCase())}
                       ref={c=>this.searchInput=c}
            />
            <WhiteSpace />
            <WingBlank>
                <Button className={"searchButton"}
                    onClick={this.getPlate}
                >Tap to Search</Button>
            </WingBlank>
            <WhiteSpace />
            {/*<img id={"loadingImg"} src={LoadingImg} style={{display:"none"}}/>*/}
            <div id={"loadingImg"} style={{display:"none"}}>
                <WingBlank>
                    <div className="loading-container">
                        <div className="loading-img">
                            <ActivityIndicator size={"large"}
                                text="Loading..."
                            />
                        </div>
                    </div>
                </WingBlank>
            </div>
            {plateinfo}
            {payinfo}
        </div>);
    }
}