---
title: RocketMQ常见面试题
category: Java
tag:
  - Java基础
head:
  - - meta
    - name: keywords
      content: JVM,JDK,JRE,字节码详解,Java 基本数据类型,装箱和拆箱
  - - meta
    - name: description
      content: 全网质量最高的Java基础常见知识点和面试题总结，希望对你有帮助！
---

## 1、**为什么要使用MQ？**

- 因为项目比较大，做了分布式系统，所有远程服务调用请求都是**同步执行**经常出问题，所以引入了mq
- ![1657771959058](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/rocketmq/1657771959058.png)

## 2、**RocketMQ由哪些角色组成，每个角色作用和特点是什么？**

- ![1657771988912](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/rocketmq/1657771988912.png)

## 3、**RocketMQ Broker中的消息被消费后会立即删除吗？**

- 不会，每条消息都会持久化到CommitLog中，每个Consumer连接到Broker后会维持消费进度信息，当有消息消费后只是当前Consumer的消费进度（CommitLog的offset）更新了。 

## 4、**RocketMQ消费模式有几种？**

- 消费模型由Consumer决定，消费维度为Topic。 
- **集群消费** 
- 一条消息只会被同Group中的一个Consumer消费 
- 多个Group同时消费一个Topic时，每个Group都会有一个Consumer消费到数据 
- **广播消费** 
- 消息将对一 个Consumer Group 下的各个 Consumer 实例都消费一遍。即即使这些 Consumer属于同一个Consumer Group ，消息也会被 Consumer Group 中的每个 Consumer 都消费一次。

## 5、**消费消息是push还是pull？**

- RocketMQ没有真正意义的push，都是pull，虽然有push类，但实际底层实现采用的是**长轮询机制**，即拉取方式 。

## 6、**追问：为什么要主动拉取消息而不使用事件监听方式？**

- 事件驱动方式是建立好长连接，由事件（发送数据）的方式来实时推送。 
- 如果broker主动推送消息的话有可能push速度快，消费速度慢的情况，那么就会造成消息在consumer 端堆积过多，同时又不能被其他consumer消费的情况。而pull的方式可以根据当前自身情况来pull，不 会造成过多的压力而造成瓶颈。所以采取了pull的方式。 

## 7、**消息重复消费**

- 影响消息正常发送和消费的**重要原因是网络的不确定性。** 
- **引起重复消费的原因** 
- **ACK** 
- 正常情况下在consumer真正消费完消息后应该发送ack，通知broker该消息已正常消费，从queue中剔除
- 当ack因为网络原因无法发送到broker，broker会认为词条消息没有被消费，此后会开启消息重投机制把消息再次投递到consumer 
- **消费模式** 
- 在CLUSTERING模式下，消息在broker中会保证相同group的consumer消费一次，但是针对不同group的consumer会推送多次 
- **解决方案** 
- **数据库表** 
- 处理消息前，使用消息主键在表中带有约束的字段中insert 
- **Map** 
- 单机时可以使用map *ConcurrentHashMap* -> putIfAbsent guava cache 
- **Redis** 
- 分布式锁搞起来

## 8、**如何让RocketMQ保证消息的顺序消费** 

- 首先多个queue只能保证单个queue里的顺序，queue是典型的FIFO，天然顺序。多个queue同时消费是无法绝对保证消息的有序性的。所以总结如下： 
- 同一topic，同一个QUEUE，发消息的时候一个线程去发送消息，消费的时候 一个线程去消费一个queue里的消息。

## 9、**RocketMQ如何保证消息不丢失** 

- 首先在如下三个部分都可能会出现丢失消息的情况： 
- Producer端 
- Broker端 
- Consumer端 

### 9.1、Producer端如何保证消息不丢失

- 采取send()同步发消息，发送结果是同步感知的。 
- 发送失败后可以重试，设置重试次数。默认3次。 
- 集群部署，比如发送失败了的原因可能是当前Broker宕机了，重试的时候会发送到其他Broker上

### 9.2、**Broker端如何保证消息不丢失**

- 修改刷盘策略为同步刷盘。默认情况下是异步刷盘的。 
- 集群部署，主从模式，高可用。

### 9.3、**Consumer端如何保证消息不丢失**

- 完全消费正常后在进行手动ack确认。 

## 10、**堆积的消息会不会进死信队列？**

- 不会，消息在消费失败后会进入重试队列（%RETRY%+ConsumerGroup），16次（默认16次）才会进入死信队列（%DLQ%+ConsumerGroup）。

## 11、**如果让你来动手实现一个分布式消息中间件，整体架构你会如何设计实现?** 

