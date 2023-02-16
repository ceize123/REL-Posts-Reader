import { Box, Typography } from '@mui/material'
import { Posts } from '../types'

const PostsCard: React.FC<Posts> = ({ id, title, body }) => {
  return (
    <Box
      my={3}
      p={2}
      border={1}
      borderRadius={3}
      sx={{
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'primary.main',
          opacity: 0.8,
        },
        backgroundColor: 'primary.main',
        borderColor: 'primary.dark',
      }}
    >
      <Typography mb={1}>Post: {id}</Typography>
      <Typography mb={2} variant='h1'>
        {title}
      </Typography>
      <Typography variant='h2'>
        {body.substring(0, 100)}
        {body.length > 100 && '...'}
      </Typography>
    </Box>
  )
}

export default PostsCard
