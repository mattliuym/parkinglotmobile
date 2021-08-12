import React,{Component} from "react";
import './index.css';
import Parkimg from './images.jpeg';
import LoadingImg from './loading-buffering.gif';
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
    handleClick = () => {
        //this.manualFocusInst.focus();
    }
    //get the car information from backend
    getPlate = () =>{
        const {searchInput} = this;
        this.searchPlate(searchInput.state.value);
    }
    //reformat the date format into a readable style.
    getDate=(time)=>{
        let myDate = new Date(time);
        let year = myDate.getFullYear();
        let month = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) ;//获取月
        let date = myDate.getDate();
        let  h = myDate.getHours();
        let m = myDate.getMinutes();
        let now = `${date}/${month}/${year} at ${h}:${m}`;
        return now
    }
    //this method is for searching plate by Axios from the database
    searchPlate=(plate)=>{
        //show loading img
        if(plate==""){
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
                console.log(error);
            }
        );
    }
    render() {
        let plateinfo;
        if(this.state.result!=""){
            plateinfo=
                <div id={'plateInfo'}>
                    <table>
                        <tbody>
                            <tr><td>Plate Number: </td><td>{this.state.result.plate}</td></tr>
                            <tr><td>Entered Time: </td><td>{this.getDate(this.state.result.inTime)}</td></tr>
                            <tr><td>You have to pay: </td><td>${this.state.result.fees}</td></tr>
                        </tbody>
                    </table>
                </div>;
        }
        return (<div>
            {/*<WingBlank><div className="sub-title">Normal</div></WingBlank>*/}
            <div className={'imgBox'}>
                <img src={Parkimg} />
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
                >Click to Search</Button>
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
        </div>);
    }
}