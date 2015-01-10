---
layout: post
title:   java.text.ParseException: Unparseable date -> 英语日期的转换
description: 使用SimpleDateFormat进行日期格式化，对一个英语简写格式
的日期进行转换，总是会报unparse date异常。
keywords: [Unparseable date, 英语日期, MMM,SimpleDateFormat,parse]
date:   2015-01-11 00:27:00
category: "java"
---

### 背景
需要将日期字符串“Dec 2014”转换成日期。

### 版本一
{% highlight java %}
import java.util.*;
import java.io.*;
import java.text.*;

public class Main
{
    public static void main(String[] args) throws ParseException {
        DateFormat format = new SimpleDateFormat("MMM yyyy");
        format.setLenient(true);
        Date date = format.parse("Jul 2014");
        System.out.println(date);
    }
}

{% endhighlight %}
编译执行后产生异常:
> Exception in thread "main" java.text.ParseException: Unparseable date: "Jul/2014"
    at java.text.DateFormat.parse(DateFormat.java:357)
    at Main.main(Main.java:10)

### 修改版
发现这个问题后在网络上搜索，发现对SimpleDateFormat的用法基本与上面一致。一直找不到
为什么我会产生异常。后来在
[stackoverflow](http://stackoverflow.com/questions/19861642/date-format-parse-exception-eee-mmm-dd-hhmmss-z-yyyy)上找到答案,
在创建format时应该设定Locale.

{% highlight java %}
//仅修改第8行
DateFormat format = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
{% endhighlight%}
