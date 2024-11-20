import Link from "next/link"

export default function Home(){
  return <div>
   <Link href="/submit"> <div>write note</div></Link>
    <Link href="/show"><div>show note</div></Link>
  </div>
}