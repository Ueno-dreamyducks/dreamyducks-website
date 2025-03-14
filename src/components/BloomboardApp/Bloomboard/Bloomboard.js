import { useState } from 'react';
import Header from '../../Header/Header';
import './BloomboardApp.css';
import { useNavigate } from 'react-router-dom';



function BloomBoard() {
    const [usernamePassword, setUsernamePassword] = useState({ username: "", password: "" });
    const [isLogging, setIsLogging] = useState(false);

    const handleUsernameChange = (e) => {
        setUsernamePassword({
            ...usernamePassword,
            username: e.target.value,
        })
    }
    const handlePasswordChange = (e) => {
        setUsernamePassword({
            ...usernamePassword,
            password: e.target.value
        })
    }

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const response = await fetch('https://dreamyducks-hac-api.uc.r.appspot.com/bb-hac-api', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usernamePassword)
            });

            if (!response.ok) {
                throw new Error("HTTP Error", response.status);
            }

            const jsonData = await response.json();

            console.log('response:', jsonData);
            sessionStorage.setItem('classList', JSON.stringify(jsonData));
            navigate('/Bloomboard/Dashboard', { state: jsonData });
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmitClick = () => {
        console.log('handle submit function');
        setIsLogging(true);
        handleSubmit();
    }

    return (
        <div>
            <header className='stick-header'>
                <Header />
            </header>
            <div className='Bloomboard-login-container text-align-center'>
                <div className={`width-50-percent height-100-percent Bloomboard-primary BloomBoard-login-left-container`} style={{ height: "calc(100vh - 120px)", borderRadius: "0 32px 32px 0" }}>
                    <h1 className='text-bold' style={{ fontSize: "4vw" }}>BloomBoard</h1>
                    <h3 className='margin-0'>View Your Grades</h3>
                </div>
                <div className={`width-50-percent BloomBoard-login-right-container`} style={{ height: "calc(100vh - 120px" }} >
                    <h2>Log In to ***</h2>
                    <form className='Bloomboard-login-inputs-container' method='POST' action={handleSubmit} >
                        <label htmlFor="username" className='text-align-left'>Username</label>
                        <input id="username" name="username" onChange={handleUsernameChange} value={usernamePassword.username} className='Bloomboard-login-input' />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type='password' onChange={handlePasswordChange} value={usernamePassword.password} className='Bloomboard-login-input' />
                        <br />
                        <br />
                        <button type='submit' onClick={handleSubmitClick} disabled={isLogging} className='Bloomboard-login-button Bloomboard-primary text-bold cursor-pointer'>Log In</button>
                        <progress max="100"></progress>
                    </form>
                </div>
                {/** Mobile screen */}
                <div className='Bloomboard-mobile-login-container margin-vertical' style={{ height: "calc(100vh - 90px)" }}>
                    <div className='Bloomboard-primary width-100-percent padding-vertical-16' style={{ height: "50vh" }}>
                        <br />
                        <h1 className='margin-16 text-bold' style={{ fontSize: "3rem" }}>BloomBoard</h1>
                    </div>
                    <div className='Bloomboard-mobile-body-container'>
                        <form method="POST" action={handleSubmit}>
                            <h1>Log In</h1>
                            <select name='district' id="district" className='Bloomboard-select'>
                                <option value="Deonton ISD">Denton ISD</option>
                                <option value="Frisco ISD">Frisco ISD</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="username" className='text-align-left'>Username</label>
                            <br />
                            <input id="username" name="username" onChange={handleUsernameChange} value={usernamePassword.username} className='Bloomboard-login-input' />
                            <br />
                            <label htmlFor="password">Password</label>
                            <br />
                            <input id="password" name="password" type='password' onChange={handlePasswordChange} value={usernamePassword.password} className='Bloomboard-login-input' />
                            <div className='Bloomboard-mobile-login-button-container'>
                                <button type='submit' disabled={isLogging} className='Bloomboard-mobile-login-button cursor-pointer' >Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloomBoard;