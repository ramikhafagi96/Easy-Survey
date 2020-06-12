const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);
function sendMail({ subject, recipients }, content) {
    const msg = {
        to: formatAddresses(recipients),
        from: 'ramikh.developer@gmail.com',
        subject: subject,
        html: content,
        trackingSettings: {
            clickTracking: {
                enable: true,
                enableText: true
            }
        }
    };
    //ES8
    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
}

function formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return email;
    });
  }

module.exports = {sendMail};