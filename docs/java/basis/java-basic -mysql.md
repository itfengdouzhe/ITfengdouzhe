---
title: MySql常见面试题
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

## 1、MySQ基础知识

### **数据库基础知识**

- MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，属于 Oracle 旗下产品。
- MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件之一。在Java企业级开发中非常常用，因为 MySQL 是开源免费的，并且方便扩展。 

###  **存储引擎选择** 

- MyISAM：适用于管理非事务表，它提供高速存储和检索， 以及全文搜索能力的场景。比如博客系统、新闻门户网站。
- InnoDB：适用于更新操作频繁，或者要保证数据的完整性，并发量高，支持事务和外键的场景。比如OA自动化办公系统。如果没有特别的需求，使用默认的Innodb即可。

####  **数据库的三大范式是什么** 

- 第一范式：每个列都不可以再拆分。
  - ![1657504113496](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504113496.png)
- 第二范式：在第一范式的基础上，非主键列完全依赖于主键，而不能是依赖于主键的一部分。
  - ![1657504132573](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504132573.png)
- 第三范式：在第二范式的基础上，非主键列只依赖于主键，不依赖于其他非主键。
  - ![1657504140582](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504140582.png)
  - ![1657504140582](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504140582.png)

#### **范式化设计优缺点:**

- 优点:可以尽量得减少数据冗余， 使得更新快， 体积小
- 缺点: 对于查询需要多个表进行关联， 减少写得效率增加读得效率， 更难进行索引优化

### **反范式化优缺点:**

- 优点: 可以减少表得关联， 可以更好得进行索引优化

- 缺点: 数据冗余以及数据异常， 数据得修改需要更多的成本

### **一个查询语句是怎么执行的？**

- 查询缓存弊大于利，因为更新操作会让缓存失效，所以MySQL8.0将此部分彻底移除了。
- ![1657499472800](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657499472800.png)

### **SQL的几种连接查询方式（内连接、外连接、全连接）**

- 内连接（inner join）
  - 典型的联接运算，使用像 =  或 <> 之类的比较运算符）。包括相等联接和自然联接。 
  - 查出的是两张表的交集，两张表都有的才查出来 

- 左外连接（left join）
  - 以左表为主表（查询全部）， 右表为辅表（没有的显示null） 
- 右外连接（right join）
  - 以右表为主表（查询全部）， 左表为辅表（没有的显示null）
- 全连接（full join） 
  -  两个表的所有数据都展示出来 

### **redolog和binlog的区别？** 

- redo log 是 InnoDB 引擎特有的，binlog 是 MySQL 的 Server 层实现的，所有引擎都可以使用。 
- redo log 是物理日志，记录的是“在某个数据页上做了什么修改”，binlog 是逻辑日志，记录的是这个语句的原始逻辑，比如“给 ID=2 这一行的 c 字段加 1 ” 
- redo log 是循环写的，空间固定会用完，binlog 是可以追加写入的。“追加写”是指 binlog 文件写到一定大小后会切换到下一个，并不会覆盖以前的日志。 
- redo log是用来保障已提交事务的ACID特性，binlog大多用于主从复制和数据恢复。 

### **什么是行溢出？** 

- 一个数据页大小16kb，若遇到varchar(65535)、text等这种大文本类型的，大小远大于16kb了，所以一个数据页放不下，需要多个数据页存储一行数据，缓存到buffer pool的缓存页里的时候也是多个缓存 页，这就是行溢出。

### undo log的概念

