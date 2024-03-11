import React from 'react';
import Link from 'next/link';
import PrevIcon from '@/app/icons/PrevIcon';

const PrevPage = ({src} : {src : string}) => {
	return (
		<div>
			<Link href={src}>
				<PrevIcon/>
			</Link>
		</div>
	);
};

export default PrevPage;