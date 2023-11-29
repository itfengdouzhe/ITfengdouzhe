---
title: Java集合
category: Java
tag:
  - Java集合
head:
  - - meta
    - name: keywords
      content: JVM,JDK,JRE,字节码详解,Java 基本数据类型,装箱和拆箱
  - - meta
    - name: description
      content: 全网质量最高的Java基础常见知识点和面试题总结，希望对你有帮助！
---

## 1、说说List和Set的区别

- List：有序，按对象进入的顺序保存对象，可重复，允许多个Null元素对象，可以使用Iterator取出所有元素，在逐一遍历，还可以使用get(int index)获取指定下标的元素
- Set：无序，不可重复，最多允许有一个Null元素对象，取元素时只能用Iterator接口取得所有元素，在逐一遍历各个元素

## 2、ArrayList和linkedList的区别

- Array（数组）是基于索引index)的数据结构，它使用索引在数组中搜索和读取数据是很快的。
- Array获取数据的时间复杂度是O(1),但是要删除数据却是开销很大，因为这需要重排数组中的所有数据, (因为删除数据以后, 需要把后面所有的数据前移)
- 缺点: 数组初始化必须指定初始化的长度, 否则报错
- List—是一个有序的集合，可以包含重复的元素，提供了按索引访问的方式，它继承Collection。
- List有两个重要的实现类：ArrayList和LinkedList
- ArrayList: 可以看作是能够自动增长容量的数组,ArrayList底层的实现是Array, 数组扩容实现
- LinkList是一个双链表,在添加和删除元素时具有比ArrayList更好的性能.但在get与set方面弱于ArrayList.当然,这些对比都是指数据量很大或者操作很频繁

**适用场景分析**

- 当需要对数据进行对随机访问的时候，选用 ArrayList。
- 当需要对数据进行多次增加删除修改时，采用 LinkedList。
- 如果容量固定，并且只会添加到尾部，不会引起扩容，优先采用 ArrayList。
- 当然，绝大数业务的场景下，使用 ArrayList 就够了，但需要注意避免 ArrayList 的扩容，以及非顺序的插入。

## 3、说说HashMap和HashTable的区别

- **对外提供的接口不同**

  - Hashtable比HashMap多提供了elments() 和contains() 两个方法。 elments() 方法继承自Hashtable的父类Dictionnary。elements() 方法用于返回此Hashtable中的value的枚举。

  - contains()方法判断该Hashtable是否包含传入的value。它的作用与containsValue()一致。事实上，contansValue() 就只是调用了一下contains() 方法。

- **对null的支持不同**

  - Hashtable：key和value都不能为null。

  - HashMap：key可以为null，但是这样的key只能有一个，因为必须保证key的唯一性；可以有多个key值对应的value为null。

- **安全性不同**

  - HashMap是线程不安全的，在多线程并发的环境下，可能会产生死锁等问题，因此需要开发人员自己处理多线程的安全问题。

  - Hashtable是线程安全的，它的每个方法上都有synchronized 关键字，因此可直接用于多线程中。

  - 虽然HashMap是线程不安全的，但是它的效率远远高于Hashtable，这样设计是合理的，因为大部分的使用场景都是单线程。当需要多线程操作的时候可以使用线程安全的ConcurrentHashMap。

- ConcurrentHashMap虽然也是线程安全的，但是它的效率比Hashtable要高好多倍。因为ConcurrentHashMap使用了分段锁，并不对整个数据进行锁定。

**初始容量大小和每次扩充容量大小不同**

## 4、HashMap 中的 key 我们可以使用任何类作为 key 吗