-  undo log是mysql中比较重要的事务日志之一，顾名思义，undo log是一种用于撤销回退的日志，在事务没提交之前，MySQL会先记录更新前的数据到 undo log日志文件里面，当[事务回滚](https://so.csdn.net/so/search?q=事务回滚&spm=1001.2101.3001.7020)时或者数据库崩溃时，可以利用 undo log来进行回退。 

### undo log的作用

- **提供回滚操作【undo log实现事务的原子性】** 
- 我们在进行数据更新操作的时候，不仅会记录redo log，还会记录undo log，如果因为某些原因导致事务回滚，那么这个时候MySQL就要执行回滚（rollback）操作，利用undo log将数据恢复到事务开始之前的状态。 
- **提供多版本控制(MVCC)【undo log实现多版本并发控制（MVCC）】** 
- MVCC，即多版本控制。在MySQL数据库InnoDB存储引擎中，用undo Log来实现多版本并发控制(MVCC)。当读取的某一行被其他事务锁定时，它可以从undo log中分析出该行记录以前的数据版本是怎样的，从而让用户能够读取到当前事务操作之前的数据【快照读】。 

### **MySQL支持哪些存储引擎？**

- Innodb 
- MyIsam 
- memory 
- archive

### **InnoDB（B+树）**

- InnoDB 底层存储结构为B+树， B树的每个节点对应innodb的一个page，page大小是固定的，一般设为 16k。其中非叶子节点只有键值，叶子节点包含完成数据。
- ![1657505060931](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657505060931.png)

### **Innodb和MyIsam的区别？**

- Innodb支持事务，myisam不支持事务 
- innodb支持外键，myisam不支持外键 
- innodb支持mvcc，myisam不支持mvcc 
- count(*) 时，myisam会很快，因为他保存了一个变量记录总数，直接获取，innodb需要遍历全表进行统计 
- innodb支持表锁、行锁、间隙锁等，myisam只支持表锁 
- innodb表必须有主键，即使没有的话，innodb也会以rowid做为主键，myisam可以没主键 
- innodb按主键大小有序插入，而myisam按顺序插入 

### **为什么MyIsam读效率高于Innodb？** 

- innodb支持事务，所以会有一个mvcc的比较过程。 
- 查询的时候，如果走了索引的话，innodb是聚簇索引，会有一个回表过程，即：先去非聚簇索引树 中查询数据，找到数据对应的key后，再通过key回表到聚簇索引树找到最终的数据。而myisam直 接就是非聚簇索引，查询的时候查到的最后结果不是聚簇索引树的key，而是磁盘地址，所以直接回查询磁盘的完整数据，无需回表。 
- innodb支持行锁，在检查锁的时候不仅要检查表锁，还要看行锁。 

------

## 2、事务

### **什么是数据库事务**

-  事务是逻辑上的一组操作，要么都执行，要么都不执行。 

### **事务的四大特性**

-  ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640-1657503180459.png) 

-  原子性 ：要么都成功，要么都失败。 
-  一致性 ：事务开始之前和完成之后的数据都必须保持一致的状态，必须保证数据库的完整性。 
-  隔离性 ：数据库允许多个并发事务同事对数据进行操作，隔离性保证各个事务相互独立，事务 处理时的中间状态对其它事务是不可见的，以此防止出现数据不一致状态。可通过事务隔离级别设置：包括读未提交（Read uncommitted）、读提交（read committed）、可重复读 （repeatable read）和串行化（Serializable）。 
-  持久性 ：一个事务处理结束后，其对数据库的修改就是永久性的，即使宕机了，数据也不会丢失。redolog+binlog

### **事务四种隔离级别**

- 读未提交 ：一个事务没提交但是他修改的数据却可以被其他事务看到，可能会导致脏读、幻读、不可重复读。 
- 读已提交 ：一个事务没提交，那么他修改的数据其他事务看不到，只能读到已经提交的数据。可能导致幻读和不可重复读。 
- 可重复读（innodb默认）：MySQL INNODB默认的隔离级别。一个事务内读到的数据永远是一样的，不管其他事务做了什么更改，是否提交，我都不知道，我只活在我自己的事务里。可以阻止脏读和不可重复读和幻读。 
- 串行化 ：让所有事务串行化执行，就好比单线程了，一个一个的排队执行，效率低下，可以避免脏读、幻读、不可重复读，因为单线程了嘛。

### **什么是脏写、脏读、不可重复读、幻读** 

