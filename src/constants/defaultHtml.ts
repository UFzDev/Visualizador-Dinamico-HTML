export const DEFAULT_HTML = `
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>LuxeDining - Menu Exploration</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ec5b13",
                        "background-light": "#f8f6f6",
                        "background-dark": "#221610",
                    },
                    fontFamily: {
                        "display": ["Public Sans", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Public Sans', sans-serif;
        }
        .ios-shadow {
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 15px -5px rgba(0, 0, 0, 0.05);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased">
<!-- Header Section -->
<header class="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
<div class="flex items-center justify-between px-6 py-4">
<h1 class="text-xl font-bold tracking-tight uppercase text-primary mx-auto">Menu del restaurante</h1>
</div>
</header>
<main class="px-6 py-8 pb-32">
<!-- Hero Title -->
<div class="mb-10 text-center">
<p class="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-2">VERANO 2026</p>
<h2 class="text-4xl font-light tracking-tight text-slate-900 dark:text-slate-100">La Colección Distintiva</h2>
<div class="w-12 h-0.5 bg-primary mx-auto mt-6"></div>
</div>
<!-- Menu Grid -->
<div class="grid grid-cols-2 gap-x-4 gap-y-10">
<!-- Item 1 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Gourmet steak dish" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Exquisite medium-rare wagyu steak with microgreens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Y3a0uW3_5e5r39bTZDXxfp8lddfYGSs-btPbsDrB5B-YwqVzoFemMzECGq3_6dpsQqEHw-O0uWA9RxuWNUDTRBbc1po9qxnSv32MWF9axEK6LlyVBMCGqNZSp1jdC1RPgZgxdsJ2j4k4IS2hoyKfv-TkC7V_Z01ssfB6Qp1A7RsPTl1NqNFQagBrAWz_HnIlal-YQoqOCjLx0OxEdmKHskfR2GCm5ojzWDROd0mEEB0NFPSK3a4K-ANXUYMse0yLMcvuyB8GUB2a"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">RIBEYE WAGYU</h3>
<p class="text-xs text-primary font-semibold">$85.00</p>
</div>
</div>
<!-- Item 2 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Truffle pasta" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Handcrafted truffle pasta with shaved parmesan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChszaYnAOjF6DT6PuxPNXgGUy_eXd-LIIW0OXo49ESEQOoJ2slicrwztA5VMNCXx6stnlzdqHP2DvcvWh6mvSpH8cnnU_ldAOima9YjlR-4K7TGsmwK3ZsUT0_m4Kyth2shqhXbyByAHryZidWYaOQVeSws_bOUuNMgt69KOPuSwTDuXiYLZuGx9sD9hg-hGQ69oHi71q4yo-zB4hSVEy8b4IIocTcG8K_afnU_cbM2oTql50vZIx2abxOEeG83xxdMo0-NV8ATwAf"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">TAGLIATELLE DE TRUFA NEGRA</h3>
<p class="text-xs text-primary font-semibold">$42.00</p>
</div>
</div>
<!-- Item 3 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Fine dining dessert" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Deconstructed chocolate dome dessert with gold leaf" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfE2dy18QmTvcgzRBmRRv-gDE16pKpsxgG66N5kIc4LfFLrGRaKQ8EuLs29THpM_KyOod8dRF5C05fey_apFmYnjySc7Clt84-NTP0hdkDqD9Y8thhk6o1bsQ1Jfwytj1TK6Ap3tKtsm6ErYoGw8BuSqBbwcDiwkXj4Pt2Njb1R3vN8T0PUZlPCHGxVvse_PeNz8oyjbvlYtCyygSXqg1Wx1KRfMDpz8sCjI5qMATO08RLs-IddFz4eB5JnHkUSuw3NasJwvsCRwWa"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">CHOCOLATE GRAND CRU</h3>
<p class="text-xs text-primary font-semibold">$24.00</p>
</div>
</div>
<!-- Item 4 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Seafood dish" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Pan-seared Atlantic salmon with asparagus tips" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfumeZc6Z-1PqweYS4N1FzGLYUaORAKv5oVqST7kQxH8vf3F77Nzvuofvz2goCUz34C_z7bo_w4o7jB8IdUnzhLikL4DN9C5RxsX3_K8iKOmXO9FY1TW-lSGtrdUX7ZV9p_sLlFduDRr3x4Dv6HgxphxgWftNnRpjp34VuDeS95KvMeeDn5meKz0J6w4QGrubhFlBFQO57vPmvigyFzs2z3_8blx0Q_WNt_RGduLr_cUR0Mvay-_PElZtAk6O0JaRsoMmFy0qbwKa_"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">SALMÓN DE LA CASA</h3>
<p class="text-xs text-primary font-semibold">$38.00</p>
</div>
</div>
<!-- Item 5 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Lobster dish" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Butter poached lobster tail with lemon zest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4iuYSYy2x_fxzNJ6u9o_Rs7Ll2iwzVTIJqjkfp3ebIvZ9vYPUAqhpj_oYmkG8AOvmLPirorR6-voA7slLSUvY-laf-lhxmDC9RQYyr1fIC69QYRL34pBOO7Xoq9Iah60XpshOv-oaJoLSR2EcimdchtxHODZsbG2zyrDpkF_v47fcKOaEwIwneCvwpWjU_zjSG1BzLf0PD-xV0ICJ_CfeK3NvKK5FtHHIPGf-LPK_ERIsGVnEzvuoJJhf2aScSJmSi7PGc7S08kSF"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">LANGOSTA DEL ATLÁNTICO</h3>
<p class="text-xs text-primary font-semibold">$64.00</p>
</div>
</div>
<!-- Item 6 -->
<div class="flex flex-col group">
<div class="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 mb-4">
<img alt="Healthy organic salad" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" data-alt="Artisanal garden salad with heirloom tomatoes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3UHEGjmq-H3U6NlMjczH_Ws3B1tnU4L9Fu8Ers4uAlSrz-2PToZYDIlhUimH-o-bZtB4MNg8yDki_VJiUgYr45-ZVPBortxk96UP6I_NeP2q22gtWmTI2i0LCD5u1Ja-td55qIdnGwGmepnL9UDr-CctXVyYBn4tY_gP1BU0po5d6idyopZnwe1m6XDrpu5Y8rHwrD9exZhXc4So_85HRkDFG2kynOFZAP3QoNdNXU4lX93iyx4dgu15E-fmnzJ6QXrOl5fNJCNyx"/>
</div>
<div class="flex flex-col gap-1">
<h3 class="text-sm font-medium tracking-tight text-slate-900 dark:text-slate-100 uppercase">ENSALADA DE LA HUERTA</h3>
<p class="text-xs text-primary font-semibold">$22.00</p>
</div>
</div>
</div>
</main>
<!-- Floating Action Button -->
<div class="fixed bottom-28 left-0 right-0 flex justify-center z-50 pointer-events-none">
<button class="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-primary/20 text-slate-900 dark:text-slate-100 font-medium text-sm ios-shadow group">
<span class="material-symbols-outlined text-primary text-xl">restaurant_menu</span>
<span class="tracking-wide uppercase text-xs font-bold">CATEGORÍAS</span>
</button>
</div>
<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark border-t border-primary/10">
<div class="flex items-center justify-around h-20 px-4">
<a class="flex flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined fill-current">home</span>
<span class="text-[10px] font-bold uppercase tracking-wider">INICIO</span>
</a>
<a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="text-[10px] font-bold uppercase tracking-wider">MENÚ</span>
</a>
<a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
<span class="material-symbols-outlined">bookmark</span>
<span class="text-[10px] font-bold uppercase tracking-wider">GUARDADOS</span>
</a>
<a class="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500" href="#">
<span class="material-symbols-outlined">person</span>
<span class="text-[10px] font-bold uppercase tracking-wider">PERFIL</span>
</a>
</div>
</nav>
</body></html>
`;
