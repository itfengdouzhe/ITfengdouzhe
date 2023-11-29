---
title: 框架常见面试题
category: Java
tag:
  - spring
head:
  - - meta
    - name: keywords
      content: JVM,JDK,JRE,字节码详解,Java 基本数据类型,装箱和拆箱
  - - meta
    - name: description
      content: 全网质量最高的Java基础常见知识点和面试题总结，希望对你有帮助！
---

# 1、Spring面试题

### spring是什么

- 轻量级的开源的J2EE框架。它是一个容器框架，用来装javabean（java对象），中间层框架（万能胶）可以起一个连接作用，比如说把Struts和hibernate粘合在一起运用，可以让我们的企业开发更快、更简洁 
- Spring是一个轻量级的控制反转（IoC)和面向切面（AOP）的容器框架 
  - 从大小与开销两方面而言Spring都是轻量级的。 
  - 通过控制反转(IoC)的技术达到松耦合的目的 
  - 提供了面向切面编程的丰富支持，允许通过分离应用的业务逻辑与系统级服务进行内聚性的 

### **谈谈你对AOP的理解**

- 将程序中的交叉业务逻辑（比如安全，日志，事务等），封装成一个切面，然后注入到目标对象（具体业务逻辑）中去。AOP可以对某个对象或某些对象的功能进行增强，比如对象中的方法进行增强，可以在执行某个方法之前额外的做一些事情，在某个方法执行之后额外的做一些事情 
- ![1657770188634](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/spring/1657770188634.png)

### **谈谈你对IOC的理解**

- **IOC容器：**
- 实际上就是map，里面存的是各种对象（在XML里配置的bean节点，@respository，@service,@controller,@component）,在项目启动的时候会读取配置文件里面的bean节点，根据全限定类名使用反射创建对象放到map里，扫描到打上上述注解的类还是通过反射的方式创建对象放到map里面。
- **控制反转：**
- 没有引入IOC容器之前，对象A依赖于对象B，那么对象A在初始化或者运行到某一点的时候，自己必须去主动创建对象B或者使用已经创建的对象B，无论是创建还是使用对象B，控制权都在A类。
- 引入IOC容器后，对象A和对象B之间失去了直接联系，当对象A运行到需要对象B的时候，IOC容器会主动创建对象B注入到对象A所需要的地方。通过前后对比，不难看出：对象A获得依赖对象B的过程，由主动行为变为了被动行为，控制权颠倒过来了，这就是控制反转。
- **依赖注入：**
- “获得依赖对象的过程被反转了”。控制被反转之后，获得依赖对象的过程由自身管理变成了由IOC容器自动注入。依赖注入是实现IOC的方法，就是由IOC在运行期间，动态的将某种依赖关系注入到对象之中。

### **依赖注入的方式有几种**

- 构造器注入
- setter方法注入
- 工厂注入
- 静态工厂注入

### **SpringMVC常用的注解有哪些？**

- @RequestMapping：用于处理请求 url 映射的注解，可用于类或方法上。用于类上，则表示类中的所有响应请求的方法都是以该地址作为父路径。 
- @RequestBody：注解实现接收http请求的json数据，将json转换为java对象。 
- @ResponseBody：注解实现将conreoller方法返回对象转化为json对象响应给客户。

### **描述一下Spring Bean的生命周期？**

- 解析类得到BeanDefinition 
- 如果有多个构造方法，则要推断构造方法 
- 确定好构造方法后，进行实例化得到一个对象 
- 对对象中的加了@Autowired注解的属性进行属性填充 
- 回调Aware方法，比如BeanNameAware，BeanFactoryAware 
- 调用BeanPostProcessor的初始化前的方法 
- 调用初始化方法 
- 调用BeanPostProcessor的初始化后的方法，在这里会进行AOP 
- 如果当前创建的bean是单例的则会把bean放入单例池 
- 使用bean
- Spring容器关闭时调用DisposableBean中destory()方法