- 平时可能大家使用的最多的就是使用 String 作为 HashMap 的 key，但是现在我们想使用某个自定义类作为 HashMap 的 key，那就需要注意以下几点：

  - 如果类重写了 equals 方法，它也应该重写 hashCode 方法。

  - 类的所有实例需要遵循与 equals 和 hashCode 相关的规则。

  - 如果一个类没有使用 equals，你不应该在 hashCode 中使用它。

  - 咱们自定义 key 类的最佳实践是使之为不可变的，这样，hashCode 值可以被缓存起来，拥有更好的性能。不可变的类也可以确保 hashCode 和 equals 在未来不会改变，这样就会解决与可变相关的问题了。

## 5、说说HashMap与ConcurrentHashMap的异同

- 都是 key-value 形式的存储数据。
- HashMap 是线程不安全的，ConcurrentHashMap 是 JUC 下的线程安全的。
- HashMap 底层数据结构是数组 + 链表（JDK 1.8 之前）。JDK 1.8 之后是数组 + 链表 + 红黑树。当链表中元素个数达到 8 的时候，链表的查询速度不如红黑树快，链表会转为红黑树，红黑树查询速度快。
- HashMap 初始数组大小为 16（默认），当出现扩容的时候，以 0.75 * 数组大小的方式进行扩容。
- ConcurrentHashMap 在 JDK 1.8 之前是采用分段锁来现实的 Segment + HashEntry，Segment数组大小默认是 16，2 的 n 次方；JDK 1.8 之后，采用 Node + CAS + Synchronized来保证并发安全进行实现。

## 6、红黑树有哪几个特征？

- 紧接上个问题，面试官很有可能会问红黑树，下面把红黑树的几个特征列出来：

  ![image-20231121155814437](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121155814437.png)

  ## 7、哪些集合类是线程安全的？

- vector：就比arraylist多了个同步化机制（线程安全），因为效率较低，现在已经不太建议使用。在web应用中，特别是前台页面，往往效率（页面响应速度）是优先考虑的。
- statck：堆栈类，先进后出。
- hashtable：就比hashmap多了个线程安全。

## 8、遍历一个 List 有哪些不同的方式？每种方法的实现原理是什么？Java 中 List 遍历的最佳实践是什么？

- 遍历方式有以下几种：

  - for 循环遍历，基于计数器。在集合外部维护一个计数器，然后依次读取每一个位置的元素，当读取到最后一个元素后停止。

  - 迭代器遍历，Iterator。Iterator 是面向对象的一个设计模式，目的是屏蔽不同数据集合的特点，统一遍历集合的接口。Java 在 Collections 中支持了 Iterator 模式。

  - foreach 循环遍历。foreach 内部也是采用了 Iterator 的方式实现，使用时不需要显式声明Iterator 或计数器。优点是代码简洁，不易出错；缺点是只能做简单的遍历，不能在遍历过程中操作数据集合，例如删除、替换。

- **最佳实践：**Java Collections 框架中提供了一个 RandomAccess 接口，用来标记 List 实现是否支持Random Access。

  - 如果一个数据集合实现了该接口，就意味着它支持 Random Access，按位置读取元素的平均时间复杂度为 O(1)，如ArrayList。

  - 如果没有实现该接口，表示不支持 Random Access，如LinkedList。

- 推荐的做法就是，支持 Random Access 的列表可用 for 循环遍历，否则建议用 Iterator 或foreach 遍历。

## 9、ArrayList和Vector的区别是什么？

- 这两个类都实现了 List 接口（List 接口继承了 Collection 接口），他们都是有序集合
  - 线程安全：Vector 使用了 Synchronized 来实现线程同步，是线程安全的，而 ArrayList 是非线程安全的。
  - 性能：ArrayList 在性能方面要优于 Vector。
  - 扩容：ArrayList 和 Vector 都会根据实际的需要动态的调整容量，只不过在 Vector 扩容每次会增加 1 倍，而 ArrayList 只会增加 50%。
- Vector类的所有方法都是同步的。可以由两个线程安全地访问一个Vector对象、但是一个线程访问Vector的话代码要在同步操作上耗费大量的时间。
- Arraylist不是同步的，所以在不需要保证线程安全时时建议使用Arraylist。

