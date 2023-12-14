const getMovieGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2JmMmQ0NWQwM2M1NmU0MDM1MWY0MDRmMmI5YzE2NSIsInN1YiI6IjY1NzIxNGRmNmRjNmMwMDBlNGE2ZWY3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7dXnjssQSxvw76PThr3jqG3qtYeckQspl7-jRKHG-s",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error("There was a problem fetching movie genres:", error);
      return [];
    }
  };
  
  export { getMovieGenres };