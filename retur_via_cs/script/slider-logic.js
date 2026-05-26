// slider-logic.js
document.addEventListener("DOMContentLoaded", () => {
    // Jalankan render slider untuk setiap container yang memiliki atribut data-flow
    document.querySelectorAll("[data-flow]").forEach(container => {
        const flowKey = container.getAttribute("data-flow");
        const data = flowData[flowKey];
        if (!data) return;

        let activeIndex = 0;
        const totalSteps = data.steps.length;

        // Buat struktur layout slider (Kiri: Tombol Navigasi, Kanan: Gambar & Deskripsi)
        container.className = "bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 overflow-hidden";

        container.innerHTML = `
            <div class="w-full md:w-2/5 flex flex-col gap-2.5 justify-center steps-nav-container"></div>
            
            <div class="w-full md:w-3/5 relative overflow-hidden bg-slate-900 rounded-xl aspect-[4/3] md:aspect-[16/9] group shadow-inner">
                <div class="absolute inset-0 flex h-full transition-transform duration-500 ease-out slides-wrapper" style="width: ${totalSteps * 100}%;"></div>
                <div class="absolute bottom-4 right-4 flex gap-1.5 z-10 dots-container"></div>
            </div>
        `;

        const stepsContainer = container.querySelector(".steps-nav-container");
        const slidesWrapper = container.querySelector(".slides-wrapper");
        const dotsContainer = container.querySelector(".dots-container");

        // Inject Elemen Langkah & Slide Gambar
        data.steps.forEach((step, idx) => {
            // Button Langkah
            const btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.className = "text-left p-3 rounded-xl border-2 transition-all duration-300 w-full text-xs md:text-sm";
            btn.innerHTML = `
                <span class="font-bold block mb-0.5 text-[10px] uppercase tracking-wider num-label pointer-events-none">Step ${idx + 1}</span>
                <span class="text-slate-700 title-label pointer-events-none">${step.title.split(": ")[1] || step.title}</span>
            `;
            btn.onclick = () => updateSlider(idx);
            stepsContainer.appendChild(btn);

            // Slide Area   
            const slide = document.createElement("div");
            slide.style.width = `${100 / totalSteps}%`;
            slide.className = "h-full relative shrink-0 flex items-center justify-center";
            slide.innerHTML = `
                <img src="${step.image}" alt="${step.title}" class="w-full h-full object-cover select-none" />
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-4 md:p-6 text-white">
                    <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1.5 tag-label ${data.colorClass === 'orange' ? 'bg-orange-600 text-white' :
                    data.colorClass === 'red' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                }">${step.title}</span>
                    <p class="text-slate-200 text-xs md:text-sm leading-relaxed font-medium mt-1">${step.description}</p>
                </div>
            `;
            slidesWrapper.appendChild(slide);

            // Dots kecil
            const dot = document.createElement("button");
            dot.setAttribute("type", "button");
            dot.className = "h-1.5 w-1.5 rounded-full bg-white/40 transition-all duration-300";
            dot.onclick = () => updateSlider(idx);
            dotsContainer.appendChild(dot);
        });

        // Fungsi Update Transisi Slider
        function updateSlider(index) {
            activeIndex = index;

            // Kalkulasi bergeser
            const translateValue = -(activeIndex * (100 / totalSteps));
            slidesWrapper.style.transform = `translateX(${translateValue}%)`;

            // Update Style Navigasi Aktif
            container.querySelectorAll(".steps-nav-container button").forEach((btn, i) => {
                const numLabel = btn.querySelector(".num-label");
                const titleLabel = btn.querySelector(".title-label");

                if (numLabel && titleLabel) {
                    if (i === activeIndex) {
                        let activeBg = "bg-blue-50 border-blue-500 ring-blue-100/50";
                        let textNum = "text-blue-600";

                        if (data.colorClass === "orange") {
                            activeBg = "bg-orange-50 border-orange-500 ring-orange-100/50";
                            textNum = "text-orange-600";
                        } else if (data.colorClass === "red") {
                            activeBg = "bg-red-50 border-red-500 ring-red-100/50";
                            textNum = "text-red-600";
                        }

                        btn.className = `text-left p-3 rounded-xl border-2 transition-all duration-300 w-full shadow-sm ring-2 ${activeBg} text-xs md:text-sm`;
                        numLabel.className = `font-bold block mb-0.5 text-[10px] uppercase tracking-wider num-label pointer-events-none ${textNum}`;
                        titleLabel.className = "text-slate-800 font-semibold leading-tight title-label pointer-events-none";
                    } else {
                        let hoverColors = "hover:border-blue-300 hover:bg-blue-50/30";
                        if (data.colorClass === "orange") hoverColors = "hover:border-orange-300 hover:bg-orange-50/30";
                        if (data.colorClass === "red") hoverColors = "hover:border-red-300 hover:bg-red-50/30";

                        btn.className = `text-left p-3 rounded-xl border-2 transition-all duration-300 w-full bg-white border-slate-200 ${hoverColors} text-xs md:text-sm`;
                        numLabel.className = "font-bold block mb-0.5 text-[10px] uppercase tracking-wider num-label pointer-events-none text-slate-400";
                        titleLabel.className = "text-slate-600 font-normal leading-tight title-label pointer-events-none";
                    }
                }
            });

            // Update Style Dots Aktif
            container.querySelectorAll(".dots-container button").forEach((dot, i) => {
                dot.className = i === activeIndex ? "h-1.5 w-4 rounded-full bg-white transition-all duration-300" : "h-1.5 w-1.5 rounded-full bg-white/40";
            });
        }

        // Jalankan inisiasi pertama
        updateSlider(0);

        // PERBAIKAN DI SINI: Sekarang fungsi geser/swipe memanggil updateSlider() agar tombol ikut aktif
        let startX = 0;
        slidesWrapper.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
        slidesWrapper.addEventListener("touchend", (e) => {
            const diffX = startX - e.changedTouches[0].clientX;
            const threshold = 50; // Jarak minimal usap layar (pixel)

            if (diffX > threshold && activeIndex < totalSteps - 1) {
                // Geser ke kanan (Langkah Selanjutnya)
                updateSlider(activeIndex + 1);
            } else if (diffX < -threshold && activeIndex > 0) {
                // Geser ke kiri (Langkah Sebelumnya)
                updateSlider(activeIndex - 1);
            }
        }, { passive: true });
    });
});