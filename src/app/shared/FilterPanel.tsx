'use client';
import React, { useState } from 'react';
import Input from '@/app/shared/Input';
import SelectBrand from '@/app/shared/SelectBrand';
import Link from 'next/link';


const options = [
	'product',
	'price',
	'brand',
];

interface Props {
	price: string;
	brand: string;
	brands : string[];
	product : string;
}

const FilterPanel = (props: Props) => {
	const { price, brand, brands, product } = props;
	const [currentFilter, setCurrentFilter] = useState('product');


	const onChange = (event: any) => {
		setCurrentFilter(event.target.value);
	};

	return (
		<form className={'flex w-full mx-auto my-10 space-x-4'}>
			<select className={'rounded bg-gray-200 p-2'}
			        value={currentFilter}
			        onChange={onChange}
			>
				{options.map((el) => (
					<option key={el} value={el}>{el}</option>
				))}
			</select>
			{currentFilter === 'product'
				&& <Input
              name={'product'}
              defaultValue={product}
              placeholder={'Product'}
          />
				|| currentFilter === 'price'
				&& <Input
              name={'price'}
              type={'number'}
              defaultValue={price}
              placeholder={'Price'}/>
				|| currentFilter === 'brand'
				&& <SelectBrand
              brand={brand}
              brands={brands}/>
			}
			<button className={'border-gray-300 rounded-xl p-2 border-2'} type={'submit'}>Search</button>
			<Link className={'m-auto border-gray-300 rounded-xl p-2 border-2'} href={'/'}>Reset</Link>
		</form>
	);
};
export default FilterPanel;