import SecondaryPageTemplate from "../ui/PageLayout";

const VisiMisi = () => {
  // Breadcrumb configuration
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Visi & Misi", link: "/visi-misi" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Visi & Misi" breadcrumb={breadcrumb}>
        <div className="space-y-12">
          {/* Visi Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visi</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <p className="text-lg text-center font-medium text-blue-900">
                "Terwujudnya pelayanan informasi publik yang transparan dan
                akuntabel menuju Kota Bogor yang modern"
              </p>
            </div>
          </div>

          {/* Misi Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Misi</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <ol className="list-decimal list-inside space-y-4">
                  <li className="text-gray-800">
                    Meningkatkan kualitas infrastruktur teknologi informasi dan
                    komunikasi yang terintegrasi
                  </li>
                  <li className="text-gray-800">
                    Meningkatkan kualitas sumber daya manusia bidang teknologi
                    informasi dan komunikasi
                  </li>
                  <li className="text-gray-800">
                    Meningkatkan pelayanan informasi publik yang akurat dan
                    terpercaya
                  </li>
                  <li className="text-gray-800">
                    Meningkatkan kualitas pelayanan komunikasi dan informatika
                    yang profesional
                  </li>
                  <li className="text-gray-800">
                    Meningkatkan kerjasama dan koordinasi dengan stakeholder
                    dalam pengembangan teknologi informasi dan komunikasi
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Tujuan Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tujuan</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-gray-800">
                  Mewujudkan infrastruktur TIK yang handal dan terintegrasi
                </li>
                <li className="text-gray-800">
                  Mewujudkan SDM yang kompeten di bidang TIK
                </li>
                <li className="text-gray-800">
                  Mewujudkan sistem informasi yang akurat dan terpercaya
                </li>
                <li className="text-gray-800">
                  Mewujudkan pelayanan komunikasi dan informatika yang
                  profesional
                </li>
                <li className="text-gray-800">
                  Mewujudkan kerja sama yang sinergis dengan stakeholder dalam
                  pengembangan TIK
                </li>
              </ol>
            </div>
          </div>
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default VisiMisi;
