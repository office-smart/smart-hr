'use strict'

import parameters from './parameters'
import { version, description, contacts, license } from '../../../package.json'
const baseurl = (process.env.BASEURL || '')

const info = {
  title: 'Smart HR',
  version,
  description,
  contact: contacts,
  license: {
    name: license
  }
}

const tags = [
  {
    name: 'Authentication',
    description: 'Everything About Authentication',
    externalDocs: {
      description: '',
      url: ''
    }
  },
  {
    name: 'Accounts',
    description: 'Everything About Accounts'
  },
  {
    name: 'Company',
    description: 'Everything About Company',
    externalDocs: {
      description: '',
      url: ''
    }
  },
  {
    name: 'Employees',
    description: 'Everything About Employees',
    externalDocs: {
      description: '',
      url: ''
    }
  }
]

export default {
  swagger: '2.0',
  info,
  host: baseurl,
  basePath: '/api/v1',
  tags,
  schemes: [
    'http',
    'https'
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Logs user into the system',
        description: '',
        operationId: 'loginUser',
        produces: [
          'application/json'
        ],
        parameters: [
          parameters['f-username'],
          parameters['f-password']
        ],
        responses: {
          200: {
            description: 'successful operation',
            headers: {
            },
            schema: {
              type: 'string'
            }
          },
          400: {
            description: 'Invalid username/password supplied'
          }
        }
      }
    },
    '/auth/logout': {
      get: {
        tags: [
          'Authentication'
        ],
        summary: 'Logs out current logged in user session',
        description: '',
        operationId: 'logoutUser',
        produces: [
          'application/json'
        ],
        parameters: [],
        security: [
          {
            api_key: true
          }
        ],
        responses: {
          default: {
            description: 'successful operation'
          }
        }
      }
    },
    '/company/information': {
      get: {
        tags: [
          'Company'
        ],
        summary: 'Company Information By Auth',
        description: 'Get Information About Company By Authentication Token',
        parameters: [],
        responses: {
          400: {
            description: 'Bad Request'
          }
        },
        security: [
          {
            api_key: true
          }
        ]
      }
    }
  },
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'smart-token',
      in: 'header'
    }
  },
  definitions: {}
}
