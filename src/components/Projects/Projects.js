import './Projects.css';
import { useState } from "react"
import Header from "../Header/Header"
import { ArrowForward, ExpandMore, Launch, School } from '@mui/icons-material';

function Projects() {
    const [headerColor, setHeaderColor] = useState("var(--md-sys-color-secondary-container");

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setHeaderColor('var(--md-sys-color-primary)');
        } else {
            setHeaderColor('var(--md-sys-color-secondary-container');
        }
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <div className='container-color-surface min-height-100vh'>
            <header className="stick-header">
                <Header backgroundColor={headerColor} />
            </header>
            <div className="text-align-center container-color-secondary-container" style={{ width: "100%", height: "25vw", borderBottom: "4px solid var(--md-sys-color-primary", overflow: "hidden" }}>
                <h1 className="no-margin anton-regular Page-subject">PROJECTS</h1>
            </div>
            <div className='Body-frame'>
                <div className='Side-content'>
                    <h1>side content</h1>
                </div>
                <div className='text-align-center Main-content grid-row-2'>
                    <ProjectCard icon={<School sx={{ fontSize: "72px", margin: "16px" }} />} title={"BloomBoard"} description={"Check HAC Grades"} isActionMore={true} height={`400px`} link={'/project/bloomboard'} >
                        <div className='Display-none-700px-less'>
                            <div className='Project-more-container Phone-image-frame'>

                            </div>
                            <div className='padding-16' style={{ textAlign: "right", alignSelf: "flex-end", display: 'flex', gap: "8px", justifyContent: "end" }}>
                                <a href='/project/bloomboard' className='Project-button container-color-primary'>Explore</a>
                                <button className='Project-button container-color-tertiary' onClick={() => { }}>Play Store <Launch sx={{ verticalAlign: "middle" }} /></button>
                            </div>
                        </div>

                    </ProjectCard>
                    <ProjectCard icon={<School sx={{ fontSize: "72px", margin: "16px" }} />} title={"BloomBoard"} description={"Check HAC Grades"} isActionMore={true} >
                        <h1>aa</h1>
                    </ProjectCard>
                    <ProjectCard icon={<School sx={{ fontSize: "72px", margin: "16px" }} />} title={"BloomBoard"} description={"Check HAC Grades"} isActionMore={true} >
                        <h1>aa</h1>
                    </ProjectCard>
                    <ProjectCard icon={<School sx={{ fontSize: "72px", margin: "16px" }} />} title={"BloomBoard"} description={"Check HAC Grades"} isActionMore={true} >
                        <h1>aa</h1>
                    </ProjectCard>
                </div>
                <div className='Side-content'>
                    <h1>side content</h1>
                </div>
            </div>

        </div>
    )
}

export default Projects;

function ProjectCard({ icon, title, description, link, isActionVisit = false, isActionMore = false, height, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenButton = () => {
        if (isActionMore) {
            setIsOpen(!isOpen);
        }
    }

    return (
        <div className='Width-100-percent-700px-less'>
            <div className='Project-mobile-card '>
                <div className='Project-icon'>{icon}</div>
                <h2 className='text-bold'>{title}</h2>
                <a href={link} className='Project-button container-color-tertiary'>Visit</a>
            </div>

            <div className='Project-card'>
                <div className='Project-icon' style={{ width: "20%" }}>
                    {icon}
                </div>
                <div className='Border-left Project-title' style={{ width: "30%" }}>
                    <h1 style={{ margin: "0 16px" }}>{title}</h1>
                </div>
                <div className='Border-left close-at-700px' style={{ width: "40%" }} >
                    <p style={{ margin: "8px 16px" }}>{description}</p>
                </div>
                <div className='Border-left' style={{ width: "10%" }} >
                    <div className={`Project-action ${isActionVisit ? "visit" : ""}`}>
                        <a href={link}><ArrowForward sx={{ fontSize: "32px" }} className='Project-action-icon' /></a>
                        <p className='margin-0'>Visit</p>
                    </div>
                    <div className={`Project-action ${isActionMore ? "more" : ""}`} onClick={handleOpenButton}>
                        <ExpandMore sx={{ fontSize: "3vw" }} className='Project-action-icon' />
                        <p className='margin-0' style={{ fontSize: "1.75vw" }}>More</p>
                    </div>
                </div>
            </div>
            <div className={`Expand-content ${isOpen ? "open" : ""}`} style={{ height: `${isOpen ? height : 0}` }} >
                <div style={{ padding: "8px 20px", width: "100%" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}