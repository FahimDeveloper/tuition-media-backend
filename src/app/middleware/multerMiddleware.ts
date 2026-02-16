import multer from 'multer'

const storage = multer.diskStorage({})

export const upload = multer({ storage })

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: config.s3_access_key as string,
//     secretAccessKey: config.s3_secret_key as string,
//   },
// })

// export const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'some-bucket',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname })
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     },
//   }),
// })