## 10、HashMap 的长度为什么是 2 的幂次方？

- 为了能让 HashMap 存取高效，尽量较少碰撞，也就是要尽量把数据分配均匀，每个链表/红黑树长度大致相同。这个实现就是把数据存到哪个链表/红黑树中的算法。

- **这个算法应该如何设计呢？**
  - 我们首先可能会想到采用%取余的操作来实现。但是，重点来了：“取余(%)操作中如果除数是2的幂次则等价于与其除数减一的与(&)操作（也就是说 hash%length==hash&(length-1)的前提是 length 是2的 n 次方；）。” 并且 采用二进制位操作 &，相对于%能够提高运算效率，这就解释了 HashMap 的长度为什么是2的幂次方。

- **那为什么是两次扰动呢？**
  - 这样就是加大哈希值低位的随机性，使得分布更均匀，从而提高对应数组存储下标位置的随机性&均匀性，最终减少Hash冲突，两次就够了，已经达到了高位低位同时参与运算的目的；

## 11、HashSet与HashMap的区别

![image-20231121165038091](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121165038091.png)

## 12、说一下HashMap的实现原理？

- HashMap概述：HashMap是基于哈希表的Map接口的非同步实现。此实现提供所有可选的映射操作，并允许使用null值和null键。此类不保证映射的顺序，特别是它不保证该顺序恒久不变。

- HashMap的数据结构：在Java编程语言中，最基本的结构就是两种，一个是数组，另外一个是模拟指针（引用），所有的数据结构都可以用这两个基本结构来构造的，HashMap也不例外。HashMap实际上是一个“链表散列”的数据结构，即数组和链表的结合体。 

- HashMap 基于 Hash 算法实现的

  - 当我们往Hashmap中put元素时，利用key的hashCode重新hash计算出当前对象的元素在数组中的下标。

  - 存储时，如果出现hash值相同的key，此时有两种情况。(1)如果key相同，则覆盖原始值；(2)如果key不同（出现冲突），则将当前的key-value放入链表中。

  - 获取时，直接找到hash值对应的下标，在进一步判断key是否相同，从而找到对应值。

  - 理解了以上过程就不难明白HashMap是如何解决hash冲突的问题，核心就是使用了数组的存储方式，然后将冲突的key的对象放入链表中，一旦发现冲突就在链表中做进一步的对比。

- 需要注意Jdk 1.8中对HashMap的实现做了优化，当链表中的节点数据超过八个之后，该链表会转为红黑树来提高查询效率，从原来的O(n)到O(logn)

## 13、HashMap在JDK1.7和JDK1.8中有哪些不同？HashMap的底层实现

- 在Java中，保存数据有两种比较简单的数据结构：数组和链表。数组的特点是：寻址容易，插入和删除困难；链表的特点是：寻址困难，但插入和删除容易；所以我们将数组和链表结合在一起，发挥两者各自的优势，使用一种叫做拉链法的方式可以解决哈希冲突。

- **JDK1.8之前**
  - JDK1.8之前采用的是拉链法。拉链法：将链表和数组相结合。也就是说创建一个链表数组，数组中每一格就是一个链表。若遇到哈希冲突，则将冲突的值加到链表中即可。

![image-20231121165441386](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121165441386.png)

- **JDK1.8之后**

  - 相比于之前的版本，jdk1.8在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）时，将链表转化为红黑树，以减少搜索时间。

  ![image-20231121165542061](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121165542061.png)

- **JDK1.7 VS JDK1.8** **比较**

  - JDK1.8主要解决或优化了一下问题：

    - resize 扩容优化

    - 引入了红黑树，目的是避免单条链表过长而影响查询效率，红黑树算法请参考

    - 解决了多线程死循环问题，但仍是非线程安全的，多线程时可能会造成数据丢失问题。

  ![image-20231121165631731](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121165631731.png)

