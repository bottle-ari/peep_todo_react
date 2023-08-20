/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "ptd-black": "#1D1D1D" /* 삐약ToDo 검정 */,
        "ptd-primary": "#FFDD6F" /* 삐약ToDo 메인컬러 : 노란색 */,
        "ptd-secondary-dark": "#FFB800" /* 삐약ToDo 서브컬러 : 진한 노란색 */,
        "ptd-secondary-light": "#FEEC90" /* 삐약ToDo 서브컬러 : 연한 노란색 */,
        "ptd-white": "#F9F9F9" /* 삐약ToDo 하양 */,
        "ptd-light-grey": "#EFECE5" /* 삐약ToDo 연한 회색 */,
        "ptd-dark-grey": "#575757" /* 삐약ToDO 진한 회색 */,
        "ptd-divider": "#E2E2E2" /* 구분선 색상 */,
        "ptd-red": "#FF5151" /* 삐약ToDo 빨강 */,
        "ptd-blue": "#4685FF" /* 삐약ToDo 파랑 */,
      },
    },
  },
  plugins: [],
};
