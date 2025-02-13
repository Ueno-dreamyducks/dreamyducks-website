import './Header.css';
import { CalendarMonth, Close, Home, LayersOutlined, MenuOpen } from '@mui/icons-material';
import { useState } from 'react';


function Header({onMenuIconClick = () => {{}}, backgroundColor = "var(--md-sys-color-primary)" }) {
    const [isSideMenuOpen, setIsOpen] = useState(false);

    const handleMenuIconClick = () => {
        onMenuIconClick()
        setIsOpen(!isSideMenuOpen)
    }

    return (
        <div className="App-header" style={{ backgroundColor: backgroundColor }}>
            <div className='App-header-inside'>
                <a style={{ textDecoration: "none", color: "white" }} href='/'>
                    <h2 className='jetbrains-mono-600'>dreamyducks</h2>
                </a>
                <div style={{ marginLeft: "auto" }}>
                    <div className='Header-pc-items'>
                        <a href="/projects" className='text-decoration-none'><LayersOutlined className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                        <a href='/calendar'><CalendarMonth className='Header-icon' sx={{ fontSize: "32px" }} /> </a>
                    </div>
                    <div className='Header-sideMenu'>
                        <button onClick={handleMenuIconClick} style={{ background: "none", border: "none" }}><MenuOpen className='Header-icon' sx={{ fontSize: "32px" }} /></button>
                        <div className={`Header-sideMenu-items ${isSideMenuOpen ? 'open' : ""}`}>
                            <div className='Header-sideMenu-container'>
                                <div className='Header-sideMenu-top'>
                                    <a href='/' className='text-decoration-none white'><div className='Align-center'><Home className='Header-icon' sx={{fontSize: "32px"}} /><p>Home</p></div></a>
                                    <Close className='cursor-pointer' sx={{fontSize: "44px", marginLeft: "auto"}} onClick={handleMenuIconClick} />
                                </div>
                                <a href="/projects" className='text-decoration-none white' ><div className='Align-center'><LayersOutlined className='Header-icon' sx={{ fontSize: "32px" }} /><p>Projects</p></div></a>
                                <a href='/calendar' className='text-decoration-none white'><div className='Align-center'><CalendarMonth className='Header-icon' sx={{ fontSize: "32px" }} /><p>Calendar</p></div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header;