import React from 'react';
import {Link} from 'react-router-dom'
import "./index.css";
import hiking from './Assets/hiking.jpeg';
import climbing2 from './Assets/climbing2.jpeg';
import camping from './Assets/camping.jpeg';
import peoplehands from './Assets/peoplehands.jpeg';
import climbingfriends from './Assets/climbingfriends.jpeg';
import people1 from './Assets/people1.jpeg';

class UserHomepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [], 
        } 
    }

    render () {

        return (
            <>
                <body>
                    <div className="px-4 py-3 my-10 text-center">
                    <h1 className="display-2 fw-bold">Welcome to the Campfire</h1>
                        
                        <div className="px-9 text-center display-6 fw-bold " >
                            Check out current Events!
                            <p></p>
                            <Link to="/Activities/list">
                            <button type="button" className="btn btn-outline-warning button-font">To Events List Page</button>
                            </Link>
                        </div>
                    </div>
                    
                    <main className='picture-grid'>
                    
                        <div className='picture-grid'>
                            <img className='picture-card' src={hiking}  alt="hiking"/>
                            <img className='picture-card' src={climbing2} alt="climbing" />
                            <img className='picture-card' src={camping} alt="camping"/>
                        </div>
                        
                    </main>
                    <div className="px-4 py-3 my-10 text-center display-6 fw-bold " >
                        Find like minded adventurers with our Partner-Finder
                        <p></p>
                        <Link to="/Activities/list">
                        <button type="button" className="btn btn-outline-warning button-font">To Partner Finder Page</button>
                        </Link>
                    </div>
                       <div className='picture-grid'>
                            <img className='picture-card' src={climbingfriends}  alt="hiking"/>
                            <img className='picture-card' src={people1} alt="climbing" />
                            <img className='picture-card' src={peoplehands} alt="camping"/>
                        </div>
                </body>
            </>
                    
    
        )        
    }
}

export default UserHomepage
