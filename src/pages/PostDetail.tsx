import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { IParams, Post } from '../types'
import PDCard from '../components/PDCard'
import Message from '../components/Message'
import Container from '@mui/material/Container'
import { Box, Button, Typography } from '@mui/material'

const PostDetail: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const [postDetail, setPostDetail] = useState<Post[]>([])
	const { id } = useParams<IParams | any>();
	
	useEffect(() => {
		axios({
			method: 'GET',
			url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
		}).then(res => { 
			setPostDetail(res.data)
			setLoading(false)
		}).catch(e => {
			if (axios.isCancel(e)) return
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
				<Link to={'/'} style={{textDecoration: 'none'}}>
					<Button variant='contained'>
							<Typography color='common.white'>Go Back</Typography>
					</Button>
				</Link>
			</Box>
		</Container>
	)
}

export default PostDetail