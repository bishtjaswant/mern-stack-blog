import './Post.css';
import PostItem from './PostItems/PostItem';

const Post = ({ posts }) => {

    const file_url="http://localhost:5000/images/"
    return (
        <div className="post_container">

            {
                (posts == undefined || posts.length === 0) ?
                    <h2>there is no post to available</h2>
                    :
                    posts.map(post => (<PostItem key={post._id} post={post} />))
            }
        </div>
    );
};

export default Post;