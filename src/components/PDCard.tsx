import { Box, Typography } from '@mui/material'
import { Post } from '../types'
import profileImg from '../image/profileImg.png'

const PDCard: React.FC<Post> = ({name, email, body}) => {
	return (
		<Box
			my={3} p={2} border={1} borderRadius={3}
			sx={{
				backgroundColor: 'primary.main',
				borderColor: 'primary.dark'
			}}
		>
			<Typography mb={1} variant='h1'>{name}</Typography>
			<Box
				mb={2}
				display='flex'
				alignItems='center'
			>
				<img src={profileImg} alt='profile' />
				<Typography ml={1}>{email}</Typography>
			</Box>
			<Typography className='comment-text' display='inline' zIndex='10'>Comment:</Typography>
			<Typography variant='h2'>{body}</Typography>
		</Box>
	)
}

export default PDCard