import './Homepage.css';
import githubIcon from '../../images/github-mark.svg';
import { LayersOutlined, Schedule } from '@mui/icons-material';
import Header from '../Header/Header';

function Homepage() {
    return (
        <div>
            <div className='Top-banner'>
                <h1 className='jetbrains-mono-600'>dreamyducks</h1>
            </div>
            <div className='Top-banner-links'>
                <TopBannerItem
                    containerColor={"container-color-tertiary"}
                    link={"https://github.com/Ueno-dreamyducks"}
                    title={"Visit Our Github"} subtitle={"Viwe our open codes"}
                    children={<img src={githubIcon} alt='Github icon' style={{ objectFit: "contain" }} />}
                />
                <TopBannerItem
                    containerColor={"container-color-secondary"}
                    link={""}
                    title={"Projects"}
                    subtitle={"View dreamyducks projects"}
                    children={<LayersOutlined sx={{ fontSize: "112px" }} />}
                />
                <TopBannerItem
                    containerColor={"container-color-tertiary"}
                    link={"/calendar"}
                    title={"Schedule"}
                    subtitle={"View Upcoming Events"}
                    children={<Schedule sx={{ fontSize: "112px" }} />}
                />

            </div>
            <header>
                <Header />
            </header>
            <div className='Homepage'>
                <div className='padding-16'>
                    <h1 className='no-margin'>aa</h1>
                    <iframe src='/widget/calendar' title='calendar' />
                </div>
            </div>
        </div>
    )
}

export default Homepage

function TopBannerItem({ containerColor, link, title, subtitle, children }) {
    return (
        <div className={`top-banner-link-container ${containerColor}`} onClick={() => { window.location.href = link; }}>
            <div style={{ display: "flex", widows: "100%" }} className='padding-horizontal-16'>
                {children}
                <div>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </div>
        </div>
    )
}