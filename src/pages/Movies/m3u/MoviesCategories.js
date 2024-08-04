import React, { useState, useEffect } from "react";
import Navbar from "../../../components/common/Navbar";
import CategorySearchbar from "../../../components/common/CategorySearchbar";
import { arrangeByGroupTitle, isBrowser } from "../../../constant/helper";
import CategoriesList from "../../../components/common/CategoriesList";
import NewMoviesSeriesCard from "../../../components/Cards/NewMoviesSeriesCard";
import { useNavigate } from "react-router-dom";
import NoResultFound from "../../../components/common/NoResultFound";

const MoviesCategories = () => {
  const path = isBrowser && window.history;
  const navigate = useNavigate();
  const moviesCategories = path.state?.usr?.moviesCategories;
  const arrangedCategory = arrangeByGroupTitle(moviesCategories);
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryByGroupTitle, setCategoryByGroupTitle] =
    useState(arrangedCategory);

  useEffect(() => {
    setSelectedCategory(categoryByGroupTitle?.[0]?.[0]?.group_title);
    setAllCategory(categoryByGroupTitle?.[0]);
  }, []);

  const onSelectCategory = (category) => {
    setSelectedCategory(category?.[0]?.group_title);
    setAllCategory(category);
  };

  const searchCategory = (value) => {
    if (value) {
      const filteredData = categoryByGroupTitle?.filter((channel) =>
        channel?.[0]?.group_title?.toLowerCase().includes(value?.toLowerCase())
      );
      setCategoryByGroupTitle(filteredData);
    } else {
      setCategoryByGroupTitle(arrangedCategory);
    }
  };

  const redirectToMovieInfo = (data) => {
    navigate("/dashboard/m3u/movies-info", { state: { info: data } });
  };
  return (
    <div>
      <Navbar notCategories={true} heading="Movies" />
      {moviesCategories.length > 0 ? (
        <div className="flex flex-row gap-5 md:mx-5 mx-auto">
          <div className="lg:w-[400px] w-[250px]">
            <CategorySearchbar
              placeholder="Search in categories"
              onChange={(value) => searchCategory(value)}
            />
            <div className="flex flex-col h-[670px] overflow-scroll sticky top-0">
              {categoryByGroupTitle?.map((category, index) => {
                return (
                  <CategoriesList
                    data={category}
                    bgColor={
                      selectedCategory === category?.[0]?.group_title &&
                      "bg-rgbaColor-300"
                    }
                    key={index}
                    onClick={() => onSelectCategory(category)}
                  />
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            }}
            className=" lg:gap-4 gap-2 h-full"
          >
            {allCategory?.map((movies, index) => {
              return (
                <NewMoviesSeriesCard
                  data={movies}
                  key={index}
                  onClick={redirectToMovieInfo}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default MoviesCategories;
