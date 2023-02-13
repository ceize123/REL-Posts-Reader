import { Typography } from '@mui/material'
import { Post } from '../types'
import { Box } from '@mui/material'

const PDCard: React.FC<Post> = ({name, email, body}) => {
	return (
		<Box my={3} p={2} border={1} borderRadius={3}>
			<Typography mb={1} variant='h2'>{name}</Typography>
			<Typography mb={2} variant='h3'>{email}</Typography>
			<Typography>Comment:</Typography>
			<Typography>{body}</Typography>
		</Box>
	)
}

export default PDCard