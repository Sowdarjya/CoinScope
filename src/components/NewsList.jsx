import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=crypto&lang=en&max=30&apikey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await res.json();
      setNewsList(data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg bg-[#faed26] h-24"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {newsList.map((news) => (
          <div
            key={news.url}
            className="card bg-base-100 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            {news.image ? (
              <figure className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={news.image}
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

              {news.source.name && (
                <p className="text-sm text-gray-300 mb-2 italic">
                  ~ {news.source.name}
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
    </div>
  );
};

export default NewsList;
