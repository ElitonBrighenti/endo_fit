
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'endo-preto': '#0f0f0f',
                'endo-card': '#1a1a1a',
                'endo-laranja': '#FF6B00',
                'endo-laranja-escuro': '#cc5500',
                'endo-texto': '#ffffff',
                'endo-texto-secundario': '#cccccc',
                'endo-borda': '#2a2a2a',
            },
        },
    },
    plugins: [],
}
