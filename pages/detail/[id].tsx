import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'

import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'
import MiniProfile from '../../components/MiniProfile'
import { GoVerified } from 'react-icons/go'

interface IProps {
	postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
	const [post, setPost] = useState(postDetails)
	const [playing, setPlaying] = useState(false)
	const [isVideoMuted, setIsVideoMuted] = useState(false)
	const [comment, setComment] = useState('')
	const [isPostingComment, setIsPostingComment] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)
	const router = useRouter()
	const { userProfile }: any = useAuthStore()

	const onVideoClick = () => {
		if (playing) {
			videoRef?.current?.pause()
			setPlaying(false)
		} else {
			videoRef?.current?.play()
			setPlaying(true)
		}
	}

	useEffect(() => {
		if (post && videoRef?.current) {
			videoRef.current.muted = isVideoMuted
		}
	}, [post, isVideoMuted])

	const handleLike = async (like: boolean) => {
		if (userProfile) {
			const { data } = await axios.put(`${BASE_URL}/api/like`, {
				userId: userProfile._id,
				postId: post._id,
				like
			})
			setPost({ ...post, likes: data.likes })
		}
	}

	const addComment = async (e: any) => {
		e.preventDefault()

		if (userProfile && comment) {
			setIsPostingComment(true)
			const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
				userId: userProfile._id,
				comment
			})

			setPost({ ...post, comments: data.comments })
			setComment('')
			setIsPostingComment(false)
		}
	}

	if (!post) return null

	return (
		<div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
			<div className='relative w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
				<div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
					<p className='cursor-pointer' onClick={() => router.back()}>
						<AiOutlineClose className='text-white text-[35px]' />
					</p>
				</div>
				<div className='relative'>
					<div className='lg:h-[100vh] h-[60vh]'>
						<video
							ref={videoRef}
							loop
							playsInline
							onClick={onVideoClick}
							src={post.video.asset.url}
							className='h-full cursor-pointer'
						>
						</video>
					</div>
					<div className='absolute top-[45%] left-[45%] cursor-pointer'>
						{!playing && (
							<button
								onClick={onVideoClick}
							>
								<BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
							</button>
						)}
					</div>
				</div>
				<div className='absolute px-2 flex justify-between items-center w-full bottom-5 lg:bottom-10'>
					<div className=''>
						{userProfile && (
							<LikeButton
								likes={post.likes}
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}
					</div>
					<div className='cursor-pointer px-2 pr-2'>
						{isVideoMuted ? (
							<button
								onClick={() => setIsVideoMuted(false)}
								className='text-white text-2xl lg:text-4xl'
							>
								<HiVolumeOff />
							</button>
						) : (
							<button
								onClick={() => setIsVideoMuted(true)}
								className='text-white text-2xl lg:text-4xl'
							>
								<HiVolumeUp />
							</button>
						)}
					</div>
				</div>
			</div>
			<div className='flex flex-col relative w-[1000px] md:w-[900px] lg:w-[700px]'>
				<div className='mx-4 lg:my-8 my-6 justify-start items-center'>
					<MiniProfile user={post.postedBy} size={64} />
					<p className='px-2 mt-4 text-lg text-gray-600'>{post.caption}</p>
				</div>
				<Comments
					comment={comment}
					setComment={setComment}
					addComment={addComment}
					comments={post.comments}
					isPostingComment={isPostingComment}
				/>
			</div>
		</div>
	)
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

	return {
		props: { postDetails: data }
	}
}

export default Detail