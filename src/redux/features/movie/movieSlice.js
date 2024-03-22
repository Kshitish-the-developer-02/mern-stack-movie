import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: [],
    },
    filteredMovies: [],
    movieYear: [],
    uniqueYear: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },

    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },

    setMovieYears: (state, action) => {
      state.movieYear = action.payload;
    },

    setUniqueYear: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYear,
} = movieSlice.actions;

export default movieSlice.reducer;
