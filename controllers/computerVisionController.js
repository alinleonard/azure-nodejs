var request = require('request');
const config = require('../config');

exports.vision = function(req, res) {
        // Replace <Subscription Key> with your valid subscription key.
    const subscriptionKey = config.azure.Vision;
    const response = res;

    // You must use the same location in your REST call as you used to get your
    // subscription keys. For example, if you got your subscription keys from
    // westus, replace "westcentralus" in the URL below with "westus".
    const uriBase =
        'https://westeurope.api.cognitive.microsoft.com/vision/v2.0/analyze';

    const imageUrl = req.body.image;

    // Request parameters.
    const params = {
        'visualFeatures': 'Categories,Description,Color',
        'details': '',
        'language': 'en'
    };

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, res, body) => {
    if (error) {
        console.log('Error: ', error);
        return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
        response.status(200).send(jsonResponse);
    });
}