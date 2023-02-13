import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import { Posts } from '../types'
import PostsCard from '../components/PostsCard'
import Message from '../components/Message'
import { Box } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

function Home() {
	const [posts, setPosts] = useState<Posts[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [hasMore, setHasMore] = useState(false)
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(20)

	const observer = useRef<any>()
	const lastPostEleRef = useCallback((node: any) => {
		if (loading) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setStart(end + 1)
				setEnd(end + 20)
			}
		})
		if (node) observer.current.observe(node)
	}, [loading, hasMore, end])

	const navigate = useNavigate()
	const routeChange = (postId: number) =>{ 
			const path = `/posts/${postId}`
			navigate(path);
	}
	

	useEffect(() => {
		setLoading(true)
		setError(false)

		let cancel: any
		axios({
			method: 'GET',
			url: 'https://jsonplaceholder.typicode.com/posts',
			cancelToken: new axios.CancelToken(c => cancel = c)
		}).then(res => {
			// setPosts(prevPost => {
			// 	return [...prevPost, ...res.data.map((p: any) => p)]
			// })
			setPosts(prevPost => {
				return [...prevPost, ...res.data.slice(start, end)]
			})
			setHasMore(res.data.length > end)
			setLoading(false)
			console.log(res.data)
		}).catch(e => {
			if (axios.isCancel(e)) return
			setLoading(false)
			setError(true)
		})
		return () => cancel()

		// const fetchApi = async () => {
		// 		const response = await fetch('https://jsonplaceholder.typicode.com/posts')
		// 		const data = await response.json()
		// 		console.log(data)
		// 		setUserData(data)
		// }
		// fetchApi()
	}, [start, end])

	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
	}

	return (
		<Container maxWidth='lg'>
			<Box my={5} mx={{sm: 5}}>
				{posts.length > 0
					&& posts.map((post, idx) => {
						if (posts.length === idx + 1) {
							return (
								<div ref={lastPostEleRef} key={idx} onClick={() => { routeChange(post.id) }}>
									<PostsCard {...post} />
								</div>
							)
						} else {
							return (
								<div key={idx} onClick={() => { routeChange(post.id) }}>
									<PostsCard {...post} />
								</div>
							)
						}
				})}
				<div>
					{loading &&
						<Message msg='Loading...'/>
						}
				</div>
				<div>
					{error && !loading &&
						<Message msg='Something went wrong. Please refresh the page!'/>
					}
				</div>
				<ArrowCircleUpIcon
					fontSize='large'
					onClick={() => handleScrollToTop()}
					sx={{
						'&:hover': { cursor: 'pointer' },
						'position': 'fixed',
						'bottom': 15,
						'right': 10
					}}
				/>
			</Box>
		</Container>
	);
}

export default Home;
