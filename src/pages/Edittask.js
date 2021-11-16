import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
class Edittask extends Component
{

    state = {
        title: '',
        description: '',
        assignTo: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const stud_id = this.props.match.params.id;
         // console.log(stud_id);
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-task/${stud_id}`);

      
        if(res.data.status === 200)
        {
            this.setState({
                title: res.data.task.title,
                description: res.data.task.description,
                assignTo: res.data.task.assignTo,
                
            });
        }

        else if(res.data.status === 404)
        {
            swal({
                title: "warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
        }

    }

    updateTask = async (e) =>{
        e.preventDefault();
       // document.getElementById('updatebtn').disabled = true;
       // document.getElementById('updatebtn').innerText = "Updating";
        const stud_id = this.props.match.params.id;
        const res = await axios.post(`http://127.0.0.1:8000/api/update-task/${stud_id}`, this.state);
        if(res.data.status === 200)
        {
                //console.log(res.data.message);
                swal({
                    title: "Updated!",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok!",
                  });
                this.props.history.push('/');
               // document.getElementById('updatebtn').disabled = false;
               // document.getElementById('updatebtn').innerText = "Update Student";
              
                  
                
        }

        else if(res.data.status === 404)
        {
            swal({
                title: "warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok!",
              });

              this.props.history.push('/');
        }

        else 
        {
            this.setState({
                error_list: res.data.validator_err,
            })
        }
        
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                                <div className="card">
                                <div className="card-header">
                                    <h4>Add Student
                                        <Link to={'/'} className="btn btn-primary btn-sm- float-end"> Back</Link>
                                    </h4>
                                    </div>
                                        <div className="card-body">

                                            <form onSubmit={this.updateTask}>
                                            <div className="form-group mb-3">
                                                    <label>Title</label>
                                                    <input  type="text" name="title" onChange={this.handleInput} value={this.state.title} className="form-control"/>
                                                    <span className="text-danger">{this.state.error_list.title}</span>
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label>Description</label>
                                                    <textarea type="text" name="description" onChange={this.handleInput} value={this.state.description} className="form-control"> </textarea>
                                                    <span className="text-danger">{this.state.error_list.description}</span>
                                                </div>


                                                <div className="form-group mb-3">
                                                    <label>Assign To</label>
                                                    <input type="text" name="assignTo" onChange={this.handleInput} value={this.state.assignTo} className="form-control"/>
                                                    <span className="text-danger">{this.state.error_list.assignTo}</span>
                                                </div>


                                                <div className="form-group mb-3">
                                                   <button type="submit" id="updatebtn" className="btn btn-primary">Update Task</button>

                                                </div>
                                            
                                            </form>

                                        </div>
                                </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edittask;