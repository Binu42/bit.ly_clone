import React, { Component } from 'react'
import { Employees } from '../../../api/employee'
import { createContainer } from 'meteor/react-meteor-data'
import EmployeeDetails from './EmployeeDetails'

const per_page = 20;
class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    this.page++;
  }

  render() {
    return (
      <div>
        {this.props.employees.map(employee => {
          <EmployeeDetails key={employee._id} employee={employee} />
        })}

        <button onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary">
          Load More...
        </button>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('employees', per_page);
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);