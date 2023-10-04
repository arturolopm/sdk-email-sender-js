import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'API Email SDK Sender Documentation',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:8080/'
    }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['first_name', 'last_name', 'email_address', 'isStaff'],
        properties: {
          first_name: {
            type: 'string'
          },
          last_name: {
            type: 'string'
          },
          email_address: {
            type: 'string'
          },
          isStaff: {
            type: 'boolean'
          }
        }
      },
      Client: {
        type: 'object',
        required: ['poc_email', 'poc_name', 'admin_poc'],
        properties: {
          poc_name: {
            type: 'string'
          },
          poc_email: {
            type: 'string',
            unique: true
          },
          admin_poc: {
            type: 'integer',
            description:
              'The ID of the user who is the primary admin for this client.',
            references: {
              model: 'User',
              key: 'id'
            }
          }
        }
      },
      License: {
        type: 'object',
        required: ['package', 'license_type', 'client_id'],
        properties: {
          package: {
            type: 'string',
            enum: ['javascript_sdk', 'ios_sdk', 'android_sdk']
          },
          license_type: {
            type: 'string',
            enum: ['production', 'evaluation']
          },
          client_id: {
            type: 'integer',
            references: {
              model: 'Client',
              key: 'id'
            }
          },
          created_datetime: {
            type: 'date'
          },
          expiration_datetime: {
            type: 'date'
          }
        }
      },
      Email: {
        type: 'object',
        required: ['sent_at', 'license_id'],
        properties: {
          sent_at: {
            type: 'date'
          },
          license_id: {
            type: 'integer',
            references: {
              model: 'License',
              key: 'id'
            }
          }
        }
      }
    }
  }
}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['**/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
