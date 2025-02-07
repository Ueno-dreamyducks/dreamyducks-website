import './Header.css';
import { CalendarMonth, People } from '@mui/icons-material';


function Header() {
    return (
        <div className="App-header">
            <div className='App-header-inside'>
                <a style={{textDecoration: "none", color : "white"}} href='/'>
                    <h2 className='jetbrains-mono-600'>dreamyducks</h2>
                </a>
                <div style={{ marginLeft: "auto" }}>
                    <a href="/"><People className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                    <a href='/calendar'><CalendarMonth className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                </div>
            </div>
        </div>
    )
}

export default Header;