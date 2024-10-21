import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetails, setMovie] = useState();
    const [cast, setCast] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getData();
        getCastData();
        window.scrollTo(0, 0);
    }, []);

    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    const getCastData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
            .then((res) => res.json())
            .then((data) => setCast(data.cast))
            .catch((error) => console.error("Error fetching cast:", error));
    };

    return (
        <div className="movie-detail-container">
            {currentMovieDetails ? (
                <>
                    <div className="movie-backdrop">
                        <img
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetails.backdrop_path}`}
                            alt={currentMovieDetails.title}
                        />
                    </div>
                    <div className="movie-content">
                        <div className="movie-poster">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${currentMovieDetails.poster_path}`}
                                alt={currentMovieDetails.title}
                            />
                        </div>
                        <div className="movie-details">
                            <h2>{currentMovieDetails.title}</h2>
                            <p><strong>Rating:</strong> {currentMovieDetails.vote_average}</p>
                            <p><strong>Runtime:</strong> {currentMovieDetails.runtime} mins</p>
                            <p><strong>Release Date:</strong> {currentMovieDetails.release_date}</p>
                            <p><strong>Genres:</strong> {currentMovieDetails.genres.map(genre => genre.name).join(", ")}</p>
                            <p><strong>Overview:</strong> {currentMovieDetails.overview}</p>
                        </div>
                    </div>
                    <div className="movie-cast">
                        <h3>Cast</h3>
                        <div className="cast-list">
                            {cast.slice(0, 10).map((actor) => (
                                <div className="cast-item" key={actor.id}>
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                                : "https://via.placeholder.com/200"
                                        }
                                        alt={actor.name}
                                    />
                                    <p>{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default Movie;

