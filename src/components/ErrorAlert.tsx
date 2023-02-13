import Message from './Message'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ErrorAlert: React.FC = () => {
	const Error = withReactContent(Swal)

	Error.fire({
		width: '60%',
		title: <Message msg='Something went wrong...' />,
		icon: 'error',
		confirmButtonText: 'Refresh',
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.reload()
		}
	})


	return (
		<></>
	)
}

export default ErrorAlert