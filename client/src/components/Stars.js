import React from 'react';
import FullStars from "../images/FullStars.png"
import HalfStars from "../images/FullStars.png"

const stars = (score) =>{
    const calcScore = () => {
        const posMove = -20 * (Math.floor((10 - score)/2));
        if(score == null){
          return ''
        }
        if (score % 2 === 0){
          return (<img className ='stars' style={{left:posMove + '%'}} src={FullStars} />)
        }else{
          return (<img className ='stars' style={{left:posMove + '%'}} src={HalfStars}/>)
        }
      }

        return(
            <div>
                {calcScore()}
            </div>
        )
}


export default stars;