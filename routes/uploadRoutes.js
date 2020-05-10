const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')
const keys = require('../config/keys')

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'ap-south-1'
})

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'nodejs-advanced-s3-bucket',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        if (err) {
          res.status(403).send(err)
        } else {
          res.status(201).send({ key: key, url: url })
        }
      }
    )
  })
}
