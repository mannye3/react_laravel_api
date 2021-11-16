import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

class Task extends Component
{
    state = {
        tasks: [],
        loading: true,
    }
  async componentDidMount(){
        const res = await axios.get('http://127.0.0.1:8000/api/tasks');

       
        if(res.data.status === 200)
        {
            this.setState({
                tasks: res.data.tasks,
                loading: false,
            });
           
        }



    }

    deleteTask = async (e, id) => {
        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting";

        const res =await axios.delete(`http://127.0.0.1:8000/api/delete-task/${id}`);
        if(res.data.status === 200)
        {
            thidClickedFunda.closest("tr").remove();
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
            
        }
    }

    render(){

        var task_table = "";
        if(this.state.loading)
        {
            task_table = <tr><td colSpan="7"><h2>Loading.....</h2></td></tr>

        }
        else 
        {
            task_table = 
            this.state.tasks.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.assignTo}</td>
                        
                        <td>
                            <Link  to={`edit-task/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => this.deleteTask(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                           
                        </td>
                    </tr>
                )
            })
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                                <div className="card">
                                <div className="card-header">
                                    <h4>Tasks
                                        <Link to={'add-task'} className="btn btn-primary btn-sm- float-end">Add Tasks</Link>
                                    </h4>
                                    </div>
                                        <div className="card-body">

                                            <table className="table table-bordered table-stripe">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Assign To</th>
                                                       
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {task_table}
                                                </tbody>

                                            </table>

                                        </div>
                                </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;