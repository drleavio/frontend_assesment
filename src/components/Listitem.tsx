"use client"
import { supabase } from "@/supabase/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import spinner from "../../public/spinner.gif"

export interface formdata{
    title:string;
    content:string;
}

export default function Listitem(){

    const [data,setData]=useState<formdata>({
        title:'',
        content:'',
    })
    const [loading,setLoading]=useState<boolean>(false)
    const [user,setUser]=useState<string>('')
    // const [loading,setLoading]=useState<boolean>(false)
    const router=useRouter();

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
        const fetchSession=async()=>{
            const response=await supabase.auth.getSession();
            console.log(response);
            if(response.data.session?.user.id){
            setUser(response.data.session?.user.id)
            }else{
                router.push('/login')
            }
        }
        fetchSession();
    },[])
    const handleClick=async()=>{
      try {
        setLoading(true)
        const response=await supabase.from('data').insert({
            title:data.title,
            content:data.content,
            created_at:new Date().toISOString(),
            user_id:user
        })
        toast.success("Note added successfully")
        setData({
            title:'',
            content:''
        })
        console.log("submitted",response);
        
      } catch (error) {
        console.log("error submitting data",error);
        
      }finally{
        setLoading(false)
      }
    console.log(data);
    
    }
    return <div className="input-box">
        <h1>Add Note</h1>
        <div className="inside-inp">
            <label className="label" htmlFor="title">Title</label>
            <input className="inp-box" type="text" name="title" onChange={handlechange} placeholder="write your title here..."/>
            <label className="label" htmlFor="content">Content</label>
            <input className="inp-box content" type="text" name="content" onChange={handlechange} placeholder="write your note here..." />
            <button className="btn" onClick={handleClick}>{loading && <img style={{height:"20px",width:"20px",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"10px"}} src={spinner.src}/>}submit</button>
            <Link style={{width:"100%"}} href="/show"><button className="btn-btm">View Notes</button></Link>
        </div>
        
    </div>
}