import { Box, Typography } from '@mui/material'
import {Posts} from '../types'

const PostsCard: React.FC<Posts> = (post) => {
	return (
		<Box
			my={3} p={2} border={1} borderRadius={3}
			sx={{ '&:hover': { cursor: 'pointer' } }}
		>
			<h2>{post.id}</h2>
			<Typography mb={2} variant='h2'>{post.title}</Typography>
			<Typography>
					{post.body.substring(0, 100)}{post.body.length > 100 && '...'}
			</Typography>
		</Box>
	)
}

export default PostsCard