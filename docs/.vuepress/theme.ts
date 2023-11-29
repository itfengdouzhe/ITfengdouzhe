import {getDirname, path} from "@vuepress/utils";
// @ts-ignore
import {hopeTheme} from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar/index.js";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

export default hopeTheme({
    hostname: "https://www.javatiaocao.com/",
    //首页图标
    logo: "https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/IT%E6%9E%AB%E6%96%97%E8%80%85_%E7%94%BB%E6%9D%BF%201.png",
    favicon: "/favicon.ico",
    iconAssets: "//at.alicdn.com/t/c/font_4347767_m79fyktm7la.css",
    author: {
        name: "IT枫斗者",
        url: "https://www.zhihu.com/people/fu-chan-ke-chen-zhu-ren",
    },

    repo: "https://github.com/itfengdouzhe/myblogcode/tree/main",
    docsDir: "docs",

    pure: true,
    breadcrumb: false,
    navbar,
    sidebar,
    footer:
        '<a href="https://beian.miit.gov.cn/" target="_blank">ICP-2021008530号</a>',
    displayFooter: true,

    pageInfo: [
        "Author",
        "Category",
        "Tag",
        // "Date",
        "Original",
        "Word",
        "ReadingTime",
    ],

    plugins: {
        blog: true,

        copyright: {
            author: "Itfengdouzhe(www.qiuzhiwang.vip)",
            license: "MIT",
            triggerLength: 100,
            maxLength: 700,
            canonical: "https://www.qiuzhiwang.vip/",
            global: true,
        },

        feed: {
            atom: true,
            json: true,
            rss: true,
        },

        mdEnhance: {
            align: true,
            codetabs: true,
            container: true,
            figure: true,
            gfm: true,
            include: {
                resolvePath: (file, cwd) => {
                    if (file.startsWith("@"))
                        return path.resolve(
                            __dirname,
                            "../snippets",
                            file.replace("@", "./"),
                        );

                    return path.resolve(cwd, file);
                },
            },
            tasklist: true,
        },
    },
});
