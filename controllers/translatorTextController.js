var request = require('request');
const uuidv4 = require('uuidv4');
const config = require('../config');

exports.languages = function(req, res) {
    const response = res;
    /* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-languages */
    let options = {
        method: 'GET',
        baseUrl: 'https://api.cognitive.microsofttranslator.com/',
        url: 'languages',
        qs: {
          'api-version': '3.0',
        },
        headers: {
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        json: true,
    };

    request(options, function(err, res, body){
        if (err) {
            response.status(400).send(err);
        }
		response.status(200).send(JSON.stringify(body, null, 4));
    });

}

exports.translate = function(req, res) {
    const text = req.params.text;
	const response = res;

	const subscriptionKey = config.azure.AzureTranslatorTextKey;

	let options = {
		method: 'POST',
		baseUrl: 'https://api.cognitive.microsofttranslator.com/',
		url: 'translate',
		qs: {
		  'api-version': '3.0',
		  'to': 'it',
		//   'to': 'de',
		  'to': 'ro'
		},
		headers: {
		  'Ocp-Apim-Subscription-Key': subscriptionKey,
		  'Content-type': 'application/json',
		  'X-ClientTraceId': uuidv4().toString()
		},
		body: [{
			  'text': text
		}],
		json: true,
	};

	request(options, function(err, res, body){
        if (err) {
            response.status(400).send(err);
        }
		response.status(200).send(JSON.stringify(body, null, 4));
	});
}