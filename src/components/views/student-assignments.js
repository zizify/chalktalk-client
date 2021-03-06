import React from 'react';
import DaysWeek from './days-week';
import AssignmentBar from './assignment-bar';
import { connect } from 'react-redux';

export class StudentAssignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0
    };
  }

  clickDayLink = e => {
    this.setState({
      day: parseInt(e.target.id, 10)
    });
  };

  findRelevantAssignments = view => {
    let date = '';

    if (view === 'new') {
      date = 'assignDate'
    } else if (view === 'upcoming') {
      date = 'dueDate'
    }

    let relevantAssignments = this.state.day 
        ? this.props.assignments.filter(each => each[date].weekday === this.state.day) 
        : this.props.assignments;
    return relevantAssignments;
  }

  render() {
    return (
      <div className="assignment-view">
        <DaysWeek clickDayLink={this.clickDayLink} />
        <AssignmentBar bars={this.findRelevantAssignments(this.props.view)}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.students.data.student.relevant
  };
};

export default connect(mapStateToProps)(StudentAssignments);
