import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Post } from '../types'
import PDCard from '../components/PDCard'
import Message from '../components/Message'
import ErrorAlert from '../components/ErrorAlert'
import Container from '@mui/material/Container'
import { Box, Button, Typography } from '@mui/material'
import PostDataService from '../services/post.service'

const PostDetail: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [postDetail, setPostDetail] = useState<Post[]>([])
	const { id } = useParams<string | any>();
	const location = useLocation();
	const {title, body} = location.state
	
	useEffect(() => {
		setLoading(true)

		PostDataService.getComment(id)
			.then((res: any) => {
				setPostDetail(res.data)
				setLoading(false)
			}).catch(() => {
				setLoading(false)
				setError(true)
			})
	}, [id])

	if (loading) return <Message msg='Loading...' />
	return (
		<>
		<Container maxWidth='lg'>
				<Box my={5} mx={{ sm: 5 }} px={{ xs: 1.5, sm: 5 }} py={3} border={1} borderRadius={3}
				sx={{
					backgroundColor: 'primary.main',
					borderColor: 'primary.dark'
				}}
			>
					<Box>
						<Typography mb={1}>Post: {id}</Typography>
						<Typography mb={2} variant='h1'>{title}</Typography>
						<Typography variant='h2'>{body}</Typography>
					</Box>
					<Box pt={5}>
						<Typography className='text-title' display='inline' zIndex='10'>Comment:</Typography>
						{postDetail.length > 0
							&& postDetail.map((pDetail, idx) => {
							return (
								<PDCard key={idx} {...pDetail} />
							)
						})}
					</Box>
			</Box>
			{!error &&
				<Box my={3}
					display='flex'
					justifyContent='center'
				>
					<Link to={'/'} style={{textDecoration: 'none'}}>
							<Button variant='contained'
								sx={{
									'&:hover': {
										backgroundColor: '#000',
										opacity: 0.8,
									},
									backgroundColor: '#000'
								}}
							>
							<Typography color='common.white'>Go Back</Typography>
						</Button>
					</Link>
				</Box>
			}
		</Container>
		{error && !loading &&
			<ErrorAlert />
		}
		</>
	)
}

export default PostDetail