import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const lastArticle = currentPage * articlesPerPage;
  const firstArticle = lastArticle - articlesPerPage;
  const currentNewsList = newsList.slice(firstArticle, lastArticle);

  const paginate = (pageNo) => setCurrentPage(pageNo);

  const fetchNewsData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/news?id=crypto`
      );
      const data = await res.json();
      setNewsList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {currentNewsList.map((news) => (
              <div
                className="card bg-base-100 w-80 shadow-xl mx-auto"
                key={news.updated_at}
              >
                <figure className="">
                  <img
                    src={news.thumb_2x}
                    alt={news.title}
                    className=" h-[12rem] w-full"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <p>{news.title}</p>
                  <div className="card-actions">
                    <button className="btn hover:bg-[#faed26] hover:text-[#121111]">
                      <a href={news.url} target="_blank">
                        Check out
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="loading loading-ring loading-lg bg-[#faed26] h-screen"></span>
        )}
      </div>
      <Pagination
        elementsPerPage={articlesPerPage}
        totalElements={newsList.length}
        paginate={paginate}
      />
    </>
  );
};

export default NewsList;
