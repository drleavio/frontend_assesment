"use client"
import Link from "next/link"
import pic from '../../public/pic.jpg'
import { useEffect, useState } from "react"
import { supabase } from "@/supabase/supabaseClient"

export default function Home(){
const [sess,setSess]=useState<string>('')
  useEffect(()=>{
    const fetchSession=async()=>{
      const res=await supabase.auth.getSession();
      if(res.data.session?.user.id){
        setSess(res.data.session.user.id);
      }
    }
    fetchSession();
  },[])
  return <div className="page-div">
   <div className="inside-pd">
      <div className="header">
        <h1 className="head">The simple way to  </h1>
        <h1 className="head mar"> keep notes</h1>
        <p className="para">All your notes, synced on all your devices. Get Simplenote now for iOS,</p>
        <p className="para mar">Android, Mac, Windows, Linux, or in your browser.</p>
      </div>
     <button className="btn"><Link href='/signup'>Signup now</Link></button>
    </div>
    <div style={{width:"100%"}}><img style={{width:"100%",height:"400px"}}src={pic.src} alt="" /></div>
    <div className="bottom">
   {
    sess &&  <div className="inside-btm"><Link href="/submit"> <div>write note</div></Link></div>
   }
     {
      sess &&  <div className="inside-btm"> <Link href="/show"><div >show note</div></Link></div>
     }
      </div>
  </div>
}