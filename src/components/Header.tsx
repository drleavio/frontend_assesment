"use client"

import { supabase } from "@/supabase/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Header(){

  const [value,setValue]=useState<string>('')
    
    const router=useRouter();
    useEffect(()=>{
        const fetchSession=async()=>{    
            const response=await supabase.auth.getSession();
            console.log(response);
            
            if(response.data.session?.access_token){
               setValue(response.data.session.access_token)
               router.push('/')
            }else{
                setValue('')
            }
        }
        fetchSession();
    },[value,router])
    const logout=async()=>{
        const response=await supabase.auth.signOut();
        
        if(response){
            setValue('');
            router.push('/')
        }
        console.log("siggnedout successfully",response);
        
    }
    return <div className="header-container">
        <div className="logo">Logo</div>
        <div className="buttons">
            {
                value && <Link href='/submit'><div className="btn">Add note</div></Link>
            }
            {
                value && <Link href='/show'><div className="btn">Check note</div></Link>
            }
            {
                !value && <Link href="/login"><div className="l-btn">Login</div></Link>
            }
            {
                !value && <Link href="/signup"><div className="btn">SignUp</div></Link>
            }
            {
            value && <div className="btn" onClick={logout}>Signout</div>
            }
        </div>
    </div>
}