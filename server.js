const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()
const taskRoutes = require('./routers/taskRoutes')
const { GridFSBucket } = require('mongodb')
const { MongoClient } = require('mongodb')
const stream = require('stream')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}
let gfs, gridfsBucket
const conn = mongoose.connection

conn.once('open', () => {
  gridfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' })
  gfs = gridfsBucket
  console.log('GridFS is connected...')
})

// Multer storage setup
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
  const readableFileStream = new stream.PassThrough()
  readableFileStream.end(req.file.buffer)

  const uploadStream = gridfsBucket.openUploadStream(req.file.originalname)
  const id = uploadStream.id
  readableFileStream.pipe(uploadStream)

  uploadStream.on('error', () => {
    return res.status(500).json({ message: 'Error uploading file' })
  })

  uploadStream.on('finish', () => {
    return res.status(201).json({ fileID: id })
  })
})

app.get('/file/:id', (req, res) => {
  const fileID = new mongoose.Types.ObjectId(req.params.id)
  const downloadStream = gridfsBucket.openDownloadStream(fileID)

  downloadStream.on('error', () => {
    return res.status(404).json({ message: 'File not found' })
  })

  downloadStream.pipe(res)
})
// File upload setup

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })
// const upload = multer({ storage: storage })

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send('File uploaded successfully')
// })

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected...!'))
  .catch((err) => console.log('Error while connecting DB ', err))

app.use('/tasks', taskRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`)
})
