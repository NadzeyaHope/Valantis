import React from 'react';
import Link from 'next/link';
import NextIcon from '@/app/icons/NextIcon';

const NextPage = ({src} : {src : string}) => {
	return (
		<Link href={src}>
			<NextIcon/>
		</Link>
	);
};

export default NextPage;