## 14、HashMap的扩容操作是怎么实现的？

- 在jdk1.8中，resize方法是在hashmap中的键值对大于阀值时或者初始化时，就调用resize方法进行扩容；
- 每次扩展的时候，都是扩展2倍；
- 扩展后Node对象的位置要么在原位置，要么移动到原偏移量两倍的位置。
- 在putVal()中，我们看到在这个函数里面使用到了2次resize()方法，resize()方法表示的在进行第一次初始化时会对其进行扩容，或者当该数组的实际大小大于其临界值值(第一次为12),这个时候在扩容的同时也会伴随的桶上面的元素进行重新分发，这也是JDK1.8版本的一个优化的地方。
- 在1.7中，扩容之后需要重新去计算其Hash值，根据Hash值对其进行分发，但在1.8版本中，则是根据在同一个桶的位置中进行判断(e.hash & oldCap)是否为0，重新进行hash分配后，该元素的位置要么停留在原始位置，要么移动到原始位置+增加的数组大小这个位置上

## 15、HashMap是怎么解决哈希冲突的？

在解决这个问题之前，我们首先需要知道什么是哈希冲突，而在了解哈希冲突之前我们还要知道什么是哈希才行；

- **什么是哈希？**

  - Hash，一般翻译为“散列”，也有直接音译为“哈希”的，这就是把任意长度的输入通过散列算法，变换成固定长度的输出，该输出就是散列值（哈希值）；这种转换是一种压缩映射，也就是，散列值的空间通常远小于输入的空间，不同的输入可能会散列成相同的输出，所以不可能从散列值来唯一的确定输入值。简单的说就是一种将任意长度的消息压缩到某一固定长度的消息摘要的函数。

  - 所有散列函数都有如下一个基本特性**：根据同一散列函数计算出的散列值如果不同，那么输入值肯定也不同。但是，根据同一散列函数计算出的散列值如果相同，输入值不一定相同**。

- **什么是哈希冲突？**
  - 当两个不同的输入值，根据同一散列函数计算出相同的散列值的现象，我们就把它叫做碰撞（哈希碰撞）。

- **HashMap的数据结构**
  - 在Java中，保存数据有两种比较简单的数据结构：数组和链表。数组的特点是：寻址容易，插入和删除困难；链表的特点是：寻址困难，但插入和删除容易；所以我们将数组和链表结合在一起，发挥两者各自的优势，使用一种叫做链地址法的方式可以解决哈希冲突：

![image-20231121165935124](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121165935124.png)

- **JDK1.8新增红黑树**

  ![image-20231121170001086](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/OfferTrainingCamp/image-20231121170001086.png)		

  - 通过上面的**链地址法（使用散列表）和扰动函数**我们成功让我们的数据分布更平均，哈希碰撞减少，但是当我们的HashMap中存在大量数据时，加入我们某个bucket下对应的链表有n个元素，那么遍历时间复杂度就为O(n)，为了针对这个问题，JDK1.8在HashMap中新增了红黑树的数据结构，进一步使得遍历复杂度降低至O(logn)；


- 简单总结一下HashMap是使用了哪些方法来有效解决哈希冲突的：

  - 使用链地址法（使用散列表）来链接拥有相同hash值的数据；

  - 使用2次扰动函数（hash函数）来降低哈希冲突的概率，使得数据分布更平均；

  - 引入红黑树进一步降低遍历的时间复杂度，使得遍历更快；

## 16、为什么HashMap中String、Integer这样的包装类适合作为K？

- String、Integer等包装类的特性能够保证Hash值的不可更改性和计算准确性，能够有效的减少Hash碰撞的几率 

  - 都是final类型，即不可变性，保证key的不可更改性，不会存在获取hash值不同的情况；

  - 内部已重写了equals()、hashCode()等方法，遵守了HashMap内部的规范（不清楚可以去上面看看putValue的过程），不容易出现Hash值计算错误的情况；
