import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'
import MiniProfile from './MiniProfile'

interface IProps {
	isPostingComment: boolean,
	comment: string,
	setComment: Dispatch<SetStateAction<string>>,
	addComment: (e: React.FormEvent) => void,
	comments: IComment[]
}

interface IComment {
	comment: string,
	length?: number,
	_key: string,
	postedBy: { _ref: string, _id: string }
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
	const { userProfile, allUsers } = useAuthStore()
	return (
		<div className='relative border-t-2 border-gray-200 bg-[#F8F8F8] lg:pb-0 pb-[100px] h-full'>
			<div className='overflow-y-scroll p-4 max-h-[70vh]'>
				{comments?.length ? (
					comments.map((comment, index) =>
						<>
							{allUsers.map((user: IUser) => (
								user._id === (comment.postedBy._id || comment.postedBy._ref) && (
									<div className='p-2 items-center' key={index}>
										<MiniProfile user={user} size={40} />
										{/* <Link href={`/profile/${user._id}`}>
											<div className='flex items-start gap-3'>
												<div className='w-8 h-8'>
													<Image
														src={user.image}
														alt='user profile'
														width={34}
														height={34}
														className='rounded-full'
														layout='responsive'
													/>
												</div>
												<div className='hidden lg:block'>
													<p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
														{user.userName.replaceAll(' ', '')}
														<GoVerified className='text-blue-400' />
													</p>
													<p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
												</div>
											</div>
										</Link> */}
										<div>
											<p className='mt-2'>{comment.comment}</p>
										</div>
									</div>
								)
							))}
						</>
					)
				) : (
					<NoResults text={`No comments yet!`} />
				)}
			</div>
			{userProfile && (
				<div className='relative bottom-0 left-0 bg-white p-6 w-full'>
					<form
						onSubmit={addComment}
						action=""
						className='flex gap-4'
					>
						<input
							type="text"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder='Add comment'
							className='bg-primary px-6 py-4 text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
						// w-[250px] md:w-[300px] lg:w-[350px]
						/>
						<button
							onClick={addComment}
							className='text-md text-gray-400'
						>
							{isPostingComment ? 'Commenting...' : 'Comment'}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Comments