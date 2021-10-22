import React from 'react';
import { Link } from 'react-router-dom';
import  NotImage from '../../../assets/images/not found.png';;

const PostItem = ({ post }) => { 
    const file_url="http://localhost:5000/images/";
    
    return (
        <div>
            <div className='post'>
                <div className="post_img">
                    {
                        (post.postImage == 'no-image' || post.postImage == undefined) ?
                            <img src={NotImage} />
                            :

                           <img src={file_url + post.postImage} alt="post imagge" className="" />
                    }
                </div>

                <div className="post_wrapper">
                    <div className="post_caption">
                        {
                            post.categories.map(cat => (
                                <span className='badges'>{cat}</span>
                            ))
                        }

                    </div>
                    <div className="post_heading">
                        <h2>{post.title}</h2>
                        <span>{new Date(post.timestamp).toDateString()}</span>
                    </div>
                    <div className="post_desc">
                        <p> {post.description} </p>
                    </div>


                
                    <Link to={`/post/${post._id}`}  style={{ marginLeft: "8px" }} className="btn">Read more  </Link>
                </div>

            </div>

        </div>
    );
};

export default PostItem;