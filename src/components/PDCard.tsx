import { Box, Typography } from '@mui/material'
import { Post } from '../types'
import profileImg from '../image/profileImg.png'

const PDCard: React.FC<Post> = ({ name, email, body }) => {
  return (
    <Box
      pb={1}
      my={3}
      sx={{
        borderBottom: 1,
        borderColor: 'secondary.main',
      }}
    >
      <Typography mb={1} variant='h2'>
        {name}
      </Typography>
      <Box mb={1} display='flex' alignItems='center'>
        <img src={profileImg} alt='profile' width='32' height='32' />
        <Typography ml={1}>{email}</Typography>
      </Box>
      <Box pl={5}>
        <Typography variant='h2'>{body}</Typography>
      </Box>
    </Box>
  )
}

export default PDCard
