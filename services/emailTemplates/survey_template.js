const keys = require('../../config/keys');
module.exports = (surveyObject) => {
    return `
    <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${surveyObject.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/survey/response/${surveyObject.id}?yes=true">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/survey/response/${surveyObject.id}?no=true">No</a>
        </div>
      </div>
    </body>
  </html>`
}