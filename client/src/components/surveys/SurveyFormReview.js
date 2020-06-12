import React, { Component } from 'react';

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

export default SurveyForm;