- 我个人觉得从以下几个点回答吧： 
  - 需要考虑能快速扩容、天然支持集群 
  - 持久化的姿势 
  - 高可用性 
  - 数据0丢失的考虑 
  - 服务端部署简单、client端使用简单 

## **12、再说说RocketMQ是如何保证数据的高容错性的****?** 

- 在不开启容错的情况下，轮询队列进行发送，如果失败了，重试的时候过滤失败的Broker 
- 如果开启了容错策略，会通过RocketMQ的预测机制来预测一个Broker是否可用 
- 如果上次失败的Broker可用那么还是会选择该Broker的队列 
- 如果上述情况失败，则随机选择一个进行发送 
- 在发送消息的时候会记录一下调用的时间与是否报错，根据该时间去预测broker的可用时间

## 13、**任何一台Broker突然宕机了怎么办？**

- Broker主从架构以及多副本策略。Master收到消息后会同步给Slave，这样一条消息就不止一份了，Master宕机了还有slave中的消息可用，保证了MQ的可靠性和高可用性。而且Rocket MQ4.5.0开始就支持了Dlegder模式，基于raft的，做到了真正意义的HA。 

## 14、**Broker把自己的信息注册到哪个NameServer****上？**

- 这么问明显在坑你，因为Broker会向所有的NameServer上注册自己的信息，而不是某一个，是每一个，全部！ 

### 15、**RocketMq的工作流程是怎样的**

- 首先启动NameServer。NameServer启动后监听端口，等待Broker、Producer以及Consumer连上来 
- 启动Broker。启动之后，会跟所有的NameServer建立并保持一个长连接，定时发送心跳包。心跳包中包含当前Broker信息(ip、port等)、Topic信息以及Borker与Topic的映射关系 
- 创建Topic。创建时需要指定该Topic要存储在哪些Broker上，也可以在发送消息时自动创建Topic 
- Producer发送消息。启动时先跟NameServer集群中的其中一台建立长连接，并从NameServer中获取当前发送的Topic所在的Broker；然后从队列列表中轮询选择一个队列，与队列所在的Broker建立 长连接，进行消息的发送 
- Consumer消费消息。跟其中一台NameServer建立长连接，获取当前订阅Topic存在哪些Broker 上，然后直接跟Broker建立连接通道，进行消息的消费 

## 16、**RocketMq性能比较高的原因？**

- RocketMq采用文件系统存储消息，采用顺序写的方式写入消息，使用零拷贝发送消息，这三者的结合极大地保证了RocketMq的性能。

## 17、**RocketMQ是如何实现定时消息的？**

- 定时消息是指消息发到Broker后，不能立刻被Consumer消费，要到特定的时间点或者等待特定的时间后才能被消费。 其实定时消息实现原理比较简单，如果一个topic对应的消息在发送端被设置为定时消 息，那么会将该消息先存放在topic为SCHEDULE_TOPIC_XXXX的消息队列中，并将原始消息的信息存放在commitLog文件中，由于topic为SCHEDULE_TOPIC_XXXX，所以该消息不会被立即消息，然后通过定时扫描的方式，将到达延迟时间的消息，转换为正确的消息，发送到相应的队列进行消费。

## 18、**RocketMQ如何保证高可用性？** 

- 集群化部署NameServer 
- 集群化部署多broker 

## 19、**RocketMQ的存储机制了解吗？**

- RocketMq采用文件系统存储消息，并采用顺序写写入消息，使用零拷贝发送消息，极大得保证了RocketMq的性能。

## 20、Broker宕了，NameServer是怎么感知到的？

- Broker会定时（30s）向NameServer发送心跳 
- 然后 NameServer会定时（10s）运行一个任务，去检查一下各个Broker的最近一次心跳时间，如果某个Broker超过120s都没发送心跳了，那么就认为这个Broker已经挂掉了。 

## 21、**Master Broker突然挂了，这样会怎么样？**

- RocketMQ 4.5版本之前，用Slave Broker同步数据，尽量保证数据不丢失，但是一旦Master故障了，Slave是没法自动切换成Master的。
- 所以在这种情况下，如果Master Broker宕机了，这时就得手动做一些运维操作，把Slave Broker重新修改一些配置，重启机器给调整为Master Broker，这是有点麻烦的，而且会导致中间一段时间不可用。 
- RocketMQ 4.5之后支持了一种叫做Dledger机制，基于Raft协议实现的一个机制。基于Dledger实现RocketMQ高可用自动切换。 
- 我们可以让一个Master Broker对应多个Slave Broker， 一旦 Master Broker 宕机了，在多个 Slave 中 通过 Dledger 技术 将一个 Slave Broker 选为新的 Master Broker 对外提供服务。在生产环境中可以是用Dledger机制实现自动故障切换，只要10秒或者几十秒的时间就可以完成。
