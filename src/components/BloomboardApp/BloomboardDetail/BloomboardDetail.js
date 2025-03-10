import { useParams } from "react-router-dom";
import './Bloomboard.css';
import { ArrowBack } from "@mui/icons-material";

function BloomboardDetail() {
    const { key } = useParams();

    const data = JSON.parse(sessionStorage.getItem(key));

    return (
        <div className="BBDetail-container">
            <div className="BBDetail-top">
                <ArrowBack sx={{fontSize: "48px", padding: "0 12px", width: "5%", cursor:"pointer"}} />
                <h1 className="text-bold text-align-center" style={{width: "95%"}}>{data.className}</h1>
            </div>
            {data.assignments.map((assignment, index) => (
                <BBDetail key={index} row={assignment} />
            ))}
        </div>
    )
}

export default BloomboardDetail;

function BBDetail({row}) {
    return(
        <div className="BB-row">
            <div className="BB-row-content">
            <p style={{width: "80%"}} >{row.Assignment.slice(0 , -1)}</p>
            <p style={{width: "20%"}} className="BBDetail-row-score">{row.Score}</p>            </div>
        </div>
    )
}