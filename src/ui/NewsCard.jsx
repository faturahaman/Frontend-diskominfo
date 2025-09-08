// src/ui/NewsCard.jsx
import React from "react";

const NewsCard = ({ news }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
    <img
      src={news.image}
      alt={news.title}
      className="h-40 w-full object-cover"
    />
    <div className="p-4 flex-1 flex flex-col">
      <h5 className="font-semibold text-base mb-2 line-clamp-2">{news.title}</h5>
    </div>
  </div>
);

export default NewsCard;