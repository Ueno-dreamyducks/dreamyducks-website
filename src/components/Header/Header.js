import './Header.css';
import { CalendarMonth, Home, People } from '@mui/icons-material';


function Header() {
    return (
        <div className="App-header">
            <div className='App-header-inside'>
                <a style={{textDecoration: "none", color : "white"}} href='/'>
                    <h2 className='jetbrains-mono-600'>dreamyducks</h2>
                </a>
                <div style={{ marginLeft: "auto" }}>
                    <People className='Header-icon' sx={{ fontSize: "32px" }} />
                    <CalendarMonth className='Header-icon' sx={{ fontSize: "32px" }} />
                </div>
            </div>
        </div>
    )
}

export default Header;