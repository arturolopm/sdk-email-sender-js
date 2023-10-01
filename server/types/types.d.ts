interface ClientAttributes {
  id: number
  poc_name: string
  poc_email: string
  admin_poc: number | null
}

interface ClientInstance extends Model<ClientAttributes>, ClientAttributes {}

interface LicenseAttributes {
  id: number
  package: string
  license_type: string
  client_id: number
  created_datetime: Date
  expiration_datetime: Date
}

interface LicenseInstance extends Model<LicenseAttributes>, LicenseAttributes {}

interface UserAttributes {
  id: number
  first_name: string
  last_name: string
  email_address: string
  isStaff: boolean
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export { ClientAttributes, LicenseAttributes, UserAttributes }
