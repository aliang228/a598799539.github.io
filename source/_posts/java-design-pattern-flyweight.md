---
layout: post
title: "[Java性能优化]05 享元模式"
description: 享元模式是为数不多的、只为提升系统性能而生的设计模式。它的主要作用就是复用大对象（重量级对象），以节省内存空间和对象创建时间。
keywords: [享元模式, FlyWeight,Fly Weight, Java]
date:   2015-06-07  15:50:00
category: "java"
tags:
  - 享元模式
---

享元模式，顾名思义：共享元对象。如果在一个系统中存在多个相同的对象，那么只需要共享一份对象的拷贝，而不必
为每一次使用创建新的对象。

享元模式是为数不多的、只为提升系统性能而生的设计模式。它的主要作用就是复用大对象（重量级对象），以节省内存空间和对象创建时间。

**享元对象**

```java
public class Person {
    private String id = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Person(String _id){
        this.id = _id;
    }
}
```

**享元工厂**

```java
import java.util.HashMap;

public class PersonFlyWeightFactory {
    private static HashMap<String,Person> persons = new HashMap<String, Person>();

    public static Person getPerson(String id){
        Person p = persons.get(id);
        if(p == null) {
            p = new Person(id);
            persons.put(id, p);
        }
        return p;
    }
}

```

**测试1**

```java
public class FlyWeightMain {
    public static void main(String[] args) {
        Person p1 = new Person("p1");
        Person p2 = new Person("p1");
        System.out.println("p1==p2:" + (p1==p2));
        Person p3 = PersonFlyWeightFactory.getPerson("p3");
        Person p4 = PersonFlyWeightFactory.getPerson("p3");
        System.out.println("p3==p4:" + (p3==p4));
    }
}

```

**结果**

```
p1==p2:false
p3==p4:true
```
从上面的结果中我们可以看出，使用享元工厂获得的p3并没有新建对象。

**测试2**

```java
long begin = System.currentTimeMillis();
for(long i=0; i < 1000000; i++){
    Person p5 = PersonFlyWeightFactory.getPerson("p4");
}
long end = System.currentTimeMillis();
System.out.println(end - begin);

long begin1 = System.currentTimeMillis();
for(long i=0; i < 1000000; i++){
    Person p5 = new Person("p");
}
long end1 = System.currentTimeMillis();
System.out.println(end1 - begin1);
```
**结果2**

```
15
2
```
但是我们在`Person`的构造函数中加入`new Thread()`:

```java
public Person(String _id){
    new Thread();
    this.id = _id;
}
```
最终的输出结果将如下：

```
14
1008
```

从以上结果我们可以看出使用享元模式，我们的内存对象是减少了重复创建，
但是由于对象创建的耗时相对享元工厂获取对象的耗时小的多，使得我们最终的执行效率反倒下降。
只有当对象在创建时耗时较大时，享元模式才能更好的发挥作用。

---

享元模式的主要应用场景是：当某个业务对象，创建对象比较耗时，可以使用享元模式来提升对象创建速度。同时也节省了内存的开销。
当然，如果创建并不耗时的对象使用享元模式的话，由于每次获取对象都要通过一系列相对原来复杂的操作，这会使得执行效率下降。
