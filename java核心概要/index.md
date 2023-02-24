# Java核心概要


# 1、Java基础

## 1.1 JDK/JRE/JVM

jdk是开发Java程序必备的，jdk包括jre，除此外还包括javac编译工具、java doc等工具。

jre包括jvm、java基础类库等，是运行编译后的java程序的完整集合，即运行字节码文件所需的全部内容。

jvm是Java虚拟机，在不同的系统上有不同的实现，它屏蔽了操作系统的差异，赋予了java跨平台的特性。

> 字节码，即.class文件，.java文件编译生成的文件。

## 1.2面向对象三大特征

封装：把对象的状态信息隐藏在对象内部，不允许外部直接访问内部信息。而是对外提供一些操作数据的接口，外部通过访问接口来操作数据。提高了数据的安全性。

继承：一个类可以继承另外一个类，通过继承可以获取别的类的所有属性和方法，提高了代码的复用性和可维护性。

多态：一个类具有多种状态，具体表现为父类变量指向子类实例。

> 多态的特点：
>
> 1.调用的方法不能是子类独有的
>
> 2.如果子类重写了方法，调用的就是重写后的方法，否则调用的是父类的方法。
>
> 3.对象类型与引用类型直接具有继承或实现的关系
>
> 4.具体调用的是哪个方法只有在程序运行期间才能决定

## 1.3接口和抽象类

相同点：

1. 都可以包含抽象方法
2. 都可以有方法的默认实现
3. 都不能被实例化

区别：

1. 抽象类只能继承一个，接口可以实现多个
2. 接口中成员变量只能是public static final，抽象类没有限制，默认是default
3. 接口强调的是行为，实现什么接口就具有什么行为，抽象类强调的是所属关系，主要用于代码复用。

## 1.4深浅拷贝

浅拷贝：在堆上复制一个对象，对于对象中的引用类型，直接复制引用类型的地址。

深拷贝：在堆上复制一个对象，对于对象中的引用类型，也会在堆上复制新的对象。

