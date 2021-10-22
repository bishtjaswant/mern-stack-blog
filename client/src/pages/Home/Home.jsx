
import './Home.css';
import Header from './../../components/Header/Header';
import Post from '../../components/Posts/Post';
import Sidebar from '../../components/Sidebar/Sidebar';
import { cloneElement, useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
    const [posts, setPosts] = useState();
    
    
    useEffect(() => {
        const fetchPost = async (params) => {
          const response= await fetch(`/posts`);
          const data =await response.json();
          setPosts(data.data.posts);
 
        }

      
        fetchPost();
    }, []);
    return (
        <>
            <Header />
            <div className="home container">
               <Post posts={posts} />    
                <Sidebar /> 

            </div>
        </>
    );
};
 
export default Home;