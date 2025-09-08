// src/ui/Card.jsx
export default function ServiceCard({ icon: Icon, title, link }) {
  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : undefined}
      rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
      className="bg-[#2f6175] py-20 p-6 rounded-xl shadow-md hover:shadow-xl hover:bg-[#de8b43] 
                 transition-all duration-300 ease-in-out max-w-xs w-full flex flex-col items-center text-center group
                 cursor-pointer transform hover:-translate-y-2"
      style={{
        boxShadow: "0 4px 24px 0 rgba(44, 98, 117, 0.15)",
      }}
    >
      <Icon className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out" />
      <h3 className="text-lg font-semibold text-white drop-shadow-sm transition-colors duration-300 ease-in-out">
        {title}
      </h3>
    </a>
  );
}