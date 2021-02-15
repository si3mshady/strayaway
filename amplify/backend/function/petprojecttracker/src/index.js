const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event.body)}`);

  return  {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true,
      "Access-Control-Allow-Methods": "*" // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ "message": "Hello World!" })
  };
  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
