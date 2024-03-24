/**
* Sends an email
*/

<script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>

const CLIENT_ID = 'REDACTED';
const API_KEY = 'REDACTED';
const TO_EMAIL = "REDACTED"

/**
* Callback after api.js is loaded.
*/
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
* Callback after the API client is loaded. Loads the
* discovery doc to initialize the API.
*/
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

async function send_email() {
    let response;
    // Note the from email must be the email address of the user who has authorized this code.
    const message =
        "From: test@test.com\r\n" +
        "To: test@test.com\r\n" +
        "Subject: As basic as it gets\r\n\r\n" +
        "This is the plain text body of the message.  Note the blank line between the header information and the body of the message.";


    // The body needs to be base64url encoded.
    const encodedMessage = btoa(message)
    const reallyEncodedMessage = encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    try {
        const response = await gapi.client.gmail.users.messages.send({
            userId: 'me',
            resource: {
                raw: encodedMessage
            }
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
        const messageId = response.id;
        if (!messageId) {
        document.getElementById('content').innerText = 'Message not sent.';
        return;
    }
        document.getElementById('content').innerText = 'Message sent: ' + messageId + "\n";
    }
