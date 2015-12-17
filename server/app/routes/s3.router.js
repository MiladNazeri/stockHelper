    var router = require('express').Router();
    var aws = require('aws-sdk');
    var fs = require('fs')


    if (process.env.NODE_ENV === 'production'){
    var AWS_ACCCES_KEY_ID = process.env.AWS_ACCESS_KEY_ID
    var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
    var S3_BUCKET = process.env.S3_BUCKET
    } else
    {
        var AWS_ACCCES_KEY_ID = fs.readFileSync(__dirname + '/../../../key.pem').toString();
        var AWS_SECRET_ACCESS_KEY = fs.readFileSync(__dirname + '/../../../cert.pem').toString();
        var S3_BUCKET = fs.readFileSync(__dirname + '/../../../bucket.pem').toString();
    }

    aws.config.update({accessKeyId: AWS_ACCCES_KEY_ID  , secretAccessKey: AWS_SECRET_ACCESS_KEY });
    aws.config.update({region: 'us-west-2' , signatureVersion: 'v4' });



    router.post('/sign_s3', function(req,res){
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.body.filename,
        Expires: 60,
        ContentType: req.body.filetype,
        ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function (err,data) {
            if(err){
                console.log(err);
            }
            else {
                console.log("s3 getsignedUrl", data)
                res.send(data)
            }

        })
    })

    router.post('/upload_s3', function(req,res){
    console.log("req.body:",req.body)
    var s3 = new aws.S3( { params: {Bucket: S3_BUCKET} } );
    console.log("Buffer:", Buffer)
    var buf = new Buffer(req.body.file,'base64')
    console.log("this is buf:", buf)
     var data = {
    Key: req.body.filename,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
    };

    s3.putObject(data, function(err, data){
          if (err) {
            console.log(err);
            console.log('Error uploading data: ', data);
          } else {
            console.log('succesfully uploaded the image!');
          }
      });

    })

    module.exports = router
