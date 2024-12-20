"use client"

import { supabase } from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from 'react-toastify';
import spinner from "../../../public/spinner.gif"



interface formdata{
  email:string;
  password:string;
}
export default function Home(){
  const [data,setData]=useState<formdata>({
    email:'',
    password:''
  })
  const [loading,setLoading]=useState<boolean>(false)
  const router=useRouter();

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const handlesubmit=async()=>{

    if(!data.email || !data.password){
      console.log("email password required");
      return
    }
    try {
      setLoading(true)
      const response=await supabase.auth.signUp({
        email:data.email,
        password:data.password
      })
      console.log(response);
      toast.success("Signed Up successfully")
      if(response){
        router.push('/')
      }
    } catch (error) {
      toast.error("error doing signup")
      console.log("error doing signup",error);
      
    }finally{
      setLoading(false)
    }

    
  }
  return <div className="login-container">
    <div className="header">
      <h1 className="name">SignUp</h1>
      <div className="body">
        <label className="label" htmlFor="Email">Email</label>
        <input className="input" type="email" name="email" onChange={handleChange} />
        <label className="label" htmlFor="password">password</label>
        <input className="input" type="password" name="password" onChange={handleChange}/>
          <button className="btn" onClick={handlesubmit}>{loading && <img style={{height:"20px",width:"20px",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"10px"}} src={spinner.src}/>}Signup</button>
      </div>
    </div>
  </div>
}