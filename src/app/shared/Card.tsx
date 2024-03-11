'use client';
import React from 'react';

interface Props {
	id: string,
	product: string,
	brand: string,
	price: number,
}

const Card = (props: Props) => {
	const { id, product, brand, price } = props;
	return (
		<div className={'bg-gray-100 w-80 h-full p-4 shadow-xl rounded-2xl'}>
			<table key={id}>
				<tbody>
				<tr>
					<td>
						{product}
					</td>
				</tr>
				<tr>
					<td className={'text-zinc-400'}>{brand}</td>
				</tr>
				<tr>
					<td>{`price : ${price}`}</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Card;