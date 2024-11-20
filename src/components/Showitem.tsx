"use client"
import { supabase } from "@/supabase/supabaseClient"
import { useEffect, useState, version } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";



interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
  }
export default function Showitem(){

    const [data,setData]=useState<Note[]>([])
    const [user,setUser]=useState<string>('');
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const router=useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTodos, setFilteredTodos] = useState<Note[]>([]);

    useEffect(()=>{
        const fetchSession=async()=>{
            const response=await supabase.auth.getSession();
            if(response.data.session?.user.id){
                
                 setUser(response.data.session.user.id);

                 fetchdata(response.data.session.user.id)
                 
            }else{
                router.push('/login')
            }
        }
        const fetchdata=async(user_id:string)=>{
            const response=await supabase.from('data').select('*').eq('user_id',user_id).order('created_at',{ascending:false})
            console.log(user);
             await setData(response?.data || [])
        }
        fetchSession();
    },[router,data])
   
    const handleUpdate=async(id:number)=>{
        const { error } = await supabase
        .from('data')
        .update({ title: editTitle, content: editContent,created_at:new Date().toISOString(), })
        .eq('id', id).eq('user_id',user);
  
      if (error) {
        console.error('Error updating todo:', error.message);
      } else {
        setData((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? { ...todo, title: editTitle, content: editContent }
              : todo
          )
        );
        setEditingId(null); 
    }
}
    const handleEdit = (todo: any) => {
        setEditingId(todo.id);
        setEditTitle(todo.title);
        setEditContent(todo.content);
      };

      const handleDelete = async (id: number) => {
        const { error } = await supabase.from('data').delete().eq('id', id);
    
        if (error) {
          console.error('Error deleting todo:', error.message);
        } else {
          setData((prev) => prev.filter((todo) => todo.id !== id));
        }
      };

      const handleCancel = () => {
        setEditingId(null);
      };

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
    
        const filtered = data.filter((todo) =>
          todo.title.toLowerCase().includes(searchValue)
        );
        setFilteredTodos(filtered);
        if(!searchTerm){
            setFilteredTodos([])
        }
      };

    return <div className="show-container">
     

<div style={{ marginBottom: '20px' }}>
<input
  type="text"
  value={searchTerm}
  onChange={handleSearch}
  placeholder="Search by title..."
  style={{
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  }}
 
/>
{
    filteredTodos && filteredTodos.map((val)=>{
        return <div key={val.id}>{val.title}</div>
    })
}
</div>{
        data.map((val)=>{
            return <div key={val.id} className="map-data">
                {
                    editingId===val.id ?(
                        <div className="data">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Edit Title"
                          className="inp"
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          placeholder="Edit Content"
                          className="text"
                        ></textarea>
                        <button className="btn" onClick={() => handleUpdate(val.id)}>Save</button>
                        <button className="btn submit" onClick={handleCancel}>Cancel</button>
                      </div>
                    ):(
                        <div className="inside-md">
                        <h3 className="title">{val.title}</h3>
                        <p className="content">{val.content}</p>
                        <button className="btn red" onClick={() => handleEdit(val)}>Edit</button>
                        <button className="btn black" onClick={() => handleDelete(val.id)}>Delete</button>
                      </div>
                    )
                }
              
            </div>
        })
     }
       <Link className="m-btn" href="/submit"><button className="s-btn">Add New Note</button></Link>
    </div>

}