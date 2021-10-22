import './SinglePost.css';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import NotImage from '../../assets/images/not found.png';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { ContextApi } from './../../context/context';


const SinglePost = () => {
    const [post, setPost] = useState();


    const [singlePostTitle, setSinglePostTitle] = useState("");
    const [singlePostDescription, setSinglePostDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const location = useLocation();
    const history = useHistory();

    const { user } = useContext(ContextApi);

    const pathname = location.pathname.split("/").at(2);
    const file_url = "http://localhost:5000/images/";
    console.log('user in context', user);

    const onDeleteHandler = async () => {
        if (window.confirm(`hey ${post.user.username}  ! Are you sure  want  to dele it?`)) {
            let resp = await axios.delete(`/posts/delete/${pathname}`);
            window.alert(`post deleted`)
            history.push("/");
        }
    }

    const updateHandler = async  () => {
        let data={
            "title":singlePostTitle,
            "description":singlePostTitle
        };

       const response  = await axios.put(`/posts/update/${pathname}`,data );

       if(response.status ){
        setUpdateMode(false)
       }
    }

    useEffect(() => {
        const fetchSinglePost = async () => {
            const resp = await fetch(`/posts/${pathname}`);
            const data = await resp.json();
            setPost(data.data.message.post);
        }

        fetchSinglePost();
    }, [pathname, singlePostTitle, singlePostDescription]);





    return (
        (post != null) ?

            <div className='single_post'>
                {
                    (post.postImage == 'no-image' || post.postImage == undefined) ?
                        <img src={NotImage} />
                        :

                        <img style={{ width: "100%", height: " 100%" }} src={file_url + post.postImage} alt="post" className="" />
                }
                <div className="post_wrapper">
                    <div className="post_caption">
                        <span>Author:<strong>{post.user.username}</strong></span>
                        <span>{new Date(post.timestamp).toDateString()}</span>
                    </div>
                    <div className="post_heading">
                        <div className=""></div>
                        {
                            (updateMode) ? <input autoFocus type="text"
                                onChange={(e) => setSinglePostTitle(e.target.value)} className='single_post_title' defaultValue={post.title} placeholder='enter new title' /> : <h2>{post.title}</h2>
                        }

                        {
                            (post.user._id === user._id)
                                ?

                                (updateMode) ?
                                    <div className="control"></div> : <div className="control">
                                        <i onClick={() => setUpdateMode(true)} className="far fa-edit icon edit"></i>
                                        <i onClick={onDeleteHandler} className="far fa-trash-alt icon trash"></i>
                                    </div>

                                :

                                <div className="control"></div>
                        }

                    </div>


                    <div className="post_description">
                        {
                            (updateMode) ?
                                <textarea onChange={(e) => setSinglePostDescription(e.target.value)} className='single_post_description' placeholder='enter new description' defaultValue={post.description} ></textarea> :
                                <p> {post.description} </p>

                        }

                    </div>


                    {
                        (updateMode) ?
                            <div className="update_wrapper">
                                <button onClick={ updateHandler } className="btn update_btn">update</button>
                            </div> : ""
                    }
                </div>

            </div>
            :
            <div className="not_found_post single_post">
                <strong className='notfound_text'>Post not  found </strong>
            </div>


    );
};

export default SinglePost;