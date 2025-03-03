import { useState } from 'react';
import Header from '../Header/Header';
import './BloomboardApp.css';

function BloomBoard() {
    return(
        <div>
            <header className='stick-header'>
                <Header />
            </header>
            <div className='Bloomboard-login-container text-align-center'>
                <div className={`width-50-percent height-100-percent Bloomboard-primary BloomBoard-login-left-container`} style={{height: "calc(100vh - 120px)", borderRadius: "0 32px 32px 0"}}>
                    <h1 className='text-bold' style={{fontSize: "4vw"}}>BloomBoard</h1>
                    <h3 className='margin-0'>View Your Grades</h3>
                </div>
                <div className={`width-50-percent BloomBoard-login-right-container`} style={{height: "calc(100vh - 120px"}} >
                    <h2>Log In to ***</h2>
                    <form className='Bloomboard-login-inputs-container' >
                        <label for="username" className='text-align-left'>Username</label>
                        <input id="username" name="username" className='Bloomboard-login-input' />
                        <br />
                        <label for="password">Password</label>
                        <input id="password" name="password" className='Bloomboard-login-input' />
                        <br />
                        <br />
                        <button type='submit' onClick={{}} className='Bloomboard-login-button Bloomboard-primary text-bold'>Log In</button>
                    </form>
                </div>
                {/** Mobile screen */}
                <div className='Bloomboard-mobile-login-container margin-vertical' style={{height: "calc(100vh - 90px)"}}>
                    <div className='Bloomboard-primary width-100-percent padding-vertical-16' style={{height: "50vh"}}>
                        <br />
                        <h1 className='margin-16 text-bold' style={{fontSize: "3rem"}}>BloomBoard</h1>
                    </div>
                    <div className='Bloomboard-mobile-body-container'>
                        <h1>aa</h1>
                        <div className='Bloomboard-mobile-login-button-container'>
                        <button onClick={{}} className='Bloomboard-mobile-login-button' >Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloomBoard;