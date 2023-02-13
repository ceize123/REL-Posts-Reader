import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Posts } from '../types'
import PostsCard from '../components/PostsCard'
import Message from '../components/Message'
import ErrorAlert from '../components/ErrorAlert'
import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import AOS from 'aos'
import 'aos/dist/aos.css'


function Home() {
	const [posts, setPosts] = useState<Posts[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [hasMore, setHasMore] = useState(false)
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(20)

	// Ref: Store data between renders that isn't part of state
	// Because useRef is not part of the state, it doesn't 
	// update(rerun component) every single time that it changes.
	const observer = useRef<any>()
	// useCallback will be called every time element with lastPostEleRef is created
	const lastPostEleRef = useCallback((node: any) => {
		if (loading) return
		// disconnect the observer from previous element
		if (observer.current) observer.current.disconnect()
		// IntersectionObserver takes all the entries that are available
		// Meaning everything that it is watching is going to be in entries array
		// as soon as they become visible
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setStart(end + 1)
				setEnd(end + 20)
			}
		})
		// make observer observe the very last node
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

		axios({
			method: 'GET',
			url: 'https://jsonplaceholder.typicode.com/posts'
		}).then(res => {
			// Pushing post from range 'start' to 'end'
			setPosts(prevPost => {
				return [...prevPost, ...res.data.slice(start, end)]
			})
			// there's always more if number of end is smaller than data length
			setHasMore(res.data.length > end)
			setLoading(false)
		}).catch(() => {
			setLoading(false)
			setError(true)
		})
	}, [start, end])

	useEffect(() => {
		 AOS.init({
      offset: 100,
      duration: 400,
      easing: 'ease-in-out',
    });
	}, [])

	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
	}

	return (
		<Container maxWidth='lg'>
			<Box my={5} mx={{sm: 5}}>
				{posts.length > 0
					&& posts.map((post, idx) => {
						if (posts.length === idx + 1) { // every time it reaches 20, get a reference to that post 
							return (
								<div ref={lastPostEleRef} key={idx} onClick={() => { routeChange(post.id) }} data-aos='fade-up'>
									<PostsCard {...post} />
								</div>
							)
						} else {
							return (
								<div key={idx} onClick={() => { routeChange(post.id) }} data-aos='fade-up'>
									<PostsCard {...post} />
								</div>
							)
						}
				})}
				{loading &&
					<Message msg='Loading...' />
					}
				{error && !loading &&
					<ErrorAlert />
				}
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
