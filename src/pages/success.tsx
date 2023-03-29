import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success(){
	return(
		<SuccessContainer>
			<h1>Thank you!</h1>

			<p>Payment done successfully!</p>

			<ImageContainer>

			</ImageContainer>
		<p>
			yupiii <strong>Caroline Vieira</strong>, your <strong>T-shirt Beyond the limits</strong> is already on your way home.
		</p>

		<Link href='/'>
			Back Shopping
		</Link>

		</SuccessContainer>
	)
}