import React from 'react';

interface Props {
	brand : string;
	brands : string[];
}
const SelectBrand = (props : Props) => {
	const {brand, brands} = props;
	return (
		<select className={'rounded bg-gray-200 w-[236px] p-2'} name={'brand'}>
			<option selected={!brand} value={''}>All</option>
			{brands.map((br: string) => (
				<option selected={br === brand} key={br} value={br}>{br}</option>
			))}
		</select>
	);
};

export default SelectBrand;