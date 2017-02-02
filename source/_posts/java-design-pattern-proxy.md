---
layout: post
title: "[Java性能优化]03 代理模式"
description: 代理模式的简单介绍和Java实现。
keywords: [代理模式, Proxy, Java]
date:   2015-06-06  22:33:00
category: "java"
---

### 1 简单介绍
代理模式中，我们使用代理对象完成用户请求，屏蔽用户对真实对象的访问。当然，如果真实对象
在对象创建时就要加载很多东西，我们也可以通过代理对象实现延迟加载。

代理模式主要包含主题接口类、接口实现真实类（被代理类）、代理类、应用类。

### 2 主题接口类
```java
public interface IDBQuery {
    public String query();
}
```
### 3 真实类
```java
public class DBQuery implements IDBQuery  {

    public DBQuery(){
        //start db connect
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public String query() {
        return "begin query...";
    }
    
}

```

### 4 代理类
```java
public class DBQueryProxy implements IDBQuery {
    private DBQuery dbQuery = null;

    @Override
    public String query() {
        if(dbQuery == null){
            dbQuery = new DBQuery();
        }
        return dbQuery.query();
    }
}
```

### 5 应用Main
```java
public class Main {
    public static void main(String[] args) {
        IDBQuery idbq = new DBQueryProxy();
        idbq.query();
    }
}
```
