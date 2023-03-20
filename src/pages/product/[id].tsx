import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"


export default function Product(){
	const { query } = useRouter()
	return(
		<ProductContainer>
			<ImageContainer>

			</ImageContainer>
			<ProductDetails>
				<h1>Shirt Y</h1>
				<span>$ 29,90</span>

				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci nesciunt vero aut esse labore eius quae, minima, nostrum, quasi illum iste maxime delectus minus qui ad ut libero. Quod.</p>

				<button>Buy Now</button>
			</ProductDetails>
		</ProductContainer>
	)
}