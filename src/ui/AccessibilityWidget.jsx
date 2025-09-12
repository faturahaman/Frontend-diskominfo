import { useEffect, useState } from "react";

const AccessibilityWidget = () => {
  const [siennaLoading, setSiennaLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        // tombol Sienna ditemukan → sembunyikan tombol default
        btn.style.display = "none";

        const setupFloatingIconListener = () => {
          const floatingAccessibilityBtn = document.querySelector("#openAccessibilityMenuButton");
          if (floatingAccessibilityBtn && !floatingAccessibilityBtn.hasAttribute('data-sienna-connected')) {
            floatingAccessibilityBtn.setAttribute('data-sienna-connected', 'true');
            
            floatingAccessibilityBtn.addEventListener('click', (e) => {
              e.preventDefault();
              btn.click();
            });
          }
        };

        setupFloatingIconListener();
        setTimeout(setupFloatingIconListener, 500);

        // matikan loading karena Sienna siap
        setSiennaLoading(false);

        // Stop observer setelah tombol Sienna ditemukan
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {siennaLoading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 mb-2 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader animate-spin"></div>
            <span>Memuat aksesibilitas...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
