import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Posts } from '../types'
import PostsCard from '../components/PostsCard'
import Message from '../components/Message'
import ErrorAlert from '../components/ErrorAlert'
import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import AOS from 'aos'
import 'aos/dist/aos.css'
import PostDataService from '../services/post.service'


function Home() {
	const [posts, setPosts] = useState<Posts[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [end, setEnd] = useState(20)

	// Ref: Store data between renders that isn't part of state
	// Because useRef is not part of the state, it doesn't 
	// update(rerun component) every single time that it changes.
	const observer = useRef<any>()
	// useCallback will be called every time element with lastPostEleRef is created
	const lastPostEleRef = useCallback((node: any) => {
		// disconnect the observer from previous element
		if (observer.current) observer.current.disconnect()
		// IntersectionObserver takes all the entries that are available
		// Meaning everything that it is watching is going to be in entries array
		// as soon as they become visible
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setEnd(end + 20)
			}
		})
		// make observer observe the very last node
		if (node) observer.current.observe(node)
	}, [end])

	const navigate = useNavigate()
	const routeChange = (postId: number) =>{ 
			const path = `/posts/${postId}`
			navigate(path);
	}
	
	useEffect(() => {
		setLoading(true)
		setError(false)

		PostDataService.getAll()
			.then((res: any) => {
				setPosts(res.data)
				setLoading(false)
			}).catch(() => {
				setLoading(false)
				setError(true)
			})
	}, [])

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
		<>
		<Container maxWidth='lg'>
			<Box my={5} mx={{sm: 5}}>
				{posts.length > 0
					&& posts.slice(0, end).map((post, idx) => {
						if (end === idx + 1) { // every time it reaches 20, get a reference to that post 
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
		{loading &&
			<Message msg='Loading...' />
			}
		{error && !loading &&
			<ErrorAlert />
		}
		</>
	);
}

export default Home;
