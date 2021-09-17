import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

class Student extends Component
{
    state = {
        students: [],
        loading: true,
    }
  async componentDidMount(){
        const res = await axios.get('https://laravel.fosl-ailesgroup.com/api/students');

       
        if(res.data.status === 200)
        {
            this.setState({
                students: res.data.students,
                loading: false,
            });
        }



    }

    deleteStudent = async (e, id) => {
        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Deleting";

        const res =await axios.delete(`https://laravel.fosl-ailesgroup.com/api/delete-student/${id}`);
        if(res.data.status === 200)
        {
            thidClickedFunda.closest("tr").remove();
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "Ok!",
              });
            //console.log(res.data.message);
        }
    }

    render(){

        var student_table = "";
        if(this.state.loading)
        {
            student_table = <tr><td colSpan="7"><h2>Loading.....</h2></td></tr>

        }
        else 
        {
            student_table = 
            this.state.students.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link  to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => this.deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                           
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
                                    <h4>Students Data
                                        <Link to={'add-student'} className="btn btn-primary btn-sm- float-end">Add Student</Link>
                                    </h4>
                                    </div>
                                        <div className="card-body">

                                            <table className="table table-bordered table-stripe">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Course</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {student_table}
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

export default Student;