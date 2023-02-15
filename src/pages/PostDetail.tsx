import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { IParams, Post } from '../types'
import PDCard from '../components/PDCard'
import Message from '../components/Message'
import ErrorAlert from '../components/ErrorAlert'
import Container from '@mui/material/Container'
import { Box, Button, Typography } from '@mui/material'

const PostDetail: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [postDetail, setPostDetail] = useState<Post[]>([])
	const { id } = useParams<IParams | any>();
	
	useEffect(() => {
		const urls = [
			`https://jsonplaceholder.typicode.com/posts/${id}/comments`,
			`https://jsonplaceholder.typicode.com/posts/${id}`,
		];

		const requests = urls.map((url) => axios.get(url));
		setLoading(true)
		axios.all(requests).then(res => {
			// Adding post title and body to comments data
			const post = res[0].data
			setPostDetail(post)
			setLoading(false)
		}).catch(e => {
			setLoading(false)
			setError(true)
		})
	}, [id])

	if (loading) return <Message msg='Loading...' />
	return (
		<Container maxWidth='lg'>
			<Box  my={5} mx={{sm: 5}}>
				{postDetail.length > 0
					&& postDetail.map((pDetail, idx) => {
					return (
						<PDCard key={idx} {...pDetail} />
					)
				})}
				{error && !loading &&
					<ErrorAlert />
				}
				{!error &&
				<Box mt={3}
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
			</Box>
		</Container>
	)
}

export default PostDetail