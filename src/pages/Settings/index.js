import React,{Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import './index.css';


export default class Settings extends Component{
    state={
        show:false,
        headerName:""
    }
    setShow=(status)=>{
        this.setState({show:status});
    }
    showModal=(header)=>{
        this.setShow(true);
        this.setState({headerName:header});

    }
    render() {
        console.log(this.state.show);
        return (
            <div>
                <ListGroup className={"listGroup"}>
                    <ListGroup.Item action onClick={()=>this.showModal("Lease a Park")}>
                        Lease a Park
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Contact Us")}>
                        Contact Us
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Feedbacks")}>
                        Feedbacks
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("About this Web App")}>
                        About this Web App
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.showModal("Help")}>
                        Help
                    </ListGroup.Item>
                </ListGroup>
                <Modal  dialogClassName="modal-90w" show={this.state.show}  onHide={()=>this.setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.headerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Body content</Modal.Body>
                </Modal>
            </div>
        )
    }
}
