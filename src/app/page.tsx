import Container from '@/app/shared/Container';
import Card from '@/app/shared/Card';
import FilterPanel from '@/app/shared/FilterPanel';
import PrevPage from '@/app/shared/PrevPage';
import NextPage from '@/app/shared/NextPage';
import { getBrands, getProducts } from '@/api/products';

const objectToQuery = (obj: Record<string, string | number>) => {
	return Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
};

const Home = async ({ searchParams }: { searchParams: Record<string, string> }) => {
	const page = searchParams.page ? Number(searchParams.page) : 1;
	const { brand, product, price } = searchParams;

	const queryPrev = '?' + objectToQuery({ page: page - 1 });
	const queryNext = '?' + objectToQuery({ page: page + 1 });

	const products = await getProducts({
		page,
		brand,
		price,
		product,
	});

	const brands = await getBrands();

	return (
		<Container>
			<FilterPanel
				price={price}
				product={product}
				brand={brand}
				brands={brands}
			/>
			<nav className={'flex'}>
				<div className={'w-10 h-10'}>{page > 1 && (<PrevPage src={queryPrev}/>)}</div>
				<div className={'w-10 h-10'}><NextPage src={queryNext}/></div>
			</nav>
			<div className={'mt-10'}/>
			<div className={'space-y-4'}>
				{products.map((product: any) => (
					<Card id={product.id}
					      key={product.id}
					      product={product.product}
					      brand={product.brand}
					      price={product.price}
					/>
				))}
			</div>
		</Container>
	);
};

export default Home;
