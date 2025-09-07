// src/ui/AgendaCard.jsx
import React from "react";
import { Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";

const AgendaCard = ({ agenda }) => (
  <div className="border-l-4 border-[#3C7A94] pl-4 py-2 hover:bg-gray-50 transition-colors">
    <h4 className="font-medium text-sm mb-1">{agenda.title}</h4>
    <div className="text-xs text-gray-600 space-y-1">
      <div className="flex items-center">
        <Clock size={12} className="mr-1" /> {agenda.time}
      </div>
      <div className="flex items-center">
        <CalendarIcon size={12} className="mr-1" /> {agenda.date}
      </div>
      <div className="flex items-center">
        <MapPin size={12} className="mr-1" /> {agenda.location}
      </div>
    </div>
  </div>
);

export default AgendaCard;