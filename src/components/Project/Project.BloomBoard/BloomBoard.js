import { useState } from 'react';
import Header from '../../Header/Header';
import './BloomBoard.css';
import ColorChangeScreen from '../../../images/BloomBoard/1000006604.png';

function BloomBoard() {
    const [headerColor, setHeaderColor] = useState("var(--md-sys-color-secondary-container");
    const [featureSelection, setSelection] =
        useState(0);

    const handleScroll = () => {
        if (window.scrollY > 294) {
            setHeaderColor('var(--md-sys-color-primary)');
        } else {
            setHeaderColor('var(--md-sys-color-secondary-container');
        }
    }
    window.addEventListener('scroll', handleScroll);

    const handleFeatureSelectChange = (index) => {
        console.log(`new index: ${index}`)
        setSelection(index)
    }

    return (
        <div>
            <header className='stick-header'>
                <Header backgroundColor={headerColor} />
            </header>
            <div className='text-align-center' style={{ overflow: "hidden" }}>
                <div style={{ height: "25vw", borderBottom: "4px solid var(--md-sys-color-primary", overflow: "hidden" }} className='container-color-secondary-container padding-hor' >
                    <h1 className='anton-regular Page-subject margin-0' style={{ fontSize: "10vw" }}>BloomBoard</h1>
                </div>
                <div className='Article-body-frame'>
                    <div className='text-align-center'>
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
                    </div>
                    <h1 className='Article-header'>Features</h1>
                    <div>
                        {features[featureSelection]}
                    </div>
                    <div className='Selector'>
                        <form>
                            <input type='radio' name='0' defaultChecked onClick={() => { handleFeatureSelectChange(0) }} />
                            <input type='radio' name='0' onClick={() => { handleFeatureSelectChange(1) }} />
                        </form>

                    </div>

                    <h1 className='Article-header'>Links</h1>
                    <p>Terms Of Service:</p>
                </div>
            </div>
        </div>
    )
}

export default BloomBoard;

const features = [
    <div className='Article-paragraph-body container-color-surface-container-highest'>
        <img src={ColorChangeScreen} width={"200px"} style={{ justifyItems: "center", borderRadius: "16px 0 0 16px" }} alt='Choose theme color' />
        <h3 className='padding-horizontal-16 text-bold'>Choose Colour of Your Favorite</h3>
    </div>,
    <div className='Article-paragraph-body container-color-surface-container-highest'>
        <h3 className='padding-horizontal-16 text-bold'>Choose Colour of Your Favorite</h3>
        <img src={ColorChangeScreen} width={"200px"} style={{ marginLeft: "auto", borderRadius: "0 16px 16px 0" }} alt='Choose theme color' />
    </div>
]