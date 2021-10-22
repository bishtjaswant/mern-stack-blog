import { useContext, useState } from 'react';
import './Write.css';
import { ContextApi } from './../../context/context';
import axios from 'axios';
import {useHistory  } from 'react-router-dom';



const Write = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [fileInput, setFileInput] = useState(null);

    const { user } = useContext(ContextApi);
    const history=useHistory();


    const onPublishHandler = async (e) => {
        let newPosts = {
            "title": title,
            "description": desc,
            //"categories":["helll"],
            "user": user._id
        };

        if (fileInput !== null) {
            let data = new FormData();
            let fileName =Date.now() + (Math.ceil(Math.random() * 10000)) + fileInput.name;
            data.append("name", fileName);
            data.append("file", fileInput);
            newPosts.postImage=fileName;
       
            try {
                await axios.post("upload", data );
            }
            catch (err) {
                console.log(err);
            }
            try {
              const resp=  await axios.post("posts/create", newPosts);
              history.push("/")
            }
            catch (err) {
                console.log(err);
            }


        }

        else {
            console.log('newPosts  without img:>> ', newPosts);
            //without images
            try {

                await axios.post("posts/create", newPosts);

                history.push("/");
                
            }
            catch (err) {
                console.log(err);

            }
        }




    }
    return (
        <div className='write container'>

            <div className="" id='upload_post_img'>
                {
                    (fileInput) ?
                        <img src={URL.createObjectURL(fileInput)} alt="" className="upload_post_img" />
                        :
                        <img src="https://images.pexels.com/photos/625219/pexels-photo-625219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="upload_post_img" />
                }
                <div className="content">
                    <h1 className='title'>what's on your mind Today ?</h1>
                </div>
            </div>

            <div className="write_form">
                <div className="write_form_group">


                    <div className="">
                        <label title='click to upload an image' htmlFor="fileInput" className='fileInputBorder'>
                            <i className="fas addIcon fa-plus"></i>
                        </label>
                        <input type="file" onChange={(e) => setFileInput(e.target.files[0])} name="fileName" className='fileInput' style={{ display: "none" }} id="fileInput" />


                    </div>


                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='titleInput' name="titleInput" placeholder='enter your title' autoFocus={true} id="titleInput" />


                </div>


                <div className="write_form_group">
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} name="descInput" className='descInput' placeholder='enter your description' id="descInput" cols="30" rows="10"></textarea>
                </div>

                <div className="publish_btn">
                    <button type='button' onClick={onPublishHandler} className="btn">Publish</button>
                </div>

            </div>
        </div>
    );
};

export default Write;