import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { IParams, Post } from '../types'
import PDCard from '../components/PDCard'
import Container from '@mui/material/Container'
import { Box, Button, Typography } from '@mui/material'
import Message from '../components/Message'

const PostDetail: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const [postDetail, setPostDetail] = useState<Post[]>([])
	// const [post, setPost] = useState<{Post: Posts}>()
	const { id } = useParams<IParams | any>();
	
	
	useEffect(() => {
		// const urls = [
		// 	`https://jsonplaceholder.typicode.com/posts/${id}/comments`,
		// 	`https://jsonplaceholder.typicode.com/posts/${id}`,
		// ];
	
		// const requests = urls.map((url) => axios.get(url));
		// setLoading(true)
		// axios.all(requests).then(res => {
		// 	setPostDetail(res[0].data)
		// 	setPost(res[1].data)
		// 	setLoading(false)
		// }).catch(e => {
		// 	if (axios.isCancel(e)) return
		// })
		
		axios({
			method: 'GET',
			url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
		}).then(res => { 
			setPostDetail(res.data)
			setLoading(false)
		}).catch(e => {
			if (axios.isCancel(e)) return
		})
		
			// const fetchApi = async () => {
			// 		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
			// 		const data = await response.json()
			// 		console.log(data)
			// 		setPostDetail(data)
			// }
			// fetchApi()
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