- 脏写 ：A和B两个事务都更新同一条数据， 数据原始值为1，A将数据改为2，B将数据改为3，这时候A回滚了，把B写的3也给抹掉了。这就是脏写。 就是两个事务都更新一个数据，结果其中一个事务回滚了，这波操作把另一个事务刚写入的值也给抹掉了。 
- 脏读 ：一个事务中访问到了另外一个事务未提交的数据，读未提交隔离级别会造成脏读。
  - ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640-1657503219605.png)
- 不可重复读：同一个事务里，读取同一条记录多次可能读到不一致的结果。比如A和B两个事务，A负责读取两次，B负责修改数据，A第一次读取到1，B给修改成2且提交了。A在读取的时候发现变成了2，同一个事物里读到的结果不一致了。可重复读策略可以避免此类情况。 
  - ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640-1657503242333.png)
- 幻读 ：比如范围查询，同一个事物里执行两次 where id > 10; 第一次结果是100条记录，但是其他事务在执行第二遍的时候insert了一条，那么回到原事务里再次执行的时候出现了101条记录。 
  - ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640-1657503255166.png)

### **什么是mvcc？原理是什么？**

- Multi-Version Concurrency Control，多版本并发控制。用于实现提交读和可重复读这两种隔离级别。主要原理是undo log版本链+read view。 

### TCC 型事务（Try/Confirm/Cancel）

- WS-BusinessActivity 提供了一种基于补偿的 long-running 的事务处理模型。服务器 A 发起事务， 服务器 B 参与事务，服务器 A 的事务如果执行顺利，那么事务 A 就先行提交，如果事务 B 也执行顺利，则事务 B 也提交，整个事务就算完成。但是如果事务 B 执行失败，事务 B 本身回滚，这时事务 A 已经被提交，所以需要执行一个补偿操作，将已经提交的事务 A 执行的操作作反操作，恢复到未执行前事务 A 的状态。这样的 SAGA 事务模型，是牺牲了一定的隔离性和一致性的，但是提高了 long-running 事务的可用性。 
- ![1657504356387](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504356387.png)

## 3、锁

### MySQL锁

- 当数据库有并发事务的时候，可能会产生数据的不一致，这时候需要一些机制来保证访问的次序，锁机制就是这样的一个机制。

### 共享锁和排他锁的区别

- **共享锁**
- 共享锁 share lock 又称**读锁 read lock**，简称S锁，是读取操作创建的锁。其他用户可以并发读取数据，但任何事务都不能对数据进行修改（获取数据上的排他锁），直到已释放所有共享锁。
- **如果事务T对数据A加上共享锁后，则其他事务只能对A再加共享锁，不能加排他锁。获得共享锁的事务只能读数据，不能修改数据**
- 读取为什么要加读锁呢：防止数据在被读取的时候被别的线程加上写锁使用方式：在需要执行的语句后面加上 `for update`就可以了
- **排他锁**
- 排他锁 exclusive lock 又称**写锁 writer lock**，简称X锁。排他锁是悲观锁的一种实现。
- **若事务T对数据A加上排他锁，则只允许事务T读取和修改数据A，其他任何事务都不能再对A加任何类型的锁，直到事务T释放X锁。排他锁会阻塞所有的排他锁和共享锁**

### 数据库的乐观锁和悲观锁是什么？怎么实现的？

- 数据库管理系统（DBMS）中的并发控制的任务是确保在多个事务同时存取同一数据时不破坏事务的隔离性和一致性以及数据库的统一性。乐观并发控制（乐观锁）和悲观并发控制（悲观锁）是并发控制主要采用的技术手段。
- **悲观锁**：假定会发生并发冲突，每次去查询数据的时候都认为别人会修改，每次查询完数据的时候就把事务锁起来，直到提交事务。实现方式：使用数据库中的锁机制
- **乐观锁**：假设不会发生并发冲突，每次去查询数据的时候都认为别人不会修改，所以不会上锁，在修改数据的时候才把事务锁起来。实现方式：乐观锁一般会使用版本号机制或CAS算法实现

### **什么是死锁**

- 死锁是指两个或多个事务在同一资源上相互占用，并请求锁定对方的资源，从而导致恶性循环的现象。 死锁在InnoDB中才会出现死锁，MyISAM是不会出现死锁，因为MyISAM支持的是表锁，一次性获取了所有得锁，其它的线程只能排队等候。

