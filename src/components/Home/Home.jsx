import React from 'react';
import Background from '../animatedCanvas/animatedCanvas';
import DPLogo from '../DPLogo/DPLogo';
import DPShort from '../DPLogo/DPShort'
import "./home.css"

const Home = (props) => {

  
        return(
            <>
            <header>
                <Background />
                <div>
                    <DPLogo />
                </div>
                    <span>TALK</span>
            </header>
            <main>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquam labore consectetur ducimus, mollitia nihil nobis laboriosam nam fugiat nesciunt quia fugit dicta animi quas tenetur nulla. Cupiditate, ratione quod.
            </main>
            </>
        )

        // return(<Navigate to="/login" replace={true}  />)
    
    
}

export default Home;
