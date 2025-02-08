import { useEffect } from "react"

function Project() {
    useEffect(() => {
        window.location.href = '/projects';
    }, []);
    return(
        <div></div>
    )
}

export default Project;