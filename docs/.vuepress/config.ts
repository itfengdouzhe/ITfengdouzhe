import {defineUserConfig} from "vuepress";
import {searchPlugin} from "@vuepress/plugin-search";
import theme from "./theme.js";

export default defineUserConfig({
    dest: "./dist",

    title: "IT枫斗者",
    description:
        "IT枫斗者关注求职、跳槽领域，专注java技术分享，java面试经验、java面试总结及面试资料，零基础就业，让天下没有难面的试  ",
    lang: "zh-CN",
    markdown: {
        anchor:false
    },
    head: [
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "IT枫斗者"}],
        [
            "meta",
            {
                "http-equiv": "Cache-Control",
                content: "no-cache, no-store, must-revalidate",
            },
        ],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        [
            "meta",
            {
                name: "keywords",
                content:
                    "Java基础, 多线程, JVM, 数据库, MySQL, Spring, Redis",
            },
        ],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
        // 添加百度统计
        [
            "script",
            {},
            `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
        ],
    ],

    theme,

    plugins: [
        searchPlugin({
            // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
            // 排除首页
            isSearchable: (page) => page.path !== "/",
            maxSuggestions: 10,
            hotKeys: ["s", "/"],
            // 用于在页面的搜索索引中添加额外字段
            getExtraFields: () => [],
            locales: {
                "/": {
                    placeholder: "搜索",
                },
            },
        }),
    ],

    pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

    shouldPrefetch: false,
});
