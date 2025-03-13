import { useEffect, useState } from 'react';
import './BBDashboard.css';
import { useLocation } from 'react-router-dom';
import Header from '../../Header/Header';

function BBDashboard() {
    const location = useLocation();
    const data = location.state;

    const [frameLocation, setFrameLocation] = useState('/Bloomboard/ClassList');
    const [selectedClassIndex, setIndex] = useState(null);

    const handleFrameMove = (e) => {
        setFrameLocation(e.link);
        setIndex(e.index);

        console.log("index", e.index, 'stored index',selectedClassIndex);
    };

    useEffect(() => {
        for(const classData of data) {
            const key = classData.className.trim();

            sessionStorage.setItem(key, JSON.stringify(classData));            
            console.log(classData);
        }
    }, [data]);

    return(
        <div className='BBDashboard'>
            <header className='sticky-header'>
                <Header />
            </header>
            <div className='BBDashboard-body'>
                <menu>
                    <h2 className='text-bold'>[Usernme]</h2>
                    {data.map((classData, index) => (
                        <MenuClassCard classData={classData} index={index} key={index} onMove={(e) => handleFrameMove(e)} />
                    ))}
                </menu>
                <iframe src={frameLocation} title='Dashboard frame' />
            </div>
        </div>
    )
}

export default BBDashboard;

export function ClassList() {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const storedClassListJSON = sessionStorage.getItem('classList');
        const storedData = JSON.parse(storedClassListJSON);

        console.log("Stored data key:classList ",storedData);

        setClasses(storedData);
    },[]);

    return(
        <div className='ClassCard-grid'>
            {classes?.map((classData, index) => (
                <ClassCard key={index} ClassData={classData} />
            ))}
        </div>  
    );
}

function ClassCard({ClassData}) {
    var classScore = 0;
    var categoryWeightTotal = 0;
    for(const category of ClassData.categories) {
        categoryWeightTotal += Number(category.CategoryWeight);
    }
    console.log("categoryweight total", categoryWeightTotal)

    for(const category of ClassData.categories) {
        const points = Number(category.Points)
        const max = Number(category.MaxPoints)
        const weight = Number(category.CategoryWeight)

        const categoryScoreOf100 = points/max;

        const categoryScore = (categoryScoreOf100*weight)/categoryWeightTotal *100;

        classScore+=categoryScore

        console.log(`points ${points} max ${max}, weight: ${weight}, categoryScore: ${categoryScore}`)
    }

    let items = [];

    for(var i = 0;i<2;i++) {
        items.push(ClassData.assignments[i]);
    }
    return(
        <div className='ClassCard-container'>
            <div className='ClassCard-header'>
                <h1 className='text-line-max-1 text-bold' style={{width:"80%", fontSize:"1.25rem"}}>{ClassData.className.trim().split(" - ")[1].replace(/\d+/g, '')}</h1>
                <div className='ClassCard-avg' style={{width:"20%"}}>
                    <h1 className='text-bold' style={{fontSize: "1.25rem"}}>{classScore === 100 ? "100":classScore.toFixed(2)}</h1>
                </div>
            </div>
            <div className=''>
            {items.map((assignment,index) => (
                <div key={index}>
                    <div className='ClassCard-assignment-row'>
                        <p style={{width: "85%", margin: "8px 16px"}}>{assignment.Assignment.slice(0,-1)}</p>
                        <p style={{width: "15%", textAlign: "right", margin: "8px 16px"}}>{assignment.Score ==='' ? '--' : Number(assignment.Score).toFixed(0)}/{Number(assignment.TotalScore).toFixed(0)}</p>
                    </div>
                </div>
            ))}
            <hr />
            <a href={`/Bloomboard/Dashboard/${ClassData.className.trim()}`} style={{color: "var(--md-sys-color-secondary)"}} className='text-decoration-none text-align-center ClassCard-viewAll'>View All</a>
            </div>
        </div>
    )
}

function MenuClassCard({classData, index, onMove, isSelected}) {
    return(
        <button onClick={() => onMove({index: {index}, link:`/Bloomboard/Dashboard/${classData.className.trim()}`})} style={{color: "var(--md-sys-color-secondary)"}} className='text-decoration-none MenuClassCard-btn'>
            <div className={`MenuClassCard`}>
                <h4 className='text-bold'>{classData.className.trim().split(" - ")[1].replace(/\d+/g, '')}</h4>
            </div>
        </button>
    )
}