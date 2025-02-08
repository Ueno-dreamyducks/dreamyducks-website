import './Header.css';
import { CalendarMonth, LayersOutlined } from '@mui/icons-material';


function Header({backgroundColor = "var(--md-sys-color-primary)"}) {
    return (
        <div className="App-header" style={{backgroundColor: backgroundColor}}>
            <div className='App-header-inside'>
                <a style={{textDecoration: "none", color : "white"}} href='/'>
                    <h2 className='jetbrains-mono-600'>dreamyducks</h2>
                </a>
                <div style={{ marginLeft: "auto" }}>
                    <a href="/projects" className='text-decoration-none'><LayersOutlined className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                    <a href='/calendar'><CalendarMonth className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                </div>
            </div>
        </div>
    )
}

export default Header;