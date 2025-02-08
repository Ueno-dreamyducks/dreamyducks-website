import Header from '../../Header/Header';
import './BloomBoard.css';

function BloomBoard() {
    return (
        <div>
            <header className='stick-header'>
                <Header />
            </header>
            <div className='text-align-center' style={{overflow: "hidden"}}>
                <div style={{height: "200px"}}>
                    <h1 className='anton-regular Page-subject' style={{fontSize: "4rem"}}>BloomBoard</h1>
                </div>
            </div>
        </div>
    )
}

export default BloomBoard;