---
layout: post
title: 动态find_by方法
description: 使用find_by进行多条件动态查询
keywords: [Rails, find_by, ruby]
date: 2015-03-20 10:21
category: "Rails"
---

以下是两个**find**方法，我们可以把它改成**find_by**形式。
{% highlight ruby %}
@tasks = Task.find(:all, :conditions => ['complete = ?', false])

@tasks = Task.find(:first, :conditions => ['complete = ?', false], :order => 'created_at DESC')
{% endhighlight %}
对应的`find_by`形式为:
{% highlight ruby%}
@task = Task.find_all_by_complete(false)

@task = Task.find_by_complete(false, :order => "created_at DESC")
{% endhighlight %}
