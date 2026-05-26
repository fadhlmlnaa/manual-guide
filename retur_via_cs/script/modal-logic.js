// modal-logic.js
let currentActiveStep = 0;
let activeFlowKey = '';
let totalFlowSteps = 0;

function openFlowModal(flowKey) {
    const data = flowData[flowKey];
    if (!data) return;

    activeFlowKey = flowKey;
    currentActiveStep = 0;
    totalFlowSteps = data.steps.length;

    // Set Header Texts
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-subtitle').innerText = data.subtitle;

    // Set Color Theme Class
    const subtitleEl = document.getElementById('modal-subtitle');
    subtitleEl.className = "text-xs font-bold uppercase tracking-wider";
    if (data.colorClass === 'blue') {
        subtitleEl.classList.add('text-blue-600');
    } else if (data.colorClass === 'orange') {
        subtitleEl.classList.add('text-orange-600');
    } else if (data.colorClass === 'red') {
        subtitleEl.classList.add('text-red-600');
    }

    // Inject step buttons
    const stepsContainer = document.getElementById('modal-steps-container');
    stepsContainer.innerHTML = '';

    // Inject slides
    const slidesWrapper = document.getElementById('modal-slides-wrapper');
    slidesWrapper.innerHTML = '';

    // Inject dots
    const dotsContainer = document.getElementById('modal-dots-container');
    dotsContainer.innerHTML = '';

    data.steps.forEach((step, idx) => {
        // 1. Step button
        const btn = document.createElement('button');
        btn.id = `modal-step-btn-${idx}`;
        btn.onclick = () => goToModalStep(idx);
        btn.className = "step-btn text-left p-3.5 rounded-xl border-2 transition-all duration-300 w-full";
        btn.innerHTML = `
            <span class="font-bold block mb-1 text-xs uppercase tracking-wider">Step ${idx + 1}</span>
            <span class="text-slate-600 font-normal leading-tight text-sm">${step.title.split(': ')[1] || step.title}</span>
        `;
        stepsContainer.appendChild(btn);

        // 2. Slide
        const slide = document.createElement('div');
        slide.className = "w-full h-full shrink-0 relative flex items-center justify-center bg-slate-900 aspect-[4/3] md:aspect-[16/9]";
        slide.innerHTML = `
            <img src="${step.image}" alt="${step.title}" class="w-full h-full object-cover object-center" />
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-6 pt-16 text-white">
                <div class="max-w-2xl">
                    <span class="inline-block px-2 py-0.5 rounded-md mb-2 text-xs font-bold uppercase tracking-wider ${data.colorClass === 'blue' ? 'bg-blue-600 text-white' :
                data.colorClass === 'orange' ? 'bg-orange-600 text-white' :
                    'bg-red-600 text-white'
            }">${step.title}</span>
                    <p class="text-slate-200 text-sm md:text-base leading-relaxed">${step.description}</p>
                </div>
            </div>
        `;
        slidesWrapper.appendChild(slide);

        // 3. Dot
        const dot = document.createElement('button');
        dot.id = `modal-step-dot-${idx}`;
        dot.onclick = () => goToModalStep(idx);
        dot.setAttribute('aria-label', `Go to step ${idx + 1}`);
        dot.className = "h-2 w-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300";
        dotsContainer.appendChild(dot);
    });

    // Show Modal with smooth animation
    const modal = document.getElementById('flow-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const container = document.getElementById('modal-container');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    void modal.offsetWidth; // Trigger reflow

    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    container.classList.remove('scale-95', 'opacity-0');
    container.classList.add('scale-100', 'opacity-100');

    goToModalStep(0);
    document.body.style.overflow = 'hidden'; // Prevent Body Scroll
}

function closeFlowModal() {
    const modal = document.getElementById('flow-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const container = document.getElementById('modal-container');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    container.classList.remove('scale-100', 'opacity-100');
    container.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

function updateModalSliderUI() {
    const wrapper = document.getElementById('modal-slides-wrapper');
    if (wrapper) {
        wrapper.style.transform = `translateX(-${currentActiveStep * 100}%)`;
    }

    const data = flowData[activeFlowKey];
    if (!data) return;

    for (let i = 0; i < totalFlowSteps; i++) {
        const btn = document.getElementById(`modal-step-btn-${i}`);
        const dot = document.getElementById(`modal-step-dot-${i}`);

        if (btn) {
            const stepNum = btn.querySelector('.font-bold');
            const stepText = btn.querySelector('span:nth-child(2)');

            if (i === currentActiveStep) {
                let btnColorClass = "bg-blue-50 border-blue-500 ring-blue-100/50";
                let textNumClass = "text-blue-600";

                if (data.colorClass === 'orange') {
                    btnColorClass = "bg-orange-50 border-orange-500 ring-orange-100/50";
                    textNumClass = "text-orange-600";
                } else if (data.colorClass === 'red') {
                    btnColorClass = "bg-red-50 border-red-500 ring-red-100/50";
                    textNumClass = "text-red-600";
                }

                btn.className = `step-btn text-left p-3.5 rounded-xl border-2 transition-all duration-300 w-full shadow-sm ring-2 ${btnColorClass}`;
                if (stepNum) stepNum.className = `font-bold ${textNumClass} block mb-1 text-xs uppercase tracking-wider`;
                if (stepText) stepText.className = "text-slate-800 font-semibold leading-tight text-sm";
            } else {
                btn.className = "step-btn text-left p-3.5 rounded-xl border-2 transition-all duration-300 w-full bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50";
                if (stepNum) stepNum.className = "font-bold text-slate-400 block mb-1 text-xs uppercase tracking-wider";
                if (stepText) stepText.className = "text-slate-600 font-normal leading-tight text-sm";
            }
        }

        if (dot) {
            if (i === currentActiveStep) {
                dot.className = "h-2 w-6 rounded-full bg-white transition-all duration-300";
            } else {
                dot.className = "h-2 w-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300";
            }
        }
    }
}

function goToModalStep(stepIndex) {
    currentActiveStep = stepIndex;
    updateModalSliderUI();
}

function nextModalStep() {
    currentActiveStep = (currentActiveStep + 1) % totalFlowSteps;
    updateModalSliderUI();
}

function prevModalStep() {
    currentActiveStep = (currentActiveStep - 1 + totalFlowSteps) % totalFlowSteps;
    updateModalSliderUI();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('flow-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeFlowModal();
        } else if (e.key === 'ArrowRight') {
            nextModalStep();
        } else if (e.key === 'ArrowLeft') {
            prevModalStep();
        }
    }
});

// Touch support for swiping
document.addEventListener('DOMContentLoaded', () => {
    const sliderArea = document.getElementById('modal-slides-wrapper');
    if (sliderArea) {
        let startX = 0;
        let endX = 0;

        sliderArea.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        sliderArea.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (startX - endX > threshold) {
                nextModalStep();
            } else if (endX - startX > threshold) {
                prevModalStep();
            }
        }
    }
});