### **解释下Spring支持的几种bean的作用域。** 

- singleton：默认，每个容器中只有一个bean的实例，单例的模式由BeanFactory自身来维护。该对象的生命周期是与Spring IOC容器一致的（但在第一次被注入时才会创建）。 
- prototype：为每一个bean请求提供一个实例。在每次注入时都会创建一个新的对象 
- request：bean被定义为在每个HTTP请求中创建一个单例对象，也就是说在单个请求中都会复用 这一个单例对象。 
- session：与request范围类似，确保每个session中有一个bean的实例，在session过期后，bean 会随之失效。 
- application：bean被定义为在ServletContext的生命周期中复用一个单例对象。 
- websocket：bean被定义为在websocket的生命周期中复用一个单例对象。
- global-session：全局作用域，global-session和Portlet应用相关。当你的应用部署在Portlet容器中工作时，它包含很多portlet。如果你想要声明让所有的portlet共用全局的存储变量的话，那么这全局变量需要存储在global-session中。全局作用域与Servlet中的session作用域效果相同。 

### **Spring框架中的单例Bean是线程安全的么**

- Spring中的Bean默认是单例模式的，框架并没有对bean进行多线程的封装处理。 
- 如果Bean是有状态的 那就需要开发人员自己来进行线程安全的保证，最简单的办法就是改变bean的作用域 把 "singleton"改为’‘protopyte’ 这样每次请求Bean就相当于是 new Bean() 这样就可以保证线程的安全了。 

### **Spring框架中都用到了哪些设计模式？**

- 简单工厂：由一个工厂类根据传入的参数，动态决定应该创建哪一个产品类。 
- 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点
- 适配器模式：Spring定义了一个适配接口，使得每一种Controller有一种对应的适配器实现类，让适配器代替 controller执行相应的方法。这样在扩展Controller时，只需要增加一个适配器类就完成了SpringMVC的扩展
- 装饰器模式：动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator模式相比生成子类更为灵活。 
- 动态代理： 切面在应用运行的时刻被织入。一般情况下，在织入切面时，AOP容器会为目标对象创建动态的创建一个代理对象。SpringAOP就是以这种方式织入切面的。 

### **spring事务传播机制**

- 多个事务方法相互调用时,事务如何在这些方法间传播 
- REQUIRED(Spring默认的事务传播类型)：如果当前没有事务，则自己新建一个事务，如果当前存在事务，则加入这个事务 
- SUPPORTS：当前存在事务，则加入当前事务，如果当前没有事务，就以非事务方法执行 
- MANDATORY：当前存在事务，则加入当前事务，如果当前事务不存在，则抛出异常。 
- REQUIRES_NEW：创建一个新事务，如果存在当前事务，则挂起该事务。 
- NOT_SUPPORTED：以非事务方式执行,如果当前存在事务，则挂起当前事务 
- NEVER：不使用事务，如果当前事务存在，则抛出异常 
- NESTED：如果当前事务存在，则在嵌套事务中执行，否则REQUIRED的操作一样（开启一个事务） 

**Spring** **事务实现方式** 

- 编程式事务管理：这意味着你可以通过编程的方式管理事务，这种方式带来了很大的灵活性，但很难维护。 
- 声明式事务管理：这种方式意味着你可以将事务管理和业务代码分离。你只需要通过注解或者XML配置管理事务。

### **SpringMVC工作流程**

- 用户发送请求至前端控制器 DispatcherServlet。 
- DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器。 
- 处理器映射器找到具体的处理器(可以根据 xml 配置、注解进行查找)，生成处理器及处理器拦截器(如果有则生成)一并返回给 DispatcherServlet。 
- DispatcherServlet 调用 HandlerAdapter 处理器适配器。 
- HandlerAdapter 经过适配调用具体的处理器(Controller，也叫后端控制器) 
- Controller 执行完成返回 ModelAndView。
- HandlerAdapter 将 controller 执行结果 ModelAndView 返回给 DispatcherServlet。
- DispatcherServlet 将 ModelAndView 传给 ViewReslover 视图解析器。 
- ViewReslover 解析后返回具体 View。 
- DispatcherServlet 根据 View 进行渲染视图（即将模型数据填充至视图中）。 
- DispatcherServlet 响应用户。
- ![1657769398167](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/spring/1657769398167.png)

