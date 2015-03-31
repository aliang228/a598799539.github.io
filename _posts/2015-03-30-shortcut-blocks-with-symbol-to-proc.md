---
layout: post
title: "Rails to_proc(`&`)"
description: the Symbol#to_proc feature Rails adds allows you to do simple blocks very quickly and easily
keyword: [to_proc, rails, ruby]
date: 2015-03-30 08:01
category: "Rails"
---

Rails中有一个很棒的特性:`使用&进行块转换`，他可以让我们方便快速的写出块。

```ruby
projects.collect { |p| p.name }
```
等价于

```ruby
projects.collect(&:name)
```

有了块转换，我们就方便了许多

```ruby
projects.collect(&:nmae).collect(&:upcase)
```
