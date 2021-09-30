import React,{Component} from "react";
import './index.css';
import Parkimg from './images.jpeg';
import axios from 'axios';
import {Toast,SearchBar, Button, WhiteSpace, WingBlank, ActivityIndicator} from 'antd-mobile';
import Modal from "react-bootstrap/Modal";
import CheckoutForm from "../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe("pk_test_51JeYy8IkqIguFzWDTAHFIdqBqPRfzRVlcQHVmQ1h0cyvcuvoopKwD6JTlr6CYyaouOj8fsXDrEEZNy1d2VPTNLK100bcYiv2gK");
export default class Parking extends Component {
    state = {
        value: '',
        result:'',
        show:false,
    };
    setShow=(status)=>{
        this.setState({show:status});
    }
    showModal=()=>{
        this.setShow(true);
    }
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
                        <span>Yes, you have paid the parking fees. Please leave the carpark in 20 minues.</span>
                    </div>
            }else{
                payinfo=
                    <div>
                        <span>You have yet paid the parking fees.</span>
                        <Button className={"payButton"} onClick={()=>this.showModal()}>Tap here to pay</Button>
                    </div>
            }
        }
        const rt=this.state.result;
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
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show}  onHide={()=>this.setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.headerName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{"margin-bottom":"20px"}}><span>You need to pay: </span><span style={{"font-size":"20px","margin-left":"10px"}}>${this.state.result.fees}</span></div>
                    <Elements stripe={promise}>
                        <CheckoutForm result={rt} />
                    </Elements>
                </Modal.Body>
            </Modal>
        </div>);
    }
}