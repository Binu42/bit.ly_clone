import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../../api/employee'
import EmployeeDetail from './EmployeeDetails';

const PER_PAGE = 20;

class EmployeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  handleButtonClick() {
    console.log(this.state.page)
    Meteor.subscribe('employees', PER_PAGE * (this.state.page + 1));
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    // props.employees => an array of employee objects
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} Employee={employee} />
          )}
        </div>
        <button onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary">
          Load More...
        </button>
      </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('employees', 20);

  return { employees: Employees.find({}).fetch() };
})(EmployeeList);
