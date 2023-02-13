import { Typography } from '@mui/material'

interface prop {
	msg: string;
}

const Message: React.FC<prop> = ({ msg }) => {
	return (
		<Typography
			mt={3}
			align='center'
			variant='h2'
		>
			{msg}
		</Typography>
	)
}

export default Message