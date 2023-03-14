import { styled } from "../styles"

const Button = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 4,
  padding: '8px 4px'
})


export default function Home() {
  return (
    <Button>hello peach</Button>
  )
}
