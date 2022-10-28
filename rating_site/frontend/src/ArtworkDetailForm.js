import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {API_URL} from './constants/index';
import {FaStar} from 'react-icons/fa';
import styled from 'styled-components';
import axiosInstance from "./axios";

const Artwork = () =>{
    const {id} = useParams();
    const location = useLocation();
    const {title, artist, image_path} = location.state;

    // Star-rating
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const isInitial = useRef(true);
    const score = useRef(0);
    const ARRAY = [0, 1, 2, 3, 4];

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for(let i= 0; i < 5; i++){
            clickStates[i] = i <= index;
        }
        setClicked(clickStates);
        let tmp_Score = clickStates.filter(Boolean).length;
        if (score.current !== 0){
            axiosInstance.patch(`rating/${id}/`, {
                rating: tmp_Score,
            })
        }else{
            axiosInstance
                .post('rating/', {
                    artwork: id,
                    rating: tmp_Score,
                })

        }
        score.current = tmp_Score;

    };

    const deleteRating = () => {
        setClicked([false, false, false, false, false]);
        score.current = 0;
        axiosInstance.delete(`rating/${id}/`);
    };

    const getRating = useCallback(async() => {
        await axiosInstance.get(`rating/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        score.current = response.data.rating;
                        isInitial.current = false;

                        let clickStates = [...clicked];
                        for(let i= 0; i < 5; i++){
                            clickStates[i] = i < score.current;
                        }
                        setClicked(clickStates);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        console.log("Error : 아직 평가되지 않은 Artwork");

                    }
                });
        console.log("This Artwork Rating : ", score.current);
            // postRating();
    }, []);

    useEffect( () =>{
        getRating();

    }, [getRating]);

    /*
    1. Artwork의 Rating을 먼저 받아와서, 있다면 -> 별에 표시 , 없다면 -> 그대로 놔두기(모두 Gray인 상태)
    2. 있었다면, 서버에 PATCH를 통한 업데이트 요청 , 없었다면(0점이라면) -> POST로 서버에 개재
     */



    return (
        <div align="center">
            <br/>
            <br/>
            <Wrap>
                <Stars>
                    {ARRAY.map((el, idx) => {
                        return (
                            <FaStar
                                key={idx}
                                size="50"
                                onClick={() => handleStarClick(el)}
                                className={clicked[el] && 'yellowStar'}/> // {조건 && 출력문} => 조건에 따라 && 뒤가 출력 ex) clicked[0] = true -> className='yellowStar'
                        );
                    })}
                </Stars>
            </Wrap>
            <button onClick={deleteRating}>평가 취소</button>
            <img className={"detailImage"} alt={title} src={`http://${API_URL}:8000/${image_path}`}/><br/>

            <h1>{id}.</h1><h2>{title}</h2>
            <h3>{artist}</h3><br/>
        </div>
    );
}


export default Artwork;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  
`;


const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  justify-content: center;
  

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;