// @ts-ignore
import {sidebar} from "vuepress-theme-hope";

import {algorithmLearning} from "./algorithm-learning.js";
import {actualCombatSummary} from "./actual-combat-sunnary.js";
import {goodNewOnEmployment} from "./good-new-on-employment.js";
import {javaKnowledgeKit} from "./java-knowledge-kit.js";


export default sidebar({
    // 面试总结
    "/actual-combat-summary/": actualCombatSummary,
    "/good-new-on-employment/": goodNewOnEmployment,
    "/algorithm-learning/": algorithmLearning,
    "/java-knowledge-kit/": javaKnowledgeKit,

    // 必须放在最后面
    // "/": [
    //     {
    //         text: "Java基础",
    //         icon: "java",
    //         link: "java/basis/java-basic",
    //     },
    //     {
    //         text: "异常",
    //         icon: "zhifuyichang",
    //         prefix: "java/basis/",
    //         link: "java/basis/java-basic -exption",
    //     },
    //     {
    //         text: "集合框架",
    //         icon: "wendang",
    //         link: "java/basis/java-basic -list",
    //     },
    //     {
    //         text: "多线程与并发编程",
    //         icon: "smart-lamp-tled",
    //         link: "java/basis/java-Thread",
    //     },
    //     {
    //         text: "JVM",
    //         icon: "jvm",
    //         link: "java/basis/java-jvm",
    //     },
    //     {
    //         text: "MySQL",
    //         icon: "mysql",
    //         link: "java/basis/java-basic -mysql",
    //
    //     },
    //     {
    //         text: "Redis",
    //         icon: "redis",
    //         link: "java/basis/java-basic -redis",
    //
    //     },
    //     {
    //         text: "RocketMQ",
    //         icon: "apacherocketmq",
    //         link: "java/basis/java-basic -RocketMQ",
    //
    //     },
    //     {
    //         text: "常用框架",
    //         icon: "bxl-spring-boot",
    //         link: "java/basis/java-basic -spring",
    //     },
    // ],
});
