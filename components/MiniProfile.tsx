import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { IUser } from '../types'

interface IProps {
	user: IUser
	size: number
}

const MiniProfile = ({ user, size }: IProps) => {
	{ console.log(size) }
	return (
		// <>
		// 	<div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
		// 		<Link href={`/profile/${user._id}`}>
		// 			<>
		// 				<Image
		// 					width={size}
		// 					height={size}
		// 					className='rounded-full'
		// 					src={user.image}
		// 					alt='profile photo'
		// 					layout='responsive'
		// 				/>
		// 			</>
		// 		</Link>
		// 	</div>
		// 	<div>
		// 		<Link href={`/profile/${user._id}`}>
		// 			<div className='mt-3 flex flex-col gap-2'>
		// 				<p className='flex gap-2 items-center md:text-md font-bold text-primary'>
		// 					{user.userName} {` `}
		// 					<GoVerified className='text-blue-400 text-md' />
		// 				</p>
		// 				<p className='capitalize font-md text-xs text-gray-500 hidden md:block'>{user.userName}</p>
		// 			</div>
		// 		</Link>
		// 	</div>
		// </>
		<Link href={`/profile/${user._id}`}>
			<div className='flex items-start gap-3'>
				<div className='flex justify-center items-center'>
					<Image
						src={user.image}
						alt='user profile'
						width={size}
						height={size}
						className={`rounded-full`}

					/>
				</div>
				<div className={`flex flex-col justify-center items-start h-[${size}px]`}>
					<p className='flex gap-2 items-center md:text-md font-bold text-primary'>
						{user.userName} {` `}
						<GoVerified className='text-blue-400 text-md' />
					</p>
					<p className='capitalize font-md text-xs text-gray-500'>{user.userName}</p>
				</div>
			</div>
		</Link>
	)
}

export default MiniProfile