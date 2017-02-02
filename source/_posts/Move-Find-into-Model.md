---
layout: post
title: 把常用的find写入model
description: 对于一些常用的find查询我们应该写入model中，以降低重复工作和方便以后维护修改
keywords: [find,rails,model,move]
date: 2015-03-20 13:46
category: "Rails"
tags:
  - Rails
---

对于一些比较常用的find查询，我们应该写入model中，以降低重复工作和方便日后维护修改。


```ruby
class Task < ActiveRecord::Base
  belongs_to :project

  def self.find_incomplete
    find_all_by_complete(:false, order: "created_at DESC")
  end
```
那么我们在`controller`中就可以直接这么用:

```ruby
@tasks = Task.find_incomplete
```

