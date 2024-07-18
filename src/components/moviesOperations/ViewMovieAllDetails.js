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
        <p><strong>Year:</strong> {selectedMovie.Year}</p>
        <p><strong>Rated:</strong> {selectedMovie.Rated}</p>
        <p><strong>Released:</strong> {selectedMovie.Released}</p>
        <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
        <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
        <p><strong>Director:</strong> {selectedMovie.Director}</p>
        <p><strong>Writer:</strong> {selectedMovie.Writer}</p>
        <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
        <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        <p><strong>Language:</strong> {selectedMovie.Language}</p>
        <p><strong>Country:</strong> {selectedMovie.Country}</p>
        <p><strong>Awards:</strong> {selectedMovie.Awards}</p>
        <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
        <p><strong>IMDB Votes:</strong> {selectedMovie.imdbVotes}</p>
        <button className="btn btn-danger" onClick={closeModalHandler}>Close</button>
      </div>
    </div>
  );
};

export default ViewMovieAllDetails;