![](https://image.okzhp.tk/img/20230224153451.png)

## 1.5Object类

Object类是所有类的父类，一些常见方法：

> equals：默认是比较引用地址，即`==`，String类重写了该方法，所以String的equals比较的是字符串内容。
>
> hashCode()：native方法，返回对象的哈希码
>
> toString()：默认是输出哈希码的16进制字符串
>
> clone()：浅拷贝，返回对象的拷贝对象。
>
> 其他：wait,notify，用于协调线程间的工作，只能在Synchronized 中使用

`==`和`equals()`区别：

==比较引用地址是否相等，对于基本类型比较的是值是否相等。

equals()如果没有重新该方法，默认与==作用一致，如果重写了该方法，则是比较对象的内容是否一致。

## 1.6hashCode()

该方法是返回对象的哈希值，用于确定在哈希表中的索引位置。

> 不同的对象可能会有一样的hashCode，称为哈希碰撞。
>
> 简言之，对象相等则hashcode一定相等，hashcode相等对象不一定相等。
>
> 重写equals方法必须重写hashCode方法，否则可能会导致两个相等的对象hashcode却不一致，这样会导致hashMap出现问题。

## 1.7String类

String是不可变的，并且String类是final类，不可被继承。内部是使用私有的final char数组，(jdk1.9后改为byte数组，更加节省空间)，并且没有提供修改数组的方法。

StringBuilder和StringBuffer都是可变的，通过append方法修改字符串。前者不是线程安全的，后者是线程安全的，前者的性能比后者高约10%。单线程操作可变字符串使用StringBuilder，多线程操作可变字符串使用StringBuffer。

此外，String类通过+进行连接，实际还是通过StringBuilder的append方法实现的，循环内使用+的方式会导致每次连接字符串都要新建StringBuilder对象，造成浪费。

## 1.8字符串常量池

字符串常量池 是JVM为了提高性能和减少内存消耗针对String类专门开辟的一片区域，主要目的是为了避免字符串的重复创建。

String s1 = new String("abc")创建了几个对象？

两个。首先在常量池中创建字符串“abc”的引用，随后创建的String对象指向这个引用。

一个。如果常量池中已经存在字符串“abc”的引用，那么只会创建一个string对象并指向这个引用。

## 1.9包装类型

基本数据类型对应的引用类型。包装类型没有默认值，成员变量的基本数据类型有默认值。

缓存机制：整数类型缓存了[-128,127]，浮点数没有缓存机制。

自动拆装箱：基本数据类型和包装类型自动转换的过程。这一过程其实就是调用包装类的valueOf()方法，和xxxValue()方法。频繁拆装箱会影响性能。

## 1.10浮点数精度丢失/超过long数据表示

需要精确运算结果使用BigDecimal类（涉及到钱的场景）,超过long的数据可以使用BigInteger类，内部使用int[]数组进行运算。

## 1.11异常

异常的顶级类是Throwable类，其两个重要子类分别是：Exception和Error。

异常通常可以被捕获并处理，error通常无法被程序处理，例如虚拟机运行错误或虚拟机内存不够。

异常可以分为运行时异常，即继承自RuntimeException，和非运行时异常。

后者会在编译期检查，如果没有捕获或抛出异常就无法通过编译，例如ClassNotFoundException、IO异常等

前者常见的异常有：空指针，数组越界，类型转换异常，参数异常等等。

## 1.12try-catch-finally

try和finally都有return，会返回什么？

在try执行return前会将返回值暂存在一个本地变量中，然后执行finally语句，随后finally中的return值覆盖了之前的值，最终将返回finally中的值。

finally一定会被执行吗？

通常情况一定会执行，但如果线程被死亡或者关闭JVM可能会导致无法执行finally。

通常我们在finally中执行关闭资源的操作，可以通过语法try-with-resources替换之前的操作，可以使代码更加简短清晰。

例如，执行完后将自动关闭资源，无需手动关闭。

```java
try (BufferedInputStream bin = new BufferedInputStream(new FileInputStream(new File("test.txt")));
     BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(new File("out.txt")))) {
    int b;
    while ((b = bin.read()) != -1) {
        bout.write(b);
    }
}
catch (IOException e) {
    e.printStackTrace();
}
```

## 1.13反射

通过反射可以获取到任意类的所有属性和方法，并且可以调用这些方法。

框架中通常会用大量用到反射机制，以及Jdk的动态代理都用到了反射。

1. 知道具体类的情况可以通过`类名.class`获取Class
2. 有对象实例的情况可以通过`对象.getClass()`获取Class
3. 不知道具体类的话可以通过`Class.forName()`或者`ClassLoader.getSystemClassLoader().loadClass()`

# 2.Java集合

## 2.1.概览

大体上可以分为Collection和Map两类。

前者包括List、Set、Queue，后者包括Map。

List线性表，存储元素有序可重复。

Set存储元素无序且不可重复。

Queue是队列，有序可重复，符合FIFO（先进先出）原则。

Map存储键值对，无序键不可重复，值可重复。

## 2.2ArrayList和LinkedList

前者底层使用数组，后者使用双向链表，绝大数情况都使用前者，连后者的作者都说几乎不适用LinkedList。

前者使用数组，可能会导致存储空间的浪费，随机获取元素很快，但是在中间位置进行插入或删除操作较费时，因为涉及到元素位置的移动。后者数据可以分散存储而不必存储在连续的空间。

ArrayList：初始容量为10（第一次添加元素才会进行初始化），随后每次进行1.5倍扩容。不是线程安全的，vector是一种较早的实现，是线程安全的，但是基本已经弃用了。

## 2.3HashSet、LinkedHashSet、TreeSet

三者都不是线程安全的，底层结构分别为HashMap（无序）、链表+HashMap(元素插入取出满足FIFO)、红黑树（支持对元素进行排序）。

Set存储的唯一性使用了HashMap的键的唯一性的特点，通过键的唯一保证元素的唯一。

## 2.4Queue

Deque（双端队列）接口扩展了Queue接口，ArrayDeque和LinkedList都实现了Deque接口，可以作为双端队列使用，还可以作为栈Stack使用。

## 2.5HashMap和HashTable和ConcurrentHashMap

前者不是线程安全的，后两者是线程安全的。其中HashTable基本被淘汰了，如果要保证线程安全就使用ConcurrentHashMap。

## 2.6HashMap和TreeMap

前者是无序的，后者可以根据键进行排序，默认是键的升序，也可以指定排序的比较器。

## 2.7HashMap底层

底层是数组+链表+红黑树，扩容是2倍扩容。

put元素过程：首先计算Key的hashcode，根据hashcode计算出数组的索引位置，如果该位置为空，直接存储节点，否则判断节点的key值是否一致，一致则直接覆盖节点的Value，否则依次往后比较Key，如果key都不一样，就将节点存储在链表末尾，随后判断是否需要进行树化。

为什么容量为2的幂次方？

根据hashcode计算数组索引时，采用了(n-1)&hash的方式，当数组长度为2的幂次方时，对长度取余等价于(n-1)&hash，位运算是比取余运算快的。

扩容原理？

当元素个数大于扩容阈值时，就会进行扩容操作。扩容阈值等于容量乘以负载因子，默认是0.75。

扩容首先将容量扩大2倍，随后将节点重新进行散列，这是一个比较费时的操作。散列的规则是：将hashcode与原数组长度进行与运算，为0则索引为原索引，否则索引为（原索引+原容量）

## 2.8 ConcurrentHashMap

线程安全，1.7采用分段数组+链表，1.8变成了数组链表和红黑树。线程安全由原来的分段锁变为了synchronized和CAS。`synchronized` 只锁定当前链表或红黑二叉树的首节点。并发度是数组的大小。

# 3.IO

## 3.1概览

输入流基类：InputStream（字节流）/Reader（字符流）

输出流基类：OutputStream（字节流）/Writer（字符流）

## 3.2InputStream/OutputStream

`FileInputStream` 是一个比较常用的字节输入流对象，通常会配合 `BufferedInputStream`（字节缓冲输入流）来使用。用来以字节流的形式读取文件内容。

类似的，`FileOutputStream` 是一个比较常用的字节输出流对象，通常会配合 `BufferedOutputStream`（字节缓冲输出流）来使用。用来以字节流的形式输出文件内容。

## 3.3Reader/Writer

字符流主要为了解决字符编码问题，如果使用字节流读取文本内容，很容易出现乱码，而使用字符流就不会出现乱码问题。

`InputStreamReader` 是字节流转换为字符流的桥梁，其子类 `FileReader` 是基于该基础上的封装，可以直接操作字符文件。

类似的，`OutputStreamWriter` 是字节流转换为字符流的桥梁，其子类 `FileWriter` 是基于该基础上的封装，可以直接操作字符文件。

`BufferedReader` （字符缓冲输入流）和 `BufferedWriter`（字符缓冲输出流）类似于 `BufferedInputStream`（字节缓冲输入流）和`BufferedOutputStream`（字节缓冲输入流），内部都维护了一个字节数组作为缓冲区。不过，前者主要是用来操作字符信息。

## 3.4IO的设计模式

**装饰器模式**：用于增强原有功能。例如通过BufferedInputStream增强FileInputStream。BufferedInputStream` 的构造函数其中的一个参数就是 `InputStream

**适配器模式**：主要用于接口互不兼容的类的协调工作。`InputStreamReader` 和 `OutputStreamWriter` 就是两个适配器(Adapter)， 同时，它们两个也是字节流和字符流之间的桥梁。`InputStreamReader` 使用 `StreamDecoder` （流解码器）对字节进行解码，**实现字节流到字符流的转换，**

**工厂模式**：工厂模式用于创建对象，NIO 中大量用到了工厂模式。例如Files.newInputStream()；

**观察者模式**：NIO 中的文件目录监听服务使用到了观察者模式。NIO 中的文件目录监听服务基于 `WatchService` 接口和 `Watchable` 接口。`WatchService` 属于观察者，`Watchable` 属于被观察者。

参考：[Java IO设计模式总结 | JavaGuide(Java面试+学习指南)](https://javaguide.cn/java/io/io-design-patterns.html#工厂模式)

# 4.多线程

## 4.1多线程几种方式

1. 实现runnable接口并重写run方法，用的较多
2. 继承Thread类，并重写run方法，用的较少
3. 实现callable接口，并重写call方法。

> runnable和callable接口区别：前者没有返回值，后者可以返回执行结果。

不调用start()方法，直接执行run()方法可以吗？

start将启动一个新线程去执行run方法，直接执行run()方法不会启动新线程。

## 4.2线程的状态

java中线程共有六种状态，分别是：

`初始` `运行` `等待` `超时等待` `阻塞` `结束` 

线程创建完毕后处于初始状态，调用start方法后进入运行状态，运行状态下调用wait()方法将进入等待或者超时等待，如果获取锁失败将进入阻塞状态，线程执行完毕后进入结束状态。

![](https://image.okzhp.tk/img/20230224233633.png)

## 4.3线程和进程

进程是系统运行程序的最小单位，线程可以看作更轻量级的执行单位。系统切换进程开销较大，切换线程开销小。

一个进程可以包含多个线程，多个线程共享堆和方法区，但每个线程有自己的程序计数器、栈和本地方法栈。

> 为什么程序计数器、栈和本地方法栈是私有的？
>
> 每个线程有自己的执行任务，程序计数器记录着线程的下一条指令的位置；此外在上下文切换时记录着当前执行的位置，以便可以正确恢复执行。
>
> 栈则保存了方法执行的一些信息，方法的执行就是栈帧入栈和出栈的过程。
>
> 本地方法栈则是为栈提供本地方法服务。

> 堆和方法区
>
> 堆和方法区是所有线程共享的资源，其中堆是进程中最大的一块内存，主要用于存放新创建的对象 (几乎所有对象都在这里分配内存)，方法区主要用于存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等数据

## 4.4为什么使用多线程

更好的利用多个cpu，提高运行效率，提高并发量。

## 4.5死锁

多个线程都持有某些资源，同时在等待别的线程释放资源，最终造成了所有线程都在等待的局面。

如何避免死锁？

线程获取锁的顺序要一致。

## 4.6锁/线程同步/线程通信

1. synchronized：用于保证资源只被一个线程访问，可用于方法或代码块。保证了资源共享问题，但无法解决线程协调工作，此时就需要wait()和notify()出场了，这两个方法只能在synchronized内使用，当不满足某个条件时调用wait()方法，使线程进入等待状态，当满足某个条件时，通过别的线程调用notifyAll()（或notify()）进行唤醒。
2. ReentrantLock：与synchronized作用相同，但更加灵活，可以选择公平锁或非公平锁，默认非公共锁。通过Condition类可以实现wait和notify的功能。
3. volatile：只能修饰变量，可以保证变量的可见性，每次使用该变量都需要到主存去取。

volatile和synchronized异同：**前者只能保证可见性，不能保证原子性，后者都可以保证。**前者性能更好。前者只能用于变量，后者可以用于方法和代码块。**前者主要用于解决多个线程间变量的可见性，后者是解决访问资源的同步性。**

> synchronized和ReentrantLock都属于可重入锁，一个线程在获取锁后仍然可以再次获取锁。同时也是悲观锁，（独占锁），悲观锁多用于写比较多的情况。
>
> 乐观锁一般使用版本号或CAS算法实现。
>
> 此外，ReadWriteLock可以使读锁和写锁分离，允许多个读锁同时读（前提是没有写锁），可以进一步提高并发量。

## 4.7wait和sleep区别

前者使线程进入等待状态直到被唤醒，会释放锁，后者是暂停线程的执行，不会释放锁。

wait是Object的方法，sleep是Thread的方法。

## 4.8ThreadLocal

为每个线程创建副本值。底层是通过ThreadLocalMap实现的，原理就是使用线程作为key，获取其对应的值。

ThreadLocal导致的内存泄漏问题？如何避免？

key为弱引用，而value为强引用。假如ThreadLocal没有被强引用的话，在GC清理时就会把key清理掉而value不会清理，就会造成内存泄漏。使用完ThreadLocal后手动调用remove()方法

## 4.9线程池

为什么使用线程池？

频繁创建销毁线程会造成资源浪费，通过线程池可以降低资源消耗，而且方便管理线程。

如何创建线程池？

1. 通过**`ThreadPoolExecutor`**：阿里推荐的方式。
2. 通过Executors工具类，内置了若干种类型的线程池。（为什么不推荐这种方式？任务队列无限量或者线程无限量可能导致OOM）

另外，线程池execute()方法用于执行runnable类型的任务，且没有返回值，

而submit()方法可以执行Runnable或者Callable类型的任务，且返回值为Future<T>。

调用future.get()即可获取执行结果，且此方法会阻塞线程，只有任务执行完返回结果后才会继续执行get()后的代码。
