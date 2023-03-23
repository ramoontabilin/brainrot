import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'

interface IProps {
	handleLike: () => void
	handleDislike: () => void
	likes: any[]
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
	const [alreadyLiked, setAlreadyLiked] = useState(false)
	const { userProfile }: any = useAuthStore()

	const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

	useEffect(() => {
		if (filterLikes?.length > 0) {
			setAlreadyLiked(true)
		} else {
			setAlreadyLiked(false)
		}
	}, [filterLikes, likes])


	return (
		<div className='flex'>
			<div className='flex flex-row px-2 justify-center items-center cursor-pointer'>
				{alreadyLiked ? (
					<div className='px-2' onClick={handleDislike}>
						<MdFavorite className='text-2xl lg:text-4xl text-[#F6417A]' />
					</div>
				) : (
					<div className='px-2' onClick={handleLike}>
						<MdFavorite className='text-2xl lg:text-4xl text-white' />
					</div>
				)}
				<p className='text-white text-2xl font-semibold'>{likes?.length | 0}</p>
			</div>
		</div>
	)
}

export default LikeButton