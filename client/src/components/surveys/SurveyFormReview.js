import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyForm = ({ onCancel, formValues }) => {
    
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
            className="yellow darken-3 btn-flat"
            onClick={onCancel}
            >
                Back
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }; // pass formValues as a prop to SurveyFormReview component
}

export default connect(mapStateToProps)(SurveyForm);