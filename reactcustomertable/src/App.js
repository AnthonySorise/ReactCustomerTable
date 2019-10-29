import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'
import {AddModal} from './Components/AddModal';
import { EditModal } from './Components/EditModal';
import { DeleteModal } from './Components/DeleteModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.addToTable      = this.addToTable.bind(this);
    this.editTable       = this.editTable.bind(this);
    this.deleteFromTable = this.deleteFromTable.bind(this);

    this.state = {
      columnDefs: [{
        headerName: "", field: "", checkboxSelection: true
      }, {
        headerName: "First Name", field: "firstName", sortable: true
      }, {
        headerName: "Last Name", field: "lastName", sortable: true
      }, {
        headerName: "Email", field: "email", sortable: true
      }, {
        headerName: "Phone Number", field: "phoneNumber", sortable: true
      }],
      rowData: [{
        id: 0, firstName: "FirstName001", lastName: "LastName001", email: "001@email.com", phoneNumber: "000-000-0001"
      }, {
        id: 1, firstName: "FirstName002", lastName: "LastName002", email: "002@email.com", phoneNumber: "000-000-0002"
      }, {
        id: 2, firstName: "FirstName003", lastName: "LastName003", email: "003@email.com", phoneNumber: "000-000-0003"
      }, {
        id: 3, firstName: "FirstName004", lastName: "LastName004", email: "004@email.com", phoneNumber: "000-000-0004"
      }, {
        id: 4, firstName: "FirstName005", lastName: "LastName005", email: "005@email.com", phoneNumber: "000-000-0005"
      }],
      selectedCustomerID         : -1,
      selectedCustomerFirstName  : "",
      selectedCustomerLastName   : "",
      selectedCustomerEmail      : "",
      selectedCustomerPhoneNumber: "",
      isShowAddModal             : false,
      isShowEditModal            : false,
      isShowDeleteModal          : false
    }
  }

  componentDidMount() {
    //populate table with data from DB
    // fetch('')
    // .then(result => result.json())
    // .then(rowData => this.setState({rowData}))
  }
  
  addToTable(firstName, lastName, email, phoneNumber){
    let newRow = {
      firstName  : firstName,
      lastName   : lastName,
      email      : email,
      phoneNumber: phoneNumber
    };
    let rows = [];
    for(var i = 0; i< this.state.rowData.length; i++){
      rows.push(this.state.rowData[i]);
    }
    rows.push(newRow);
    this.setState({rowData: rows})
    this.gridApi.setRowData(rows);
  }
  editTable(id, oldFirstName, oldLastName, oldEmail, oldPhoneNumber, newFirstName, newLastName, newEmail, newPhoneNumber){
    let rows = [];
    let indexToEdit;
    for(var i = 0; i< this.state.rowData.length; i++){
      rows.push(this.state.rowData[i]);
      if(this.state.rowData[i].firstName == oldFirstName &&
        this.state.rowData[i].lastName == oldLastName &&
        this.state.rowData[i].email == oldEmail &&
        this.state.rowData[i].phoneNumber == oldPhoneNumber){
          indexToEdit = i;
      }
    }
    if(indexToEdit >=0){
      rows[indexToEdit].firstName   = newFirstName;
      rows[indexToEdit].lastName    = newLastName;
      rows[indexToEdit].email       = newEmail;
      rows[indexToEdit].phoneNumber = newPhoneNumber;
    }
    this.setState({rowData: rows})
    this.gridApi.setRowData(rows);
  }
  deleteFromTable(id, firstName, lastName, email, phoneNumber){
    let rows = [];
    let indexToRemove;
    for(var i = 0; i< this.state.rowData.length; i++){
      rows.push(this.state.rowData[i]);
      if(this.state.rowData[i].firstName == firstName &&
        this.state.rowData[i].lastName == lastName &&
        this.state.rowData[i].email == email &&
        this.state.rowData[i].phoneNumber == phoneNumber){
          indexToRemove = i;
      }
    }
    if(indexToRemove>=0){
      rows.splice(indexToRemove, 1);
    }
    this.setState({rowData: rows})
    this.gridApi.setRowData(rows);
  }

  render() {
    let closeAddModal    = () => this.setState({isShowAddModal: false});
    let closeEditModal   = () => this.setState({isShowEditModal: false});
    let closeDeleteModal = () => this.setState({isShowDeleteModal: false});

    return (
      <div className = "ag-theme-balham" style = {{ height: '750px',width : '100%' }}>
        <Button onClick={this.addCustomer}>Add Customer</Button>
        <AddModal 
        show                        = {this.state.isShowAddModal}
        onHide                      = {closeAddModal}
        selectedcustomerid          = {this.state.selectedCustomerID}
        selectedcustomerfirstname   = {this.state.selectedCustomerFirstName}
        selectedcustomerlastname    = {this.state.selectedCustomerLastName}
        selectedcustomeremail       = {this.state.selectedCustomerEmail}
        selectedcustomerphonenumber = {this.state.selectedCustomerPhoneNumber}
        updatetable                 = {this.addToTable}>
        </AddModal>

        <Button onClick={this.editCustomer}>Edit Customer</Button>
        <EditModal 
        show                        = {this.state.isShowEditModal}
        onHide                      = {closeEditModal}
        selectedcustomerid          = {this.state.selectedCustomerID}
        selectedcustomerfirstname   = {this.state.selectedCustomerFirstName}
        selectedcustomerlastname    = {this.state.selectedCustomerLastName}
        selectedcustomeremail       = {this.state.selectedCustomerEmail}
        selectedcustomerphonenumber = {this.state.selectedCustomerPhoneNumber}
        updatetable                 = {this.editTable}>
        </EditModal>
        
        <Button onClick={this.deleteCustomer}>Delete Customer</Button>
        <DeleteModal 
        show                        = {this.state.isShowDeleteModal}
        onHide                      = {closeDeleteModal}
        selectedcustomerid          = {this.state.selectedCustomerID}
        selectedcustomerfirstname   = {this.state.selectedCustomerFirstName}
        selectedcustomerlastname    = {this.state.selectedCustomerLastName}
        selectedcustomeremail       = {this.state.selectedCustomerEmail}
        selectedcustomerphonenumber = {this.state.selectedCustomerPhoneNumber}
        updatetable                 = {this.deleteFromTable}>
        </DeleteModal>

        <AgGridReact 
        columnDefs  = {this.state.columnDefs}
        rowData     = {this.state.rowData}
        onGridReady = { params => this.gridApi = params.api }>
        </AgGridReact>
      </div>
    );
  }
  
  addCustomer = e => {
    this.setState({isShowAddModal: true, isShowEditModal: false, isShowDeleteModal: false});
  }
  editCustomer = e => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData  = selectedNodes.map( node => node.data )
    if(selectedData.length){
      this.setState({isShowAddModal: false, isShowEditModal: true, isShowDeleteModal: false, selectedCustomerID: selectedData[0].id,  selectedCustomerFirstName: selectedData[0].firstName, selectedCustomerLastName: selectedData[0].lastName, selectedCustomerEmail: selectedData[0].email, selectedCustomerPhoneNumber: selectedData[0].phoneNumber});
    }
    else{
      alert("Select a customer to edit.")
    }
  }
  deleteCustomer = e => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData  = selectedNodes.map( node => node.data )
    if(selectedData.length){
      this.setState({isShowAddModal: false, isShowEditModal: false, isShowDeleteModal: true, selectedCustomerID: selectedData[0].id, selectedCustomerFirstName: selectedData[0].firstName, selectedCustomerLastName: selectedData[0].lastName, selectedCustomerEmail: selectedData[0].email, selectedCustomerPhoneNumber: selectedData[0].phoneNumber});
    }
    else{
      alert("Select a customer to delete.")
    }
  }
}

export default App;