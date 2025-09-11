import { useEffect } from "react";

const AccessibilityWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://website-widgets.pages.dev/dist/sienna.min.js";
    script.defer = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutations, obs) => {
      const btn = document.querySelector(".asw-menu-btn");
      if (btn) {
        // Sembunyikan tombol default Sienna karena kita akan menggunakan floating icons
        btn.style.display = "none";

        // Setup event listener untuk floating icon accessibility button
        const setupFloatingIconListener = () => {
          const floatingAccessibilityBtn = document.querySelector("#openAccessibilityMenuButton");
          if (floatingAccessibilityBtn && !floatingAccessibilityBtn.hasAttribute('data-sienna-connected')) {
            floatingAccessibilityBtn.setAttribute('data-sienna-connected', 'true');
            
            floatingAccessibilityBtn.addEventListener('click', (e) => {
              e.preventDefault();
              // Trigger klik pada tombol Sienna yang tersembunyi
              btn.click();
            });
          }
        };

        // Setup listener segera
        setupFloatingIconListener();
        
        // Setup listener lagi setelah delay untuk memastikan floating icons sudah ter-render
        setTimeout(setupFloatingIconListener, 500);

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

  return null;
};

export default AccessibilityWidget;