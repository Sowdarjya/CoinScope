import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNewsData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/news?id=doge`);
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
    <div className="flex items-center justify-center">
      {newsList.length > 0 ? (
        newsList.map((news) => <li key={news.id}> {news.title} </li>)
      ) : (
        <span className="loading loading-ring loading-lg bg-[#faed26] h-screen"></span>
      )}
    </div>
  );
};

export default NewsList;