# 2、springboot面试题

### Spring Boot 优点

- 独立运行
- 简化配置
- 无代码生成和xml配置
- 应用监控

### **Spring Boot** **的核心注解是哪个？它主要由哪几个注解组成的？** 

- @SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：
- @SpringBootConfifiguration：组合了 @Confifiguration 注解，实现配置文件的功能。 
- @EnableAutoConfifiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfifiguration.class })。 
- @ComponentScan：Spring组件扫描。 

### **Spring Boot、Spring MVC和Spring有什么区别**

- 供AOP机制弥补OOP的代码重复问题、更方便将不同类不同方法中的共同处理抽取成切面、自动注入给方法执行，比如日志、异常等 
- springmvc是spring对web框架的一个解决方案，提供了一个总的前端控制器Servlet，用来接收请求，然后定义了一套路由策略（url到handle的映射）及适配执行handle，将handle结果使用视图解析技术 生成视图展现给前端 
- springboot是spring提供的一个快速开发工具包，让程序员能更方便、更快速的开发spring+springmvc应用，简化了配置（约定了默认配置），整合了一系列的解决方案（starter机制）、redis、mongodb、es，可以开箱即用

### **什么是嵌入式服务器？为什么要使用嵌入式服务器?**

- 节省了下载安装tomcat，应用也不需要再打war包，然后放到webapp目录下再运行 
- 只需要一个安装了 Java 的虚拟机，就可以直接在上面部署应用程序了 
- springboot已经内置了tomcat.jar，运行main方法时会去启动tomcat，并利用tomcat的spi机制加载springmvc

# 3、**SpringCloud面试题**

### 什么是Spring Cloud？

- Spring Cloud是一系列框架的有序集合。它利用Spring Boot的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用Spring Boot的开发风格做到一键启动和部署。Spring Cloud并没有重复制造轮子，它只是将目前各家公司开发的比较成熟、经得起实际考验的服务框架组合起来，通过Spring Boot风格进行再封装屏蔽掉了复杂的配置和实现原理，最终给开发者留出了一套简单易懂、易部署和易维护的分布式系统开发工具包。

### **分布式id生成方案**

- uuid
- 数据库自增序列
- 基于redis，zk等中间件生成
- 雪花算法

### TCC分布式事务

- TCC（补偿事务）：Try、Confirm、Cancel 
- 针对每个操作，都要注册一个与其对应的确认和补偿（撤销）操作 Try操作做业务检查及资源预留，Confirm做业务确认操作，Cancel实现一个与Try相反的操作既回滚操作。TM首先发起所有的分支事务的try操作，任何一个分支事务的try操作执行失败，TM将会发起所有分支事务的Cancel操作，若try操作全部成功，TM将会发起所有分支事务的Confirm操作，其中Confirm/Cancel操作若执行失败，TM会进行重试。 
- TCC模型对业务的侵入性较强，改造的难度较大，每个操作都需要有 try 、 confirm 、 cancel 三个接 口实现.
- confirm 和 cancel 接口还必须实现幂等性。

### **如何实现接口的幂等性**

- 唯一id。每次操作，都根据操作和内容生成唯一的id，在执行之前先判断id是否存在，如果不存在则执行后续操作，并且保存到数据库或者redis等。 
- 服务端提供发送token的接口，业务调用接口前先获取token,然后调用业务接口请求时，把token携带过去,务器判断token是否存在redis中，存在表示第一次请求，可以继续执行业务，执行业务完成后，最后需要把redis中的token删除 
- 建去重表。将业务中有唯一标识的字段保存到去重表，如果表中存在，则表示已经处理过了 
- 版本控制。增加版本号，当版本号符合时，才能更新数据 
- 状态控制。例如订单有状态已支付 未支付 支付中 支付失败，当处于未支付的时候才允许修改为支付中等

