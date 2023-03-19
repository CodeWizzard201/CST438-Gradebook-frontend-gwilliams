import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';
import { TextField } from '@mui/material';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

//  required properties -  assignment
//  
//  NOTE: because Gradebook is invoked via <Link> in Assignment.js components
//  properties are passed as attributes of props.location 
//
class NewAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {assignmentName: "", dueDate: "", courseId: 0};
    } 
  
    // when submit button pressed, send new assignment to back end 
    handleSubmit = ( ) => {
      console.log("NewAssignment.handleSubmit");
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/assignment/new/${this.state.courseId}` , 
          {  
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                       'X-XSRF-TOKEN': token }, 
            body: JSON.stringify({assignmentName:this.state.assignmentName,  dueDate: this.state.dueDate, courseId: this.state.courseId})
          } )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully added", {
            position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Adding assignment failed (else)", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Adding assignment failed (catch)", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
   };
    
    handleChange = (event) =>  {
      this.setState({[event.target.name]: event.target.value});
   }

    render() {
        const {name, dueDate, courseId} = this.state;
      
        return(
            <div className="App">
              <div style={{height: 50, width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
              </div>
              <div style={{ width:'100%'}}>
                <TextField autoFocus style={{width:250}} label="Assignment Name" name="assignmentName"
                  onChange={this.handleChange} value={name} />
                <TextField autoFocus style={{width:250}} label="Due Date" name="dueDate" 
                  onChange={this.handleChange} value={dueDate} />
                <TextField autoFocus style={{width:250}} label="Course ID" name="courseId" 
                  onChange={this.handleChange} defaultValue={courseId} />
              </div>
              <div style={{ height: 400, width: '100%' }}>
                
                <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleSubmit} >
                   Submit
                </Button>
              </div>
              <ToastContainer autoClose={1500} />   
            </div>
            ); 
        };
}

export default NewAssignment;