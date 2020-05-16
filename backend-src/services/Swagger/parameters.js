export default {
  'f-username': {
    name: 'username',
    in: 'formData',
    description: 'username maybe include number',
    required: true,
    type: 'string'
  },
  'f-password': {
    name: 'password',
    in: 'formData',
    description: 'maybe include aplhanumeric',
    required: true,
    type: 'string'
  }
//   tags: {
//     name: 'tags',
//     in: 'query',
//     description: 'Tags to filter by',
//     required: true,
//     type: 'array',
//     items: {
//       type: 'string'
//     },
//     collectionFormat: 'multi'
//   },
//   petId: {
//     name: 'petId',
//     in: 'path',
//     description: 'ID of pet to update',
//     required: true,
//     type: 'integer',
//     format: 'int64'
//   },
//   file: {
//     name: 'file',
//     in: 'formData',
//     description: 'file to upload',
//     required: false,
//     type: 'file'
//   }
}
