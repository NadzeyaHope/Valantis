interface GetProductsParams {
	offset: number;
	limit: number;
}

const getProducts = async (params: GetProductsParams) => {
	const { offset, limit } = params;

	const response = await fetch('https://api.valantis.store:41000/', {
		method: 'POST',
		headers: {
			'X-Auth': '5c8431a5765a73a9394ab0169a2a96b6',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			action: 'get_ids',
			params: { offset, limit }
		})
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const { result: ids } = await response.json();
	// todo: remove duplicates

	{
		const response = await fetch('https://api.valantis.store:41000/', {
			method: 'POST',
			headers: {
				'X-Auth': '5c8431a5765a73a9394ab0169a2a96b6',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'get_items',
				params: { ids }
			})
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const { result: products } = await response.json();

		return products;
	}
};


const Home = async () => {
	const products = await getProducts({
		offset: 0,
		limit: 50,
	});

	console.log(products);


	return (
		<main>
			<h1>Product List</h1>
			{products.map((product: any) => (
				<>
					<table key={product.id}>
						<tbody>
						<tr>
							<th>Id</th>
							<td>{product.id}</td>
						</tr>
						<tr>
							<th>Name</th>
							<td>{product.product}</td>
						</tr>
						<tr>
							<th>Brand</th>
							<td>{product.brand}</td>
						</tr>
						<tr>
							<th>Price</th>
							<td>{product.price}</td>
						</tr>
						</tbody>
					</table>
					<br/>
					<br/>
				</>
			))}

		</main>
	);
};

export default Home;