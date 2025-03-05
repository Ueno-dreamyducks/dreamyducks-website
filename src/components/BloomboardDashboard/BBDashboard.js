import { useEffect } from 'react';
import './BBDashboard.css';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

function BBDashboard() {
    const location = useLocation();
    const data = location.state;

    const classNames = data.map(data => data.className.trim());

    return(
        <div>
            <header className='stick-header'>
                <Header />
            </header>
            <div className='ClassCard-grid'>
            {data.map((classData, index) => (
                <ClassCard key={index} ClassData={classData} />
            ))}
            </div>
        </div>
    )
}

export default BBDashboard;

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
                <div className='' style={{width:"20%"}}>
                    <h1 className='text-bold' style={{fontSize: "1rem"}}>{classScore === 100 ? "100":classScore.toFixed(2)}</h1>
                </div>
            </div>
            <div className=''>
            {items.map((assignment,index) => (
                <div key={index}>
                    <div className='ClassCard-assignment-row'>
                        <p style={{margin: "8px 16px"}}>{assignment.Assignment.slice(0,-1)}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}