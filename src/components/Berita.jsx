import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Search, Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import NewsCard from './../ui/NewsCard';
import AgendaCard from './../ui/AgendaCard';
import Calendar from './../ui/Calendar';
import { newsData, agendaData, monthNames, dayNames } from './../dummy/data';

const NewsAgendaSection = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredAgendas = useMemo(() => {
    return agendaData.filter(agenda =>
      agenda.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getAgendasForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return agendaData.filter(agenda => agenda.date === dateString);
  };

  // Hanya contoh render homepage
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Berita */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">BERITA TERBARU</h1>
        <p className="text-gray-600">Berita atau artikel terbaru dari Diskominfo Kota Bogor</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {newsData.map(news => (
          <NewsCard key={news.id} news={news} onReadMore={() => setCurrentPage(`news-${news.id}`)} />
        ))}
      </div>

      {/* Agenda */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Calendar
          currentMonth={currentMonth}
          monthNames={monthNames}
          dayNames={dayNames}
          agendaData={agendaData}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          navigateMonth={navigateMonth}
        />

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">{searchTerm ? 'Hasil Pencarian' : 'Semua Agenda'}</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {(searchTerm ? filteredAgendas : agendaData).map((agenda) => (
                <AgendaCard key={agenda.id} agenda={agenda} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAgendaSection;
