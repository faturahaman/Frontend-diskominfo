import { newsData } from "../dummy/data";
import NewsCard from "../ui/NewsCard2";
import SecondaryPageTemplate from "../ui/PageLayout";

export default function NewsList() {
  return (
    <SecondaryPageTemplate
      title="Berita Terbaru"
      breadcrumb={[
        { label: "Home", link: "/" },
        { label: "Berita" },
      ]}
    >
      <div className="grid md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </SecondaryPageTemplate>
  );
}
