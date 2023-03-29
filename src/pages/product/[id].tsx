import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import axios from "axios"
import Stripe from "stripe"
import { useState } from "react"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
		description: string;
		defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps){
	const  [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

	async function handleBuyProduct(){
		try {
			setIsCreatingCheckoutSession(true)

			const response = await axios.post('/api/checkoutSession', {
				priceId: product.defaultPriceId,
			})

			const { checkoutUrl} = response.data;

			window.location.href = checkoutUrl

		} catch(err){

			// watch tools (Datadog/ Sentry)

			setIsCreatingCheckoutSession(false)

			alert('Failed to redirect to checkout!')
		}
	}

	return(
		<ProductContainer>
			<ImageContainer>
				<Image src={product.imageUrl} width={520}  height={480} alt=" black shirt"/>
			</ImageContainer>
			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>

				<p>{product.description}</p>

				<button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Buy Now</button>
			</ProductDetails>
		</ProductContainer>
	)
}

export const getStaticPaths: GetStaticPaths = async ()=>{
	return{
		paths: [
			{ params: {id: 'prod_NX7y1vE8y235wo'}},
			{ params: {id: 'prod_NX7vqDX7crTbfs'}},
			{ params: {id: 'prod_NX7t1xREdEmTBG'}},
			{ params: {id: 'prod_NX7p4MsATWqMWX'}},

		],
		fallback: true, 
	}
}
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
	const productId = params.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],

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
				defaultPriceId: price.id,
			}

		},
		revalidate: 60 * 60 * 1 // 1 hour
	}
}