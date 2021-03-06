import React from 'react';
import FullStars from "../images/FullStars.png"
import HalfStars from "../images/HalfStars.png"
const Stars = (props) =>{
    const score = props.average_score;
    const calcScore = () => {
        let posMove = -(100-(10 * score))/2;
        if(score == null){
          return ''
        }
        if (score % 2 === 0){
          return (<img className ='stars' style={{transform:'translate(' + posMove + '%)'}} src={FullStars} alt={score/2 + 'stars'}/>)
        }else{
          posMove = posMove+5;
          return (<img className ='stars' style={{transform:'translate(' + posMove + '%)'}} src={HalfStars} alt={score/2 + 'stars'}/>)
        }
    }
        return(
          <div>
              {calcScore()}
          </div>
      )
  }


export default Stars;