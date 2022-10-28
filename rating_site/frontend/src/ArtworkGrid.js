import React, {useState, useEffect, useCallback, useRef} from "react";
import {Link} from "react-router-dom";
import {useInView} from 'react-intersection-observer';
import {API_URL} from './constants';
import axiosInstance from "./axios";

const ArtworkGrid= () =>{
    const [ref, inView] = useInView();

    const [artwork, setArtwork] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const offset = useRef(0);


    const getArtwork = useCallback( async() => {
        try {
            const {data} = await axiosInstance.get(`http://${API_URL}:8000/artworks/?limit=20&offset=${offset.current}`);

            setArtwork((prev) => [...prev, ...data.results]);
            setHasNextPage(data.results.length === 20);
            console.log(data);
            if (data.results.length) {
                offset.current += 20;
            }
        }catch (e){
            console.error(e);
        }
        }, []);

    useEffect( () => {
        console.log(inView, hasNextPage);
        if (setHasNextPage && inView){
           getArtwork();
        }
    },[getArtwork, hasNextPage, inView]);

    return (
        <div>
            <div
              style={{
                margin: "20",
                padding: "50px",
                display: "grid",
                gridTemplateRows: "1fr ",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  position: 'relative'
              }}
            >
            {artwork.map(item=>(
              <div key={item.id}>
                <h3 className="ellipsis">{item.title}</h3><br/>
                <Link to={`/artwork/${item.id}`}
                    state= {{
                        title: item.title,
                        artist: item.artist,
                        image_path: item.image_path
                    }}><img className="artworkImage" alt={item.title} src={`http://${API_URL}:8000/${item.image_path}`}/></Link><br/>
                <span>{item.artist}</span>
              </div>
              ))}
                <div ref={ref} style={{position: 'absolute', bottom: "100px"}}/>

            </div>
        </div>

    )
}

export default ArtworkGrid;