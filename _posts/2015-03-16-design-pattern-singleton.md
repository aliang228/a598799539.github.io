---
layout: post
title: [Java性能优化]02 单例模式
description: 单例模式，单例模式的几个特点,单例模式的几种写法
keywords: [java,性能，单例模式，饿汉式，懒汉式，双重校验，静态内部类，枚举]
date:   2015-03-16 22:15
category: "java"
---

设计模式是前人工作的总结和提炼，是对某一特定问题的成熟解决方案。

## 1 单例模式的几个特点
- 最为普遍的模式之一
- 一种对象创建模式，用于产生一个对象的具体实例，确保系统中一个类只产生一个实例

## 2 饿汉式(线程不安全)
```java
public class Singleton {  
    private static Singleton instance;  
    private Singleton (){}  
  
    public static Singleton getInstance() {  
        if (instance == null) {  
            instance = new Singleton();  
        }  
        return instance;  
    }  
} 
```
显然上面这种lazy loading的方法， 当在多线程条件下将会产生多个实例。

## 3 饿汉式(线程安全)
```java
public class Singleton {  
    private static Singleton instance = null;  
    private Singleton (){}  
  
    public static synchronized Singleton getInstance() {  
        if (instance == null) {
            instance = new Singleton();
        }  
        return instance;
    }  
} 
```
虽然这是线程安全的，但是不仅创建的时候会同步，甚至每次读取的时候都必须同步。
这样严重影响程序的运行效率。

## 4 双重校验
为了避免在创建之后还是同步，我们引入双重校验
```java
public class Singleton{
	private volatile static Singleton instance = null;
	private Singleton(){}

	public static Singleton getInstance(){
		if(instance == null){
			synchronized(Singleton.class){
				if(instance == null){
					instance = new Singleton();
				}
			}
		}
	}
}
```
由于`instance = new Singleton();`不是一个原子操作，需要把instance声明成`volatile`

## 5 饿汉式
```java
public class Singleton {  
    private static Singleton instance = new Singleton();  
    private Singleton (){}  
    public static Singleton getInstance() {  
        return instance;  
    }
}
```
 这种方式基于classloader机制避免了多线程的同步问题，不过，instance在类装载时就实例化，
 虽然导致类装载的原因有很多种，在单例模式中大多数都是调用getInstance方法，但是如果类中包含
 其他静态方法被调用将导致类装载。

## 6 静态内部类
```java
public class Singleton {  
    private static class SingletonHolder {  
        private static final Singleton INSTANCE = new Singleton();  
    }
    private Singleton (){}  
    public static final Singleton getInstance() {  
        return SingletonHolder.INSTANCE;  
    }
}  
```
上面这种方式，使用JVM本身机制保证了线程安全问题；由于 SingletonHolder 是私有的，除了 getInstance() 之外没有办法访问它，因此它只有在getInstance()被调用时才会真正创建；同时读取实例的时候不会进行同步，没有性能缺陷；也不依赖 JDK 版本。

## 7 枚举
```java
public enum Singleton {  
    INSTANCE;  
}  
```
默认枚举实例的创建是线程安全的，所以不需要担心线程安全的问题。是不是有点简单了？下面来点详细代码：
```java
public enum Singleton {

    INSTANCE;

    private String name;

    public void doSomeThing() {
        System.out.println(name + " is doing something now...");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

public class Test{
    @Test
    public void testSingleton() {

        Boss b1 = Boss.INSTANCE;
        b1.setName("张三");
        b1.doSomeThing();//张三 is doing something now...

        Boss b2 = Boss.INSTANCE;
        b2.doSomeThing();//张三 is doing something now...

        System.out.println(b1.equals(b2));//true

    }
}
```
从上面可以看出`b1`和`b2`是同一个实例，而且这种方式绝对防止反射调用私有构造器来破坏单例。

## 参考：

- [1]  [深入浅出单实例Singleton设计模式](http://blog.csdn.net/haoel/article/details/4028232)
- [2]  [单例模式的七种写法](http://cantellow.iteye.com/blog/838473)
- [3]  [单例(Singleton)的枚举(enum)实现](http://www.cnblogs.com/yjmyzz/p/4282067.html)
- [4]  [Java性能优化2.1.1]()