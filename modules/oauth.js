const {google} = require("googleapis");
const dotenv = require('dotenv');
dotenv.config({});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
    process.env.API_KEY
);

//oauth2Client.setCredentials({refresh_token: '1//04QoPV-LBcGr9CgYIARAAGAQSNwF-L9Ir29a-AgksEQ-rqcE7TmLeZokfvSnRM3YgTPr97Qet0ioPO2zsE3vUWXR_tGtb0WLyfvQ'});
//const generateAuthUrl = () => {
   // const scopes = ['https://www.googleapis.com/auth/calendar'];
 //   const redirectUri = process.env.REDIRECT_URI;
    //return oauth2Client.generateAuthUrl({
        //access_type: 'offline',

//    });
//};

module.exports = {
    oauth2Client: oauth2Client,
    //generateAuthUrl,
//    getClient: () => oauth2Client, // You can expose the client if needed
};


//755813404386-ibhr03kb4i4qo1dge9d6ib5fpesd1ona.apps.googleusercontent.com
//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