### **怎么解决死锁？**

- 等待事务超时，主动回滚。 

- 进行死锁检查，主动回滚某条事务，让别的事务能继续走下去。

- 下面提供一种方法，解决死锁的状态: 

- ```sql
  -- 查看正在被锁的事务 SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
  ```

- 下面提供三种一定概率避免死锁的方法： 

- 如果不同程序会并发存取多个表，尽量约定以**相同的顺序**访问表，可以大大降低死锁概率。

- 在同一个事务中尽可能做到一次锁定所需要的所有资源，减少死锁产生概率。 

- 对于非常容易产生死锁的业务部分，可以尝试使用升级锁定颗粒度，通过表级锁定来减少死锁产生 的概率。 

## 4、**索引**

### **何为索引？有什么作用？**

- 索引是一种用于快速查询和检索数据的数据结构。常见的索引结构有: B 树， B+树和Hash。
- 索引的作用就相当于目录的作用。打个比方: 我们在查字典的时候，如果没有目录，那 我们就只能一页一页的去找我们需要查的那个字，速度很慢。如果有目录了，我们只需要先13去目录里查找字的位置，然后直接翻到那一页就行了。 

### **索引有哪些优缺点？**

- 索引的优点
  - 可以大大加快数据的检索速度，这也是创建索引的最主要的原因。
  - 通过使用索引，可以在查询的过程中，使用优化器，提高系统的性能。
- 索引的缺点
  - 时间方面：创建索引和维护索引要耗费时间，具体地，当对表中的数据进行增加、删除和修改的时候，索引也要动态的维护，会降低增/删/改的执行效率；
  - 空间方面：索引需要占物理空间。

### **索引有哪几种类型？**

- **主键索引**：数据列不允许重复，不允许为NULL，一个表只能有一个主键。
- **唯一索引**：数据列不允许重复，允许为NULL值，一个表允许多个列创建唯一索引。
  - 可以通过 `ALTER TABLE table_name ADD UNIQUE (column);` 创建唯一索引
  - 可以通过 `ALTER TABLE table_name ADD UNIQUE (column1,column2);` 创建唯一组合索引
- **普通索引**：基本的索引类型，没有唯一性的限制，允许为NULL值，一个表允许多个列创建普通索引。
  - 可以通过`ALTER TABLE table_name ADD INDEX index_name (column);`创建普通索引
  - 可以通过`ALTER TABLE table_name ADD INDEX index_name(column1, column2, column3);`创建组合索引
- **全文索引**：是目前搜索引擎使用的一种关键技术，MyISAM存储引擎才有全文索引。
  - 可以通过`ALTER TABLE table_name ADD FULLTEXT (column);`创建全文索引
- **覆盖索引**：select的字段正好是索引字段，这时候不需要回表操作。 
- **组合索引**：多个列值组成一个索引，使用的时候要遵循最左匹配原则。

### **B+树索引的数据结构**

-  MySQL通过存储引擎存取数据，基本上90%的人用的就是InnoDB了，按照实现方式分，InnoDB的索引类型目前只有两种：BTREE（B树）索引和HASH索引。B树索引是MySQL数据库中使用最频繁的索引类型，基本所有存储引擎都支持BTree索引。通常我们说的索引不出意外指的就是（B树）索引（实际是用B+树实现的，因为在查看表索引时，mysql一律打印BTREE，所以简称为B树索引） 
-  B+树数据结构 
-  ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640.png) 
-  B+树是为了磁盘及其他存储辅助设备而设计的一种平衡查找树(不是二叉树)，在B+树中，所有记录的节点按大小顺序存放在同一层的叶节点中，各叶子节点用指针进行连接，而B+树索引本质上就是B+树在数据库中的实现，与纯粹的B+树数据结构还是有点区别。 

### **为什么用B+树而不是B树或二叉树或平衡二叉树？**

- **为什么不是一般二叉树？** 
  - 如果二叉树特殊化为一个链表，相当于全表扫描。平衡二叉树相比于二叉查找树来说，查找效率更稳定，总体的查找速度也更快。 
