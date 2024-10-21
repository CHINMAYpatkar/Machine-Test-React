import React, { useEffect, useState } from "react";
import Cards from "../card/card";
import "./movieList.css";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
            .then((res) => res.json())
            .then((data) => setMovieList(data.results))
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.length > 0 ? (
                    movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
