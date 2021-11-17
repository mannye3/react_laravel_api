import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
class Addtask extends Component
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

    saveTask = async (e) =>{
        e.preventDefault();
        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Saving";
        const res = await axios.post(`https://laravel.fosl-ailesgroup.com/api/add-task`, this.state);
        if(res.data.status === 200)
        {
            // document.getElementById('updatebtn').disabled = false;
            //     document.getElementById('updatebtn').innerText = "Save Student";
                swal({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok!",
                  });
                  this.props.history.push('/');
                //console.log(res.data.message);
                this.setState({
                    title: '',
                    description: '',
                    assignTo: '',
                   

                });
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
                                    <h4>Add Task
                                        <Link to={'/'} className="btn btn-primary btn-sm- float-end"> Back</Link>
                                    </h4>
                                    </div>
                                        <div className="card-body">

                                            <form onSubmit={this.saveTask}>
                                                <div className="form-group mb-3">
                                                    <label>Title</label>
                                                    <input  type="text" name="title" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                                    <span className="text-danger">{this.state.error_list.title}</span>
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label>description</label>
                                                    <textarea type="text" name="description" onChange={this.handleInput} value={this.state.course} className="form-control"> </textarea>
                                                    <span className="text-danger">{this.state.error_list.description}</span>
                                                </div>


                                                <div className="form-group mb-3">
                                                    <label>Assign To</label>
                                                    <input type="text" name="assignTo" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                                    <span className="text-danger">{this.state.error_list.assignTo}</span>
                                                </div>

                                                
                                                <div className="form-group mb-3">
                                                   <button type="submit"  className="btn btn-primary">Save Task</button>

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

export default Addtask;