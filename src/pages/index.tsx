import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"
import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'


export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={480} alt="shirt logo 1" />
        <footer>
          <strong>Shirt M</strong>
          <span>$ 29,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={shirt2} width={520} height={480} alt="shirt logo 2" />
        <footer>
          <strong>Shirt Y</strong>
          <span>$ 29,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
