import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // allows our component to communicate with redux store
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';

const FIELDS = [
    { label: 'Campaign Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'recipients' }
];
class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}


function validate(values) {
    const errors = {}; // errros if occured
    errors.recipients = validateEmails(values.recipients || '');
    FIELDS.forEach(({ name }) => {
        if (!values[name])
            errors[name] = 'You must provide a value';
    });
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);