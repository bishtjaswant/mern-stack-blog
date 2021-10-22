import './Settings.css';
import Sidebar from './../../components/Sidebar/Sidebar';



const Settings = () => {
    return (
        <div className='settings container'>
             
            <div className="settings_wrapper"> 
                 <div className="settings_wrapper_detail">
                     <div className="settings_update_tile">Update your profile</div>
                     <div className="settings_delete_tile">Delete your profile</div>
                 </div>

                 <form  className="settings_form">
                     <label htmlFor="">Profile picture</label>
                     <div className="settings_profile_picture">
                         <img src="https://instagram.fdel13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/242199045_285256256744348_859592964385144808_n.jpg?_nc_ht=instagram.fdel13-1.fna.fbcdn.net&_nc_ohc=ajHauNgoPfUAX8CZN4e&edm=ABfd0MgBAAAA&ccb=7-4&oh=5fa47cc78ed84b4363ee10be68033dfb&oe=6171AA16&_nc_sid=7bff83" alt="" className="profile" />
                         <label htmlFor="file_input">
                             <i title='click to upload your avatar'  className="far settings_pp_icon  fa-user-circle"></i>
                         </label>
                         <input type="file" style={{display:"none"}} name="file_input" id="file_input" />
                     </div>
                     <div className="settings_input_group">
                         <label htmlFor="username">Username</label>
                         <input type="text" name="username" id="username" placeholder='Username' className="control username" />
                     </div>
                     <div className="settings_input_group">
                         <label htmlFor="password">Password</label>
                         <input type="password" name="password" id="password" placeholder='password' className="password control" />
                     </div>
                   
                     <div className="settings_input_group">
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" id="email" placeholder='email' className="email control" />
                     </div>

                     <div className="settings_input_group">
                         <label htmlFor="gender">Gender</label>
                         <select name="gender" id="gender">
                             <option value="">Choose Gender</option>
                             <option value="male">Male</option>
                             <option value="female">FeMale</option>
                         </select>
                     </div>

                     <div className="settings_input_group">
                         <button className="btn" type='button'>Update</button>
                     </div>
                     
                 </form>
            
             </div>
            <Sidebar/>
        </div>
    );
};

export default Settings;