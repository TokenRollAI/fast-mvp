import type { Config } from "tailwindcss";

const config: Config = {
    // 启用 JIT 引擎（实现 Tree Shaking）和定义扫描路
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // 定义主题
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
