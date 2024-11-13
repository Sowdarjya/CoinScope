import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

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
    <div className=" items-center justify-center">
      {newsList.length > 0 ? (
        <div className="grid gap-4 grid-cols-3 grid-rows-3 p-4">
          {newsList.map((news) => (
            <div
              className="card bg-base-100 w-96 shadow-xl"
              key={news.updated_at}
            >
              <figure className="px-10 pt-10">
                <img src={news.thumb_2x} className="rounded-xl h-[12rem]" />
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
  );
};

export default NewsList;
