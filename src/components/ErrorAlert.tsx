import Message from './Message'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const ErrorAlert: React.FC = () => {
  const Error = withReactContent(Swal)
  const navigate = useNavigate()

  Error.fire({
    width: '60%',
    title: <Message msg='Something went wrong...' />,
    icon: 'error',
    confirmButtonText: 'Refresh',
    confirmButtonColor: '#A673EA',
    showDenyButton: true,
    denyButtonText: 'Homepage',
    denyButtonColor: '#4A4A4A',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload()
    } else if (result.isDenied) {
      navigate('/')
    }
  })

  return <></>
}

export default ErrorAlert
