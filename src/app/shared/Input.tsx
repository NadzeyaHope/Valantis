import React from 'react';

interface Props {
	name : string;
	type? : string;
	defaultValue : string | undefined;
	placeholder : string;
}
const Input = (props : Props) => {
	const {name, type, defaultValue, placeholder} = props;
	return (
		<input
			className={'rounded bg-gray-200 p-2'}
			name={name}
			type={type}
			defaultValue={defaultValue}
			placeholder={placeholder}
		/>
	);
};

export default Input;