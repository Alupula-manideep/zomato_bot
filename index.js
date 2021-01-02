// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require('./db')
const api = require('./apis');
const promptData = require('./data.json')
require('dotenv').config()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes);


const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const { object } = require('firebase-functions/lib/providers/storage');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
const agent = new WebhookClient({ request, response });
console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

var username = 'batman';
var data = []

let base_url = process.env.base_url
async function locationid(){

let city = "karimnagar"
let response = await api.getLocationId(city) 
console.log("hhhhh",JSON.stringify(response));

}
locationid();
function welcome(agent) {
agent.add(`Welcome to my agent!`);
agent.add(`what is your name`);



}

function fallback(agent) {
agent.add(`I didn't understand`);
agent.add(`I'm sorry, can you try again?`);
}



function name(agent)

{
    

  data.push({
    "BOT":"what is your name",
    "User":`${agent.query}`
})


console.log("body123",data,data.length)


//  return api.postChat(username,chat).then(res => {

    // console.log("hhhhhhhhhhhhhh",res,name)



    agent.add(`What is your mobile number?`);
// })


}


function mobile(agent){

    


    data.push({
        "BOT":"Please provide your mobile number?",
        "User":`${agent.query}`
    })
    console.log("data",data, data.length)

   agent.add(promptData.type.prompt)
   let ans = Object.keys(promptData.type.ans)
   console.log("answers",ans)
   ans.forEach(e => {

    let x = new Suggestion(`${e}`)
        agent.add(x)
       
   });


    
}


//   if(request.body.queryResult.queryText === 'veg') {
    function veg(agent){
        agent.add(promptData.veg.prompt)


     return api.getVeg().then(res =>{
        console.log('getveg====>=>', res)

   
        res.forEach(e=>{
           let x= e.food
           console.log("x",x)
           agent.add( new Suggestion(`${x}`))
        })


     })
  
}
  


  

function nonveg(agent){

    agent.add(promptData.nonveg.prompt);
    return api.getNonVeg().then(res=>{
        console.log("hhhhhhhhhh",res)
        res.forEach(e=>{
            let x = e.item_name
            console.log('x',x);
            agent.add(new Suggestion(`${x}`))
        })
        
    })
}

   
   function sweets(agent){
        agent.add(promptData.sweets.prompt)
       return api.getSweets().then(res=>{
          console.log("hhhhhhhhhh",res)

           res.forEach(e=>{
               let x = e.food
            
              agent.add(new Suggestion(`${x}`))
           })

         })
  }
   function chocolate(agent){
        agent.add(promptData.chocolate.prompt)
       return api.getChocolate().then(res=>{
          console.log("ggggggggggggg",res)
           res.forEach(e=>{
               let x = e.food
               agent.add(new Suggestion(`${x}`))
           })
       })
    }
    function juice(agent){
        agent.add(promptData.chocolate.prompt)
        return api.getJuice().then(res=>{
            res.forEach(e=>{
                let x = e.food
                agent.add(new Suggestion(`${x}`))
            })
        })
    }




// // Uncomment and edit to make your own intent handler
// // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
// // below to get this function to be run when a Dialogflow intent is matched
// function yourFunctionHandler(agent) {
// agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
// agent.add(new Card({
// title: `Title: this is a card title`,
// imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
// text: `This is the body text of a card. You can even use line\n breaks and emoji! 💁`,
// buttonText: 'This is a button',
// buttonUrl: 'https://assistant.google.com/'
// })
// );
// agent.add(new Suggestion(`Quick Reply`));
// agent.add(new Suggestion(`Suggestion`));
// agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
// }

// // Uncomment and edit to make your own Google Assistant intent handler
// // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
// // below to get this function to be run when a Dialogflow intent is matched
// function googleAssistantHandler(agent) {
// let conv = agent.conv(); // Get Actions on Google library conv instance
// conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
// agent.add(conv); // Add Actions on Google library responses to your agent's response
// }
// // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
// // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

// Run the proper function handler based on the matched Dialogflow intent name
let intentMap = new Map();
intentMap.set('Default Welcome Intent', welcome);
intentMap.set('Default Fallback Intent', fallback);
intentMap.set('name',name);
intentMap.set('mobile',mobile);
intentMap.set('type1',veg);
intentMap.set('type2',nonveg);
intentMap.set('type3',sweets);
intentMap.set('type4',chocolate);
intentMap.set('type5',juice);







 //intentMap.set('your intent name here', googleAssistantHandler);
agent.handleRequest(intentMap);
});
app.post('/', exports.dialogflowFirebaseFulfillment)

app.listen( 3000, function () {
    console.log("server is running on port 3000")
})