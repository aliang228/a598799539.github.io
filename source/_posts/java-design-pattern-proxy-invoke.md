---
layout: post
title: "[Java性能优化]04 动态代理实现"
description: 代理模式之动态代理，使用JDK动态代理简化简单代理。
keywords: [代理模式, Proxy, Java, JDK,invoke, newProxyInstance]
date:   2015-06-07  11:34:00
category: "java"
tags:
  - 动态代理
---

在[上一篇文章](/java/2015/06/06/java-design-pattern-proxy.html)中,我们讲到了简单的代理模式实现。
但是同时也产生了一个问题：假如我们需要代理的真实类中有很多方法，那么我们就要仿照真实类覆盖实现
所有的方法。这使得我们的代码就有很多重复。但是我们可以使用简单的JDK动态代理的方式来实现。

首先，假设我们的`IDBQuery`有如下实现：

```java
public interface IDBQuery {
    public String query();
    public String getName();
    public int getAge();
    public String getData();
}
```

然后在`DBQuery`中进行实现和打出简单的说明：

```java
public class DBQuery implements IDBQuery  {

    public DBQuery(){
        //start db connect
        try {
            Thread.sleep(1000);
            System.out.println("start db connect...");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String query() {
        System.out.println("begin query...");
        return "begin query...";
    }

    @Override
    public String getName() {
        System.out.println("getName()...");
        return null;
    }

    @Override
    public int getAge() {
        System.out.println("getAge()");
        return 0;
    }

    @Override
    public String getData() {
        System.out.println("getData()");
        return null;
    }
}
```

接下来我们创建`DBQuery`的`InvocationHandler`:

```java
public class InvocationDBQueryHandler implements InvocationHandler {

    private DBQuery dbQuery = null;

    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        if(dbQuery == null){
            dbQuery = new DBQuery(); //如果第一次被调用才生成真实对象
        }
        String methodName = method.getName();
        System.out.println("called method name:" + methodName);
        return method.invoke(dbQuery, args);//转调真实方法
    }

    public static IDBQuery createJdkDBQuery(){
        IDBQuery idbq = (IDBQuery) Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(),
                new Class[]{IDBQuery.class}, new InvocationDBQueryHandler());
        return idbq;
    }
}
```

以下是测试：

```java
IDBQuery jdkIdbq = InvocationDBQueryHandler.createJdkDBQuery();
System.out.println("after create jdkDBQuery");
jdkIdbq.query();
jdkIdbq.getAge();
jdkIdbq.getName();
jdkIdbq.getData();
```
得到如下输出结果：

```
after create jdkDBQuery
start db connect...
called method name:query
begin query...
called method name:getAge
getAge()
called method name:getName
getName()...
called method name:getData
getData()
```
从结果可以看出：
就像上一篇的`DBQueryProxy`一样，我们仅在`query`方法或其他方法被调用时才初始化`DBQuery`。

这种动态代理的方法简单快速的实现了我们需要延迟加载`DBQuery`的需求。其实动态代理的常用场景是日志记录和
业务分离，例如Spring Framework中的AOP。使用动态代理我们可以在被调用方法的前后执行我们需要的操作。
