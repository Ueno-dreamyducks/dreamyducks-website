import './BBDashboard.css';
import { useLocation } from 'react-router-dom';

function BBDashboard() {
    const location = useLocation();
    const data = location.state;

    const classNames = data.map(data => data.className.trim());

    return(
        <div>
            {classNames}
        </div>
    )
}

export default BBDashboard;