import { useEffect, useState } from "react";
import MoviePoster from "~/components/MoviePoster";
import searchService from "~/apiServices/searchService";
import { useParams } from "react-router-dom";

function Search() {
  const { textSearch } = useParams();
  const [isMovie, setIsMovie] = useState([]);
  useEffect(() => {
    setIsMovie([]);
    const getMovies = async () => {
      const result = await searchService(textSearch);
      setIsMovie(result);
    };
    getMovies();
  }, [textSearch]);
  return (
    <div>
      {isMovie.length > 0 && (
        <div>
          <div className=" mb:pt-[20px]">
            <div className="text-[24px] font-[600] ml-[10px] mb-[10px] text-white">
              <span className="text-[color:var(--primary)]">Search:</span>{" "}
              {textSearch}
            </div>
            {isMovie.map(
              ({ id, poster_path, original_title, vote_average }, index) => {
                return (
                  <MoviePoster
                    imgWidth="w-full"
                    width="w-[16.6%] mb:w-[50%]"
                    key={index}
                    id={id}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    title={original_title}
                    star={vote_average}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
