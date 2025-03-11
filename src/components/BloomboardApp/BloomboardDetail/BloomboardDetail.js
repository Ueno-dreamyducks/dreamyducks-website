import { useParams } from "react-router-dom";
import './Bloomboard.css';
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";

function BloomboardDetail() {
    const { key } = useParams();
    const data = JSON.parse(sessionStorage.getItem(key));

    const [points, setPoints] = useState(0);
    const [maxPoints, setMaxPoints] = useState(0);

    useEffect(() => {
        let initPoints = 0;
        let initMax = 0;

        for(const assignment of data.assignments) {
            const assignmentPoint = Number(assignment.Score);
            const assignmentMax = Number(assignment.TotalScore);
    
            initPoints+=assignmentPoint;
            initMax+=assignmentMax
        }
        console.log(`init points: ${initPoints}, init max: ${initMax}`);

        setPoints(initPoints);
        setMaxPoints(initMax);
    },[])

    const handlePredictClick = () => {
        try {
            const calcDialog = document.getElementById('calc_dialog');

            calcDialog.showModal();
        } catch(err) {

        }
    }
    const handleCloseDialog = () => {
        try {
            const calcDialog = document.getElementById('calc_dialog');
            calcDialog.close();
        } catch(err) {

        }
    }

    const handleAddPredict = (e) => {
        console.log(e);

        const newPoint = points+Number(e.point);
        const newMaxPoint = maxPoints+Number(e.maxPoint);

        setPoints(newPoint);
        setMaxPoints(newMaxPoint);

        console.log(`New points: ${points}, new Max: ${maxPoints}`);
    }
    return (
        <div className="BBDetail-container">
            <dialog id="calc_dialog"><BBCalcDialog closeDialog={handleCloseDialog} onAddPredict={(e) => handleAddPredict(e)} /></dialog>
            <div className="BBDetail-top">
                <ArrowBack sx={{ fontSize: "48px", padding: "0 12px", width: "5%", cursor: "pointer" }} />
                <h1 className="text-bold text-align-center" style={{ width: "95%" }}>{data.className}</h1>
            </div>
            <div className="BBDetail-body">
                <div className="BBDetail-body-header">
                    <h3 className="text-bold" style={{ width: "80%" }}>Assignment</h3>
                    <h3 className="text-bold" style={{ width: "20%", display: "flex", justifyContent: "right" }}>Score</h3>
                </div>
                <div className="BBDetail-body-calc cursor-pointer" onClick={handlePredictClick}>
                    <h1>Predict Your Grade</h1>
                </div>
                {data.assignments.map((assignment, index) => (
                    <BBDetail key={index} row={assignment} />
                ))}
            </div>
        </div>
    )
}

export default BloomboardDetail;

function BBDetail({ row }) {
    const avgPercentScore = Number(row.AvgScore.slice(0,-1));
    const maxPoint = Number(row.TotalScore);
    const avgPointScore = (maxPoint*(avgPercentScore/100)).toFixed(2);

    return (
        <div className="BB-row">
            <div className="BB-row-content">
                <p style={{ width: "60%" }} >{row.Assignment.slice(0, -1)}</p>
                <p style={{ width: "20%" }} >{row.Due}</p>
                <div style={{ width: "20%" }} className="BBDetail-row-score">
                    <p className="flex-justify-right">{row.Score? row.Score : "---"}</p>
                    <p className="flex-justify-right margin-0" style={{color:"var(--md-sys-color-tertiary)", fontSize:"medium"}}>Avg. {row.AvgScore}</p>
                </div>
            </div>
        </div>
    )
}

function BBCalcDialog({closeDialog, onAddPredict}) {
    const [element, setElement] = useState({category: 0, point: 0, maxPoint: 0})

    const handleCategoryChange = (e) => {
        setElement({
            ...element,
            category: e.target.value
        });
    }
    const handlePointChange = (e) => {
        setElement({
            ...element,
            point: e.target.value
        });
    }
    const handleMaxPointChange = (e) => {
        setElement({
            ...element,
            maxPoint: e.target.value
        });
    }

    const handleSubmit = () => {
        onAddPredict(element);
    }
    return(
        <div className="BBCalcDialog">
            <div className="BBCalcDialog-header">
                <ArrowBack sx={{fontSize:"32px", color:"white", backgroundColor:"#525252", padding:"8px",borderRadius:"50px",cursor:"pointer"}} onClick={closeDialog} />
                <h2>Calc (short for calculator)</h2>
            </div>
            <form action={handleSubmit}>
                <input className="display-block" name="category" required onChange={handleCategoryChange} value={element.category} />
                <input className="display-block" name="point" required onChange={handlePointChange} value={element.point} />
                <input className="display-block" name="maxPoint" required onChange={handleMaxPointChange} value={element.maxPoint} />
                <button className="display-block" type="submit">Submit</button>
            </form>
        </div>
    )
}