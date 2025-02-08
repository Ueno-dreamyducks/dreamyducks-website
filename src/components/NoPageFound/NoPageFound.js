import Header from '../Header/Header';
import './NoPageFound.css';

function NoPageFound() {
    return(
        <div>
            <header>
                <Header />
            </header>
            <div className="No-page-body">
                <h1>No Page Found yet</h1>
                <h1 className='Spinning-logo'>dd</h1>
                <a href='/' style={{fontSize: "large"}}>Back to Homepagte</a>
            </div>
        </div>
    )
}

export default NoPageFound;