import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import MinQuestions from '../MinQuestion/MinQuestions';
import Searchbar from '../SearchBar/Searchbar';
import "./home.css"

const Home = (props) => {

  const [filteredQuestions, setFilteredQuestions] = useState(null)

  useEffect(()=>{
    setFilteredQuestions(props.questions)
  }, [props])

  function filterQuestions(e){
    let input = e.target.value;
    const filteredByTitle = props.questions.filter( (obj) => {return( obj.title.toLowerCase().includes(input.toLowerCase()))})
    setFilteredQuestions(filteredByTitle)
}


        return(
            <>
            <Header />
            <Searchbar filterQuestions={filterQuestions}/>
            <main>
                {filteredQuestions && filteredQuestions.map((qstn, idx) => {
                    return(<MinQuestions question={qstn} key={idx} />)
                })}
            </main>
            </>
        )

        // return(<Navigate to="/login" replace={true}  />)
    
    
}

export default Home;
