---
layout: post
title: 使用with_scope扩展查询
description: 使用with_scope扩展查询
keyword: [with_scope, rails, ruby, find]
date: 2015-03-20 14:10
category: "Rails"
---

[上一篇](Move-Find-into-Model.html)我们讲到将常用的find查询写入model中，
但是那样写还存在一个问题，就是我们在外部调用的时候不支持扩展，比如:

```ruby
@tasks = Task.find_incomplete(limit: 20)
```

下面我们给出通过`with_scope`的方式使方法接受这样的扩展查询:

```ruby
def self.find_incomplete options={}
  with_scope :find => options do 
    find_all_by_complete(false, order: 'created_at DESC')
  end
end
```
