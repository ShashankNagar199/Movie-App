// Modal.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/actions/movieOperationsActions';
import "../../style.css";
import "../moviesOperations/MoviesPages.css";

const ViewMovieAllDetails = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.movieOperation.isModalOpen);
  const selectedMovie = useSelector((state) => state.movieOperation.selectedMovie);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  if (!isModalOpen || !selectedMovie) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModalHandler}>&times;</span>
        <h2>{selectedMovie.Title}</h2>
        {selectedMovie.Poster && <img style={{height:"300px"}} src={selectedMovie.Poster} alt={selectedMovie.Title} />}
        <p><strong>Year:</strong> {selectedMovie.Year ?selectedMovie.Year:'...loading'}</p>
        <p><strong>Rated:</strong> {selectedMovie.Rated ?selectedMovie.Rated:'...loading'}</p>
        <p><strong>Released:</strong> {selectedMovie.Released ?selectedMovie.Released:'...loading'}</p>
        <p><strong>Runtime:</strong> {selectedMovie.Runtime ?selectedMovie.Runtime:'...loading'}</p>
        <p><strong>Genre:</strong> {selectedMovie.Genre ?selectedMovie.Genre:'...loading'}</p>
        <p><strong>Director:</strong> {selectedMovie.Director ?selectedMovie.Director:'...loading'}</p>
        <p><strong>Writer:</strong> {selectedMovie.Writer ?selectedMovie.Writer:'...loading'}</p>
        <p><strong>Actors:</strong> {selectedMovie.Actors ?selectedMovie.Actors:'...loading'}</p>
        <p><strong>Plot:</strong> {selectedMovie.Plot ?selectedMovie.Plot:'...loading'}</p>
        <p><strong>Language:</strong> {selectedMovie.Language ?selectedMovie.Language:'...loading'}</p>
        <p><strong>Country:</strong> {selectedMovie.Country ?selectedMovie.Country:'...loading'}</p>
        <p><strong>Awards:</strong> {selectedMovie.Awards ?selectedMovie.Awards:'...loading'}</p>
        <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating ?selectedMovie.imdbRating:'...loading'}</p>
        <p><strong>IMDB Votes:</strong> {selectedMovie.imdbVotes ?selectedMovie.imdbVotes:'...loading'}</p>
        <button className="btn btn-danger" onClick={closeModalHandler}>Close</button>
      </div>
    </div>
  );
};

export default ViewMovieAllDetails;
