# Commandes

npm create vite@latest viverrin --template react
cd viverrin
npm install tailwindcss @tailwindcss/postcss postcss
npx tailwindcss init -p
npm install --save-dev prettier

npm run dev

# fichiers

## tailwind.config.js

/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

# .prettierrc

{
"printWidth": 80,
"tabWidth": 2,
"useTabs": false,
"semi": true,
"singleQuote": false,
"trailingComma": "es5",
"bracketSpacing": true,
"jsxSingleQuote": false,
"arrowParens": "always"
}

## src/index.css

@import "tailwindcss";
@tailwind base;
@tailwind components;
@tailwind utilities;

## postcss.config.js

export default {
plugins: {
"@tailwindcss/postcss": {},
}
}

# sources

https://toptal.com/developers/webdevchecklist
