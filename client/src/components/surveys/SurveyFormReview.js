import React, { Component } from 'react';
import { connect } from 'react-redux';
const SurveyForm = ({ onCancel }) => {
    return(
        <div>
            <h5>Please Confirm Your Entries</h5>
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
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyForm);