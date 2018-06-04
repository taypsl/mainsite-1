const functions = require('./chatFunctions.js');
const fs = require('fs');
const opn = require('opn');
const path = require('path');
const config = require('../config/main.js');
let ai, caseType;

/*set the ai temporarily to small claims agent only*/
// ai = aiSmallClaims;
//TEST_SmallClaims
// ai = apiai('1e399876a4544a4ba6f941e320b43ef7');
//Courntey_SmallClaims
// ai = apiai('8fcfe02fdf5b42628700e6458795e6d4');


// const projectId = "courtney-smallclaims-test"; //no need to provide projectId, already in json file
const dialogflow = require('dialogflow').v2beta1;
// const keyFilename = process.env.KEY_FILENAME_PATH;
// const environmentId = process.env.ENVIRONMENT_ID;
const user = '-';
//language hard-coded as "en-US" for now
const languageCode = 'en-US';
//import json to gRPC struct converter
// const structjson = require('./structjson.js');
// const sessionClient = new dialogflow.SessionsClient({keyFilename: path.join(__dirname, config.keyFilename)});
const options = { 
  credentials : {
    client_email: config.clientEmail,
    private_key: config.privateKey
  }
}
const sessionClient = new dialogflow.SessionsClient(options);


//import events dictionary
const events = require('../buttons2Events.js').buttons2Events;


exports.selectCaseType = (req, res, callback) => {
    if (req.body.ai === false){
      //check existing case types
      switch (req.body.payload.message.toLowerCase()) {
        case "small claims":
          ai = aiSmallClaims;
          caseType = "Small Claims";
          break;
        case "guardianship":
          ai = aiGuardianship;
          caseType = "Guardianship";
          break;
        default:
          ai = aiGeneral;
          caseType = "General";
      }

    //machine learning goes here
    //either 1) the general inquiry bot which can be used to determine case types or 
    //2) a result of my own machine learning algo
    //either way the later calls will have to be a callback function for this
    }
    
    callback(req, res);
  };




exports.getMessageResponse = (req, res) => {

      {
        // console.log('/message', req.body);
        //to launch a webpage in user default browser
        if (req.body.url){
          opn(req.body.url);
          res.writeHead(200);
          res.end(JSON.stringify({speech:'Here you are! Let me know if you have more questions'}));
          return;
        }
        
        const sessionId = req.body.id;
        // const options = {sessionId: req.body.id};
        const sessionPath = process.env.NODE_ENV === 'prod' ?
        //a stable version
        sessionClient.environmentSessionPath(config.projectId, config.environmentId, config.user, sessionId) : 
        //the draft version
        sessionClient.sessionPath(config.projectId, sessionId);

        console.log("SessionPath: ", sessionPath);

        //sends event request to api.ai and response to front end
        // console.log("event: ", req.body.payload.message);
        if (req.body.payload.type=='button'){
          // const events = JSON.parse(fs.readFileSync(path.join(__dirname, '../static_files/bot_buttons_and_events.json')));
          const ev = {};
          const msg = req.body.payload.message;
          if (msg in events){
            // console.log(msg);
            ev.name=events[msg].name;
            ev.data=events[msg].data;
            console.log(ev.name);
          }else{
            return;
          }

          
          const request = {
            session: sessionPath,
            queryInput: {
              event: {
                name: ev.name,
                // parameters: structjson.jsonToStructProto({}),
                languageCode: languageCode
              }
            }
          };

          sessionClient
            .detectIntent(request)
            .then(responses => {
              // console.log(JSON.stringify(responses));
              res.send(responses[0].queryResult);
            })
            .catch(err => {
              console.log("Error: ", err)
            });

         }
        //send text request to api.ai 
        else if (req.body.payload.type=='text'){
          const request = {
            session: sessionPath,
            queryInput: {
              text: {
                text: req.body.payload.message,
                languageCode: languageCode
              }
            }
          };

          sessionClient
            .detectIntent(request)
            .then(responses => {
              // console.log('Detected intent');
              // console.log("Response", JSON.stringify(responses));
              const result = responses[0].queryResult;
              res.send(result);
            })
            .catch(err => {
              console.log("error: ", err)
            })         
        }
        //send voice request to api.ai
        // else{
        //   const request_to_ai = ai.voiceRequest(options);
        //   request_to_ai.on('response', (response_from_ai)=>{
        //     // console.log('Response:', response_from_ai);
        //     const code = response_from_ai.status.code;
        //     res.writeHead(code);
        //     if (code == 200){
        //       res.end(JSON.stringify(response_from_ai));
        //     }   
        //     res.end();
        //   });
        //   request_to_ai.on('error', (error)=> {
        //     console.error("Error:", error)
        //   } );
          
        //   //req.body.message is supposed to be a audio file path
        //   fs.readFile(req.body.payload.message, function(error, buffer) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     request_to_ai.write(buffer);
        //   }

        //   request_to_ai.end();
        //   });
          
        // }

      }
    };


exports.getWebhookResponse = (req, res)=>{
    const action = req.body.queryResult.action;
    // console.log("outputContexts: ", req.body.queryResult.outputContexts);
    // // console.log('action: ', action);
    // console.log('parameters: ', req.body.queryResult.parameters)
    // let response = {};
    //response is the argument passed into this function, 
    //res is the argument passed into the outer most function above
    const respondToAPI = (response)=>{
      response['caseType'] = caseType;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    };

    switch (action){
      case 'small_claims.court_lookup':
        console.log("court_lookup chosen");
        functions.small_claims_court_lookup(req.body.queryResult.parameters, respondToAPI);
        break;

      // case 'small_claims.sue_gov.resources':
      //   console.log("small claims sue gov resources chosen");
      //   response = functions.small_claims_sue_gov_resource(req.body.queryResult.parameters);
      //   // console.log('Response Object:', response);
      //   break;
        
      case 'LL_agent_of_service_lookup':
      //this is async!
        console.log("LL_agent_of_service_lookup chosen");
        // const callback = (res) => {return res;};
        console.log("queryResult: ", JSON.stringify(req.body.queryResult));
        functions.agent_of_service_lookup(req.body.queryResult.queryText, 'LPLLC', respondToAPI);//set callback to send response to api.ai      
        // console.log('Response Object:', response);
        break;
        
      case 'CORP_agent_of_service_lookup':
      //this is async!
        console.log("CORP_agent_of_service_lookup chosen");
        // const callback = (res) => {return res;};
        functions.agent_of_service_lookup(req.body.queryResult.contexts, 'CORP', respondToAPI);//set callback to send response to api.ai     
        // console.log('Response Object:', response);
        break;
      
      default:
        console.log("Error: no such function exists.");
    }   
    
    
  };



/*

const Conversation = require('../models/conversation'),
  Message = require('../models/message'),
  User = require('../models/user');


exports.getConversations = function (req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec((err, conversations) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      const fullConversations = [];
      conversations.forEach((conversation) => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
          })
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
};

exports.getConversation = function (req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'profile.firstName profile.lastName'
    })
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ conversation: messages });
    });
};

exports.newConversation = function (req, res, next) {
  if (!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }

  if (!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save((err, newMessage) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
    });
  });
};

exports.sendReply = function (req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save((err, sentReply) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Reply successfully sent!' });
  });
};
*/