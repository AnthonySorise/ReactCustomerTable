import React, {Component} from 'react';
import $ from 'jquery'; 
import {Modal, Button, Form, FormGroup} from 'react-bootstrap'

export class EditModal extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Modal {...this.props} size = "lg" aria-labelledby = "contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Control className = "editFirstName" defaultValue = {this.props.selectedcustomerfirstname} type="text" placeholder="First Name"/>
            <Form.Control className = "editLastName" defaultValue = {this.props.selectedcustomerlastname} type="text" placeholder="Last Name" />
            <Form.Control className = "editEmail" defaultValue = {this.props.selectedcustomeremail} type="email" placeholder="Email" />
            <Form.Control className = "editPhoneNumber" defaultValue = {this.props.selectedcustomerphonenumber} type="tel" placeholder="Phone" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.editDB}>Save</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  editDB = e => {
    let id             = this.props.selectedcustomerid;
    let oldFirstName   = this.props.selectedcustomerfirstname;
    let oldLastName    = this.props.selectedcustomerlastname;
    let oldEmail       = this.props.selectedcustomeremail;
    let oldPhoneNumber = this.props.selectedcustomerphonenumber;
    let newFirstName   = $(".editFirstName").val();
    let newLastName    = $(".editLastName").val();
    let newEmail       = $(".editEmail").val();
    let newPhoneNumber = $(".editPhoneNumber").val();

    this.props.onHide();
    
    //after success from API
    this.props.updatetable(id, oldFirstName, oldLastName, oldEmail, oldPhoneNumber, newFirstName, newLastName, newEmail, newPhoneNumber);
  }
}