import React,{Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './index.css';
import {Button, SearchBar, Toast, WhiteSpace, WingBlank} from "antd-mobile";


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
               console.log(1);
           }else{
               console.log(res.data);
           }
        });
        console.log(plate);
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
                          <Button onClick={()=>this.getPlate()}>Next Step</Button>
                      </WingBlank>
                  </div>
                );
                break;
            case 20:
                main=(
                    <div>
                        2
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
                    <div>
                        3
                    </div>
                );
                break;
            case 50:
                main=(
                    <div>
                        3
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
                        Lease a Park
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