### **springcloud核心组件及其作用**

- ![1657770731644](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/spring/1657770731644.png)

- **Eureka：服务注册与发现**
- 注册：每个服务都向Eureka登记自己提供服务的元数据，包括服务的ip地址、端口号、版本号、通信协议等。eureka将各个服务维护在了一个服务清单中（双层Map，第一层key是服务名，第二层key是实例名，value是服务地址加端口）。同时对服务维持心跳，剔除不可用的服务，eureka集群各节点相互 注册每个实例中都有一样的服务清单。 
- 发现：eureka注册的服务之间调用不需要指定服务地址，而是通过服务名向注册中心咨询，并获取所有服务实例清单(缓存到本地)，然后实现服务的请求访问。
- **Ribbon：**
- 服务间发起请求的时候，基于Ribbon做负载均衡，从⼀个服务的多台机器中选择⼀台 （被调 用方的服务地址有多个），Ribbon也是通过发起http请求，来进行的调用，只不过是通过调用服务名的地址来实现的。虽然说Ribbon不用去具体请求服务实例的ip地址或域名了，但是每调用一个接口都还要手动去发起Http请求 
- **Feign：**
- 基于Feign的动态代理机制，根据注解和选择的机器，拼接请求URL地址，发起请求 ，简化服务间的调用，在Ribbon的基础上进行了进一步的封装。单独抽出了一个组件，就是Spring Cloud Feign。在引入Spring Cloud Feign后，我们只需要创建一个接口并用注解的方式来配置它，即可完成对服务提供方的接口绑定。 
- **Hystrix：**
- 发起请求是通过Hystrix的线程池来⾛的，不同的服务⾛不同的线程池，实现了不同服务调⽤的隔离，通过统计接口超时次数返回默认值，实现服务熔断和降级 
- **Zuul：**
- 如果前端、移动端要调⽤后端系统，统⼀从Zuul⽹关进⼊，由Zuul⽹关转发请求给对应的服务，通过与Eureka进行整合，将自身注册为Eureka下的应用，从Eureka下获取所有服务的实例，来进行服务的路由。Zuul还提供了一套过滤器机制，开发者可以自己指定哪些规则的请求需要执行校验逻辑，只通过校验逻辑的请求才会被路由到具体服务实例上，否则返回错误提示。

### 谈谈服务降级、熔断、服务隔离

-  ![img](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/spring/20210420205321194.png)
### 服务雪崩效应产生的原因
-  ![img](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/spring/20210420205313563.png)
### **SpringBoot和SpringCloud的区别？**

- SpringBoot专注于快速方便的开发单个个体微服务。 
- SpringCloud是关注全局的微服务协调整理治理框架，它将SpringBoot开发的一个个单体微服务整 合并管理起来， 
- 为各个微服务之间提供，配置管理、服务发现、断路器、路由、微代理、事件总线、全局锁、决策 竞选、分布式会话等等集成服务 
- SpringBoot可以离开SpringCloud独立使用开发项目， 但是SpringCloud离不开SpringBoot ，属于依赖的关系. 
- SpringBoot专注于快速、方便的开发单个微服务个体，SpringCloud关注全局的服务治理框架

### **说说** **RPC的实现原理**

- 首先需要有处理网络连接通讯的模块，负责连接建立、管理和消息的传输。其次需要有编 解码的模块，因为网络通讯都是传输的字节码，需要将我们使用的对象序列化和反序列 化。剩下的就是客户 端和服务器端的部分，服务器端暴露要开放的服务接口，客户调用服 务接口的一个代理实现，这个 代理实现负责收集数据、编码并传输给服务器然后等待结果 返回。

- 解决分布式系统中，服务之间的调用问题。

  远程调用时，要能够像本地调用一样方便，让调用者感知不到远程调用的逻辑。
