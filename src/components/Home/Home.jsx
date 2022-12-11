import React from 'react';
import Header from '../Header/Header';
import MinQuestions from '../MinQuestion/MinQuestions';
import "./home.css"

const Home = (props) => {

  
        return(
            <>
            <Header />

            <main>
                {props.questions.map((qstn, idx) => {
                    return(<MinQuestions question={qstn} key={idx} />)
                })}
            </main>
            </>
        )

        // return(<Navigate to="/login" replace={true}  />)
    
    
}

export default Home;
