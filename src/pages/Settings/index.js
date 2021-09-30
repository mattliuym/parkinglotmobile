import React,{Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './index.css';
import {Button, SearchBar, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import { AiTwotoneCustomerService } from 'react-icons/ai';
import { AiFillMail} from 'react-icons/ai';

export default class Settings extends Component{
    state={
        show:false,
        headerName:"",
        code:0,
        /*
        10:
        20:
        30:
        */
        expiry:'',
        leaseId:0,
        plate:"",
        valid:"",
    }
    setShow=(status)=>{
        this.setState({show:status});
    }
    showModal=(header,code)=>{
        this.setShow(true);
        this.setState({headerName:header,code});
    }
    getPlate = () =>{
        const {searchInput} = this;
        this.searchPlate(searchInput.state.value);
    }
    searchPlate=(plate)=>{
        if(!plate){
            Toast.info("Please enter your plate");
            return;
        }
        axios.get('/api/LeasePark/SearchLease',{params:{p:plate}}).then(res=>{
           if(res.data.leaseId===0){
               document.getElementById("not-found").style.display="block";
           }else{
               document.getElementById("basic").style.display="block";
               this.setState({
                   plate:res.data.plate,
                   expiry:res.data.expiry,
                   valid:res.data.valid,
                   leaseId:res.data.leaseId
               })
           }
        });
    }
    //reformat the date format into a readable style.
    getDate=(time)=>{
        let myDate = new Date(time);
        let year = myDate.getFullYear();
        let month = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) ;
        let date = (myDate.getDate()<10? '0'+myDate.getDate() : myDate.getDate());
        // let  h = (myDate.getHours()<10? '0'+myDate.getHours() : myDate.getHours());
        // let m = (myDate.getMinutes()<10? '0'+myDate.getMinutes():myDate.getMinutes());
        // let now = `${date}-${month}-${year}   ${h}:${m}`;
        return `${date}-rm${month}-${year}`;
    }
    // onChange= (value) => {
    //     this.setState({ value });
    // };
    // clear = () => {
    //     this.setState({ value: '' });
    // };
    render() {
        let main;
        switch(this.state.code){
            case 10:
                main=(
                  <div>
                      <SearchBar placeholder={"Please enter your plate"}
                                 maxLength={6}
                                 showCancelButton={true}
                                 cancelText={"cancel"}
                                 onSubmit={value=>this.searchPlate(value.toUpperCase())}
                                 ref={c=>this.searchInput=c}
                      />
                      <WingBlank>
                          <Button className={"search-button"} onClick={()=>this.getPlate()}>Tap to Search</Button>
                      </WingBlank>
                      <div id={"basic"} style={{display:"none"}}>
                          {/*<div>*/}
                          {/*    <span>Plate:</span><span>{this.state.plate}</span>*/}
                          {/*</div>*/}
                          {/*<div>*/}
                          {/*    <span>Expired Date:</span><span>{this.getDate(this.state.expiry)}</span>*/}
                          {/*</div>*/}
                          <table cellspacing="10" className={"reservation-table"}>
                              <tr>
                                  <td>Plate:</td>
                                  <td className={"reservation-detail"}>{this.state.plate}</td>
                              </tr>
                              <tr>
                                  <td>Expired Date:</td>
                                  <td className={"reservation-detail"}>{this.getDate(this.state.expiry)}</td>
                              </tr>
                          </table>
                      </div>
                      <div id={"not-found"} style={{display:"none"}}>
                          <span>You have never reserved a park, would you like to lease a park for a month? You can go to our office for help.</span>
                      </div>

                  </div>
                );
                break;
            case 20:
                main=(
                    <div className={"contactContainer"}>
                        <div className={"contactInner"}>
                            <div className={"contactPhone"}>
                                <AiTwotoneCustomerService size={100}/>
                            </div>
                            <div className={"contactPhoneText"}>
                                <span>Phone:</span><span>0224106837</span>
                            </div>

                        </div>
                        <div className={"contactInner"}>
                            <div className={"contactEmail"}>
                                <AiFillMail size={100} />
                            </div>
                            <div className={"contactEmailText"}>
                                <span>Email:</span><span>mattliuym@gmail.com</span>
                            </div>

                        </div>
                    </div>
                );
                break;
            case 30:
                main=(
                    <div>
                        3
                    </div>
                );
                break;
            case 40:
                main=(
                    <div style={{"font-size":"16px"}}>
                        This is a COMPX576 project :)
                    </div>
                );
                break;
            case 50:
                main=(
                    <div style={{"font-size":"16px"}}>
                        This is the user side application. Car driver can use this webpage searching their parking condition, including the parking time and parking fees.
                    </div>
                );
                break;
            default:
                main=(
                    <div>404 Not Found</div>
                );
        }

        return (
            <div>
                <ListGroup className={"listGroup"}>
                    <ListGroup.Item action onClick={()=>this.showModal("Lease a Park",10)}>
                        Check your reservation
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Contact Us",20)}>
                        Contact Us
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Feedbacks",30)}>
                        Feedbacks
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("About this Web App",40)}>
                        About this Web App
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Help",50)}>
                        Help
                    </ListGroup.Item>
                </ListGroup>
                <Modal dialogClassName="modal-90w" show={this.state.show}  onHide={()=>this.setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.headerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{main}</Modal.Body>
                </Modal>
            </div>
        )
    }
}