- **为什么不是平衡二叉树呢？** 
  - 我们知道，在内存比在磁盘的数据，查询效率快得多。如果树这种数据结构作为索引，那我们每查找一次数据就需要从磁盘中读取一个节点，也就是我们说的一个磁盘块，但是平衡二叉树可是每个节点只存储一个键值和数据的，如果是B树，可以存储更多的节点数据，树的高度也会降低，因此读取磁盘的次 数就降下来了，查询效率就快了。 
- **那为什么不是B树而是B+树呢？** 
  - B+树非叶子节点上是不存储数据的，仅存储键值，而B树节点中不仅存储键值，也会存储数据。innodb中页的默认大小是16KB，如果不存储数据，那么就会存储更多的键值，相应的树的阶数（节点的子节点树）就会更大，树就会更矮更胖，如此一来我们查找数据进行磁盘的IO次数有会再次减少，数据查询的效率也会更快。 
  - B+树索引的所有数据均存储在叶子节点，而且数据是按照顺序排列的，链表连着的。那么B+树使得范围查找，排序查找，分组查找以及去重查找变得异常简单。 
  - B+树的查询效率更加稳定。B树搜索有可能会在非叶子结点结束，越靠近根节点的记录查找时间越短，只要找到关键字即可确定记录的存在，其性能等价于在关键字全集内做一次二分查找。而在B+树中，顺序检索比较明显，随机检索时，任何关键字的查找都必须走一条从根节点到叶节点的路，所有关键字的查找路径长度相同，导致每一个关键字的查询效率相当。

### **列举一些导致索引失效的场景**

- 查询条件包含or导致后面的索引失效 
- like左模糊 
- 字符串类型没加单引号 
- 联合索引，查询时的条件列不是联合索引中的第一个列 
- 在索引列上使用mysql的内置函数 
- 对索引列运算（如，+、-、*、/） 
- 索引字段上使用！= 或者 < >，not in 
- 发生隐式类型转换会导致索引失效 
- mysql估计使用全表扫描要比使用索引快,则不使用索引。这个是mysql自己决定的，发现后我们可以使用强制索引的语法让MySQL强制走索引 

### **索引不适合哪些场景？**

- 表里数据量很少 
- 更新频繁的字段 
- 区分度很低的字段

### **聚簇索引与非聚簇索引的区别**

- 聚簇索引：索引的叶节点就是数据节点。所以不需要回表。主键id就是聚簇索引，有且仅有一个。
- 非聚簇索引：叶节点仍然是索引节点，只不过有一个指针指向对应的数据块。要想更多的数据需要回表查，可以有多个非聚簇索引。
- ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640-1657503112037.png) 

### **创建索引有什么原则呢？** 

- 最左前缀匹配 
- 频繁作为查询条件的字段 
- 频繁更新的字段不适合 
- 索引列不能参与计算和使用一些函数 
- 优先考虑索引组合，而不是每次都新建索引 
- 在order by或group by字句中，使用索引要遵循最左前缀匹配 
- 区分度低的列不适合 
- 大数据类型的列不适合（比如text等） 

### **什么是最左前缀原则？什么是最左匹配原则？**

- 就是最左优先，在创建多列索引时，要根据业务需求，where子句中使用最频繁的一列放在最左边。比如有组合索引（a,b），那么使用的时候只写where b = xxx会导致索引失效，因为a在前面丢了，但是写成这样where b = x and a = x;这样索引是可以生效的，因为优化器阶段会给优化成where a = x and b =x，不会让索引失效。

### **覆盖索引、回表等这些，了解过吗？** 

- 覆盖索引：查询列就是所使用的索引列，这样不需要回表查询。 
- 回表：二级索引无法直接查询所有列的数据，所以通过二级索引查询到聚簇索引后，再查询到想要的数据，这种通过二级索引查询出来的过程，就叫做回表。 

### **从innodb的索引结构分析，为什么索引的key长度不能太长？**

