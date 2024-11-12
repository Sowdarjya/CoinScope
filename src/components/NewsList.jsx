import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNewsData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/news`);
      const data = await res.json();
      setNewsList(data.data);
      console.log("News>>>>>", newsList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div>
      {newsList.length > 0 ? (
        newsList.map((news) => (
          <li key={news.id}> {news.title} </li> // Added key prop here
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsList;
