import { Box, Typography } from '@mui/material'

interface msg {
	msg: string
}

const Message: React.FC<msg> = ({ msg }) => {
	const outputs = msg.split('. ')
	return (
		<Box mt={3} >
			{outputs.map((output, idx) => {
				return (
					<Typography
						key={idx}
						align='center'
						variant='h2'
					>
						{output}
					</Typography>
				)
			})}
		</Box>
	)
}

export default Message