- key 太长会导致一个页当中能够存放的key的数目变少，间接导致索引树的页数目变多，索引层次增加，从而影响整体查询变更的效率。 

------

## 5、**MySql主从复制和读写分离**

### **主从复制有什么好处？解决了哪些问题？**

- 做备份数据库，主库宕机后，从库可以切换为主库继续工作。 
- 提高并发能力

### **MySQL主从复制原理的是啥？** 

- 主库将在每个事务提交之前将变更写入binlog 
- 然后从库起一个I/O线程连接到master，master机器会为slave开启binlog dump线程。当master的 binlog发生变化的时候，binlog dump线程会将binlog的内容发送给该I/O线程。该I/O线程接收 到binlog内容后，再将内容写入到本地的relay log。 
- 若读取的进度已经跟上了主库，那么就进入睡眠状态并等待主库产生新的事件。 
- 最后从库中有一个SQL线程会从relay log里顺序读取日志内容并在从库中执行一遍，从而与主库的数据保持一致
- ![图片](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/640.jpg)

### **为什么要做读写分离？**

- 分摊服务器压力，提高机器的系统处理效率。读写分离适用于读远比写多的场景
- 增加冗余，提高服务可用性，当一台数据库服务器宕机后可以调整另外一台从库以最快速度恢复服务

### **如何实现MySQL的读写分离？** 

- mycat中间件 
- sharding-jdbc这种在代码业务层自己控制

## 6、**MySQL分库分表**

### **为什么要分库分表？**

- 单机的存储能力、连接数、QPS是有限的，分库分表是一种很好的优化手段，将大表拆分到不同库不同表，减轻数据量，提高查询性能。
- ![1657504242206](https://javatiaozaowang.obs.cn-east-3.myhuaweicloud.com/mysql/1657504242206.png)

### **分库分表的拆分方式有？他们分别主要解决什么问题？**

- **垂直拆分** 
- 把一个有很多字段的表给拆分成多个表，或者是多个库上去，每个库表的结构都不一样，每个库都 都包含部分字段。一般来说会将较少的访问频率很高的字段放到一个表里去，然后将较多的访问频 率很低的字段放到另外一个表里去。因为数据库是有缓存的，你访问频率高的行字段越少，就可以在缓存里缓存更多的行，性能就越好。这个一般在表层面做的较多一些。 
- **水平拆分** 
- 表结构相同，拆分到多张表，这多张表可以在同一个库也可以在不同库，然后采取算法（比如哈希）将数据分散到多张表里，减轻单表的压力。 

## 7、**分散型题目**

### **如果某个表有近千万数据，CRUD比较慢，如何优化？** 

- **分库分表** 
- 某个表有近千万数据，可以考虑优化表结构，分表（水平分表，垂直分表），当然，你这样回答，需要准备好面试官问你的分库分表相关问题呀，如
  - 分表方案（水平分表，垂直分表，切分规则hash等） 
  - 分库分表中间件（Mycat，sharding-jdbc等） 
  - 分库分表一些问题（事务问题、分布式id、跨节点Join等问题） 
  - 解决方案（分布式事务等） 

- **索引优化** 
- 除了分库分表，优化表结构，当然还有所以索引优化等方案。

### **你进行SQL优化的时候一般步骤是什么？**

- 避免返回不必要的数据 
- 加索引，explain进行分析 
- 适当分批量进行
- 分库分表 
- 读写分离 

### **说说对SQL语句优化有哪些方法？**

- Where 子句中：where 表之间的连接必须写在其他 Where 条件之前， 那些可以过滤掉最大数量记录的条件必须写在 Where 子句的末尾. HAVING 最后。
- 用 EXISTS 替代 IN、用 NOT EXISTS 替代 NOT IN。
- 避免在索引列上使用计算
- 避免在索引列上使用 IS NULL 和 IS NOT NULL
- 对查询进行优化，应尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。
- 应尽量避免在 where子句中对字段进行 null值判断， 否则将导致引擎放弃使用索引而进行全表扫描
- 应尽量避免在 where 子句中对字段进行表达式操作， 这将导致引擎放弃使用索引而进行全表扫描

### **主键自增ID还是UUID之间选择哪个？为什么？**

- 自增ID，因为主键是聚簇索引，也就是一颗B+树，索引字段在页里是从小到大排序的，所以自增可以避免页分裂，uuid的话会频繁页分裂。因为每次插入uuid都可能比之前的小，就需要插入到前面去，就造成了页分裂，多个数据页之间的数据来回挪动。 

### **mysql字符串函数有哪些?**

- 求和函数 SUM
- 平均值函数 AVERAGE
- 逻辑函数 IF
- 快捷方式或链接创建函数 HYPERLINK
- 计数函数 COUNT
- 最大(小)值函数 MAX(MIN)
- 条件求和函数 SUMIF

### **drop，truncate，delete区别**

- drop (删除表)：删除内容和定义，释放空间。drop语句将删除表的结构被依赖的约束（constrain),触发器（trigger)索引（index);依赖于该表的存储过程/函数将被保留，但其状态会变为：invalid。
- truncate (清空表中的数据)：删除内容、释放空间但不删除定义(保留表的数据结构)    
- 注意:truncate 不能删除行数据,要删就要把表清空。
- delete (删除表中的数据)：delete 语句用于删除表中的行。delete语句执行删除的过程是每次从表中删除一行，并且同时将该行的删除操作作为事务记录在日志中保存，以便进行进行回滚操作。

