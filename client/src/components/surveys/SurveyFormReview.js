import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from  '../../actions';
const SurveyFormReview = ({ onCancel, formValues, sumbitSurvey }) => {

    const reviewFields = formFields.map(({ name, label }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>
              {formValues[name]}
            </div>
          </div>
        );
      });

    return(
        <div>
            <h5>Please Confirm Your Entries</h5>
            {reviewFields}
            <button
            className="yellow darken-3 white-text btn-flat"
            onClick={onCancel}
            >
                Back
            </button>
            <button 
            onClick={() => sumbitSurvey(formValues)}
            className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }; // pass formValues as a prop to SurveyFormReview component
}

export default connect(mapStateToProps, actions)(SurveyFormReview);