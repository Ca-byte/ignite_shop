import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
		description: string;
  }
}

export default function Product({ product }: ProductProps){
	
	return(
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={520}  height={480} alt=" black shirt"/>
			</ImageContainer>
			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<button>Buy Now</button>
			</ProductDetails>
		</ProductContainer>
	)
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
	const productId = params.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['defaul_price'],

	})
	const price = product.default_price as Stripe.Price
	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format((price.unit_amount || 0)  / 100),
				description: product.description, 
			}

		},
		revalidate: 60 * 60 * 1 // 1 hour
	}
}