import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNewsData = async () => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?q=crypto&pageSize=30&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const data = await res.json();
      setNewsList(data.articles);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {newsList.map((news) => (
              <div
                className="card bg-base-100 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                key={news.publishedAt}
              >
                {news.urlToImage ? (
                  <figure className="relative pt-[56.25%] overflow-hidden">
                    <img
                      src={news.urlToImage}
                      alt={news.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </figure>
                ) : (
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}

                <div className="card-body p-4 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-400">
                    {news.title}
                  </h3>

                  {news.author && (
                    <p className="text-sm text-gray-300 mb-2 italic">
                      ~{" "}
                      {news.author.length > 30
                        ? news.author.slice(0, 30) + "..."
                        : news.author}
                    </p>
                  )}

                  <div className="mt-auto flex justify-center">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-[#faed26] text-[#121111] hover:bg-[#121111] hover:text-[#faed26] transition-colors duration-300 rounded-full px-6"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-ring loading-lg bg-[#faed26] h-24"></span>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsList;
