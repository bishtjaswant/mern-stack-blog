import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  const [cats, setCats] = useState();
 

  useEffect(()=>{
    const fetchCategory = async () => {
      const resp = await fetch(`/category/`);
      const data = await resp.json();    
      setCats(data.data);

    }
  
    fetchCategory();
  },[]);
  console.log('cats :>> ', cats===undefined);

  return (
    <div className='sidebar'>

      <div className="sidebar_item">
        <img src="https://instagram.fdel13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/242199045_285256256744348_859592964385144808_n.jpg?_nc_ht=instagram.fdel13-1.fna.fbcdn.net&_nc_ohc=ajHauNgoPfUAX8CZN4e&edm=ABfd0MgBAAAA&ccb=7-4&oh=5fa47cc78ed84b4363ee10be68033dfb&oe=6171AA16&_nc_sid=7bff83" alt="" className="sidebar_item_img" />
        <div className="sidebar_item_detail">
          <span className="sidebar_item_title">jaswant</span>
          <p className="sidebar_item_lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum assumenda tempore?</p>
          <button className='btn'>know more</button>
        </div>
      </div>
      <div className="sidebar_item_category">
        <div className="sidebar_item_title">Categories</div>
        <ul className="sidebar_item_group">
        {
            (cats===undefined || cats==='' ||  cats===null)
              ?
              <p style={{ textAlign: "center" }}>No Categories</p>
              :
              cats.categories.map(category => (
                <Link to={`/?category=${category.name}`}>
                      <li className="group_item">{category.name}</li>

                </Link>
              ))
          }        

        </ul>
      </div>

      <div className="sidebar_item_social">
        <div className="sidebar_item_title">Follow Us On</div>
        <ul className="sidebar_item_group">
          <li className="group_item fb">facebook</li>
          <li className="group_item tw">twitter</li>
          <li className="group_item ig">instagram</li>
          <li className="group_item li">linked-in</li>
          <li className="group_item pin">pinterest</li>
        </ul>
      </div>


    </div>
  );
};

export default Sidebar;