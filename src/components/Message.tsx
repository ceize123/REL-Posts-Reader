import { Box, Typography } from '@mui/material'

interface prop {
	msg: string;
}

const Message: React.FC<prop> = ({ msg }) => {
	return (
		<Box
			mt={3}
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
		>
			<Typography
				variant='h2'
			>
				{msg}
			</Typography>
		</Box>
	)
}

export default Message