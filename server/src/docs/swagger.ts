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
      user: {
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
      }
    }
  }
}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['../routes/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
