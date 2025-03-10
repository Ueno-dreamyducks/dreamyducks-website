import { useParams } from "react-router-dom";

function BloomboardDetail() {
    const { key } = useParams();

    const data = JSON.parse(sessionStorage.getItem(key));

    return (
        <div>
            {data.assignments.map((assignment, index) => (
                <p key={index}>{assignment.Assignment}</p>
            ))}
        </div>
    )
}

export default BloomboardDetail;