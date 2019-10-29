import React, {Component} from 'react';
import $ from 'jquery'; 
import {Modal, Button} from 'react-bootstrap'

export class DeleteModal extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Modal {...this.props} size = "lg" aria-labelledby = "contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete <span>{this.props.selectedcustomerfirstname}</span> <span>{this.props.selectedcustomerlastname}</span>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.deleteFromDB}>Yes</Button>
          <Button onClick={this.props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  deleteFromDB = e => {
    //after success from API
    let id          = this.props.selectedcustomerid;
    let firstName   = this.props.selectedcustomerfirstname;
    let lastName    = this.props.selectedcustomerlastname;
    let email       = this.props.selectedcustomeremail;
    let phoneNumber = this.props.selectedcustomerphonenumber;

    this.props.onHide();

    //after success from API
    this.props.updatetable(id, firstName, lastName, email, phoneNumber);
  }
}