###  **MySQL数据库作发布系统的存储，一天五万条以上的增量，预计运维三年怎么优化** 

- 设计良好的数据库结构， 允许部分数据冗余， 尽量避免 join 查询， 提高效率。
- 选择合适的表字段数据类型和存储引擎，适当的添加索引。
- MySQL 库主从读写分离。
- 找规律分表，减少单表中的数据量提高查询速度。
- 添加缓存机制， 比如 memcached ， apc 等。
- 不经常改动的页面，生成静态页面。
- 书写高效率的 SQL。比如 SELECT * FROM TABEL 改为 SELECT field_1, field_2, field_3 FROM TABLE。

### **MySQL可以恢复到半个月内任意一秒的状态，怎么做的？** 

- 首先dba会定期全库备份的，当需要恢复到指定的某一秒时，比如某天下午两点发现中午十二点有一次误删表，需要找回数据，那你可以这么做： 
  - 首先，找到最近的一次全量备份，从这个备份恢复到临时库 
  - 然后，从备份的时间点开始，将备份的binlog依次取出来，重放到中午误删表之前的那个时刻。 
  - 这样临时库就跟误删之前的线上库一样了，然后可以把表数据从临时库取出来，按需要恢复到线上库去。 

### **生产环境下的一次性能抖动**

- 背景：线上运行的服务，出现了一次性能抖动。导致了告警。 

- 经查询发现是如下原因： 

- 平时只需要几百毫秒的语句这一下执行了几秒钟了，经查询发现某个SQL需要查询大量数据（不属于慢SQL的范畴），然后需要将大量的数据缓存到缓存页中去，此时就可能导致内存里大量的脏页需要淘汰出去刷到磁盘上，要不然没空间缓存这批查询的数据到buffer pool中。所以大量的刷盘操作是很慢的，导致了抖动。 

- 补充： 

- 还有一种情况也可能造成性能抖动，就是大量的update/insert/delete语句导致redo log buffer快写满的时候，造成大批量的redo log buffer的数据刷盘操作，这时候你再进行update/insert/delete的时候会发现性能极差，比如单表update/insert/delete发现1s都没完成，这时候可以看下是不是大量的redo log在刷盘。 

- 解决办法： 

  调整 innodb_io_capacity 参数，这个参数是告诉数据库采用多大的IO速率把缓存页flush到磁盘里，先采取压测看下当前磁盘的io速率支持多少然后针对性调整大小。 

  调整 innodb_flush_neighbors 参数，这个参数是说flush缓存页到磁盘的时候，可能会控制把缓存页临近的其他缓存页也一起刷到磁盘，但是这样有时候会导致刷磁盘的页太多了，因为临近的页也刷到磁盘来了，所以调整成0。
