const ocr = require('ocr');
// const WordFilter = require('word-filter');
const HashSet = require('hashset');
const fs = require('fs');

exports.extractWords = (req, res) => {
    var image = "C:\\Users\\rajp4\\Desktop\\Hackathon2018\\sample.bmp";
    console.log("You are in the backend");
    if (image === undefined || image === ''){
        console.log("Incomplete request");
        res.status(400).json({"error":"Incomplete request"});
    }
    console.log("req.body: ",image);
    // Set default values.  
    var params = {
        input: image,
        output: './out.txt',
        format: 'text'
    };
    var wordArray =[];
    console.log("param input: ",params.input);
    function afterOCR (err, doc) {
        if (err) {
            console.log("something happend at the backend");
            console.log('\t' + err);
            res.status(400).json({"error":err});
        }
        // Output a message letting the user know we were successful.
        console.log('Successfully finished recognizing the image');
        // Create an array with just the words.
        var hash = new HashSet();
        doc.getWords().map(function(element) {
            hash.add(element.text.toLowerCase());
        });
        // Display the words.
        wordArray = hash.toArray();
        console.log('These are the words in your images:');
        console.log(wordArray);
        var stringWordArray = JSON.stringify(wordArray);
            res.status(200).json(
                {
                    "words":wordArray
                }
            );
    }
    ocr.recognize(params, afterOCR);
    console.log('The words in your image are automatically being detected');
    console.log(wordArray);
}

exports.getDefinition = (req, res) => {
    var url1 = "http://api.wordnik.com:80/v4/word.json/";
    var word = req.body.word;
    var url2 = "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";


    var request = require("request")

    var url = url1 + word + url2;

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body[0].text) // Print the json response
            res.status(200).json({"word":body[0].text});
        }
    });
}