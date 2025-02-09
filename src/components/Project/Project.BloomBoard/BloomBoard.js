import { useState } from 'react';
import Header from '../../Header/Header';
import './BloomBoard.css';

function BloomBoard() {
    const [headerColor, setHeaderColor] = useState("var(--md-sys-color-secondary-container")

    const handleScroll = () => {
        if (window.scrollY > 294) {
            setHeaderColor('var(--md-sys-color-primary)');
        } else {
            setHeaderColor('var(--md-sys-color-secondary-container');
        }
    }

    window.addEventListener('scroll', handleScroll);

    return (
        <div>
            <header className='stick-header'>
                <Header backgroundColor={headerColor} />
            </header>
            <div className='text-align-center' style={{ overflow: "hidden" }}>
                <div style={{ height: "200px", borderBottom: "4px solid var(--md-sys-color-primary", overflow: "hidden" }} className='container-color-secondary-container padding-hor' >
                    <h1 className='anton-regular Page-subject' style={{ fontSize: "4rem" }}>BloomBoard</h1>
                </div>
                <div className='Article-body-frame'>
                    <h1 style={{ fontSize: "2.5rem" }}>About</h1>
                    <div className='App-overview-container' style={{ maxWidth: "555px" }}>
                        <h2 className='margin-0'>Overview</h2>
                        <hr />
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td className='Article-table-title'>Name</td>
                                    <td className='Article-table-data'>BloomBoard</td>
                                </tr>
                                <tr>
                                    <td className='Article-table-title'>Platform</td>
                                    <td className='Article-table-data'>Android</td>
                                </tr>
                                <tr>
                                    <td className='Article-table-title'>Status</td>
                                    <td className='Article-table-data'>Closed Test</td>
                                </tr>
                                <tr>
                                    <td className='Article-table-title'>Version</td>
                                    <td className='Article-table-data'>--</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <p className='text-align-left margin-8' style={{ fontSize: "1.5rem" }}>aa</p>
                </div>
            </div>
        </div>
    )
}

export default BloomBoard;