import React from 'react';

const NewsCard = ({ news, onReadMore }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{news.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.excerpt}</p>
      <button
        onClick={onReadMore}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Baca Selengkapnya →
      </button>
    </div>
  </div>
);

export default NewsCard;
