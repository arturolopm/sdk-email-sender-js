import CreateClientForm from './forms/CreateClientForm'
import CreateUserForm from './forms/CreateUserForm'
import CreateLicenseForm from './forms/CreateLicenseForm'

const Admin = () => {
  return (
    <div className='flex flex-wrap'>
      <CreateUserForm />
      <CreateClientForm />
      <CreateLicenseForm />
    </div>
  )
}

export default Admin
