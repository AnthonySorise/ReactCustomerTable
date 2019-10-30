import React, {Component} from 'react';
import $ from 'jquery'; 
import {Modal, Button, Form, FormGroup} from 'react-bootstrap'

export class AddModal extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Modal {...this.props} size = "lg" aria-labelledby = "contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Control className = "addFirstName" type="text" type="text" placeholder="First Name" />
            <Form.Control className = "addLastName" type="text" type="text" placeholder="Last Name" />
            <Form.Control className = "addEmail" type="email" type="email" placeholder="Email" />
            <Form.Control className = "addPhoneNumber" type="tel" type="tel" placeholder="Phone" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addToDB}>Save</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  addToDB = e => {
    let firstName   = $(".addFirstName").val();
    let lastName    = $(".addLastName").val();
    let email       = $(".addEmail").val();
    let phoneNumber = $(".addPhoneNumber").val();
    
    this.props.onHide();

    //after success from API
    this.props.updatetable(firstName, lastName, email, phoneNumber);
  }
}