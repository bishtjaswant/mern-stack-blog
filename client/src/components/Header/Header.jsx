import './Header.css';
import bannerImg from "../../assets/images/banner.jpg"


const Header = () => {
    return (
        <div className='header'>
            <div className="header_title">
                <span className='header_title_sm'>hello node</span>
                <span className='header_title_lg'>hello node sm</span>
            </div>
            <div className="header_bgImage">
                {/* <img src={bannerImg} alt="" /> */}
            </div>
        </div>
    );
};

export default Header;