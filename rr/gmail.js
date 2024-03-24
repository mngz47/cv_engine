/**
* Sends an email
<script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>

*/

const CLIENT_ID = '193722168581-49fije8tfhsigqv85c0rh5iu5tgsjsh3.apps.googleusercontent.com';
const API_KEY = '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';

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
        apiKey: API_KEY
   //     discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
   // maybeEnableButtons();
}

/**
* Callback after Google Identity Services are loaded.
*/
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
     //   scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
   // maybeEnableButtons();
}

async function send_email(email,data) {
    let response;
    // Note the from email must be the email address of the user who has authorized this code.
    const message =
        "From: mngz636@gmail.com\r\n" +
        "To: "+email+"\r\n" +
        "Subject: My CV\r\n\r\n" +
        data;


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
