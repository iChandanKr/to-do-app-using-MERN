import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Context, server } from "../main";
import { toast } from 'react-hot-toast';
import MyAllTasks from '../components/MyAllTasks';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated} = useContext(Context);


  const updateHandeler = async (id) => {
    // toast.success(id);
    try {
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh(prev=>!prev)

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }


  const deleteHandeler = async (id) => {
    // toast.error(id);
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      })
      toast.success(data.message);
      setRefresh(prev => !prev)



    } catch (error) {
      toast.error(error.response.data.message);
    }



  }

  const submitHandeler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/task/new`, {
        title,
        description
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTitle("");
      setDescription("");
      setLoading(false);
      toast.success(data.message);
      setRefresh(prev => !prev)



    }
    catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios.get(`${server}/task/mytasks`, {
      withCredentials: true,
    }).then((res) => {
      setTasks(res.data.tasks)
    }).catch((err) => {
      toast.error(err.res.data.message);
    })



  }, [refresh])

  if(!isAuthenticated){
    return(<Navigate to={"/login"} />);
  }


  return (
    <div className='container'>
      <div className='login'>

        <section>
          <form onSubmit={submitHandeler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Desctiption"
              required
            />

            <button disabled={loading} type='submit'>Add Task</button>
          </form>

        </section>
      </div>


      <section className='todosContainer'>
        {
          tasks.map((i) =>
          (<MyAllTasks key={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted}
            deleteHandeler={deleteHandeler} updateHandeler={updateHandeler} id={i._id} />))
        }
      </section>
    </div>
  );
}

export default Home;