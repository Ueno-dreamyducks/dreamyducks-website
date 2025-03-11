import { useParams } from "react-router-dom";
import './Bloomboard.css';
import { ArrowBack } from "@mui/icons-material";

function BloomboardDetail() {
    const { key } = useParams();

    const data = JSON.parse(sessionStorage.getItem(key));

    return (
        <div className="BBDetail-container">
            <div className="BBDetail-top">
                <ArrowBack sx={{ fontSize: "48px", padding: "0 12px", width: "5%", cursor: "pointer" }} />
                <h1 className="text-bold text-align-center" style={{ width: "95%" }}>{data.className}</h1>
            </div>
            <div className="BBDetail-body">
                <div className="BBDetail-body-header">
                    <h3 className="text-bold" style={{ width: "80%" }}>Assignment</h3>
                    <h3 className="text-bold" style={{ width: "20%", display: "flex", justifyContent: "right" }}>Score</h3>
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