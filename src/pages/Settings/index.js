import React,{Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal'
import './index.css';


export default class Settings extends Component{
    state={
        show:false
    }
    setShow=(status)=>{
        this.setState({show:status});
        //console.log(this.state);
    }
    render() {
        console.log(this.state.show);
        let modal =
            <Modal  show={this.state.show}  dialogClassName="modal-90w" onHide={()=>this.setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>;
        return (
                <ListGroup className={"listGroup"}>
                    <ListGroup.Item action href={"/info"}>
                        Link 1
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=>this.setShow(true)}>
                        Link 2
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        This one is a button {this.state.show}
                    </ListGroup.Item>
                    {modal}
                </ListGroup>

        )
    }
}
