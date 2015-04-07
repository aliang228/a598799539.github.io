---
layout: post
title: Model虚拟字段
description: 经常我们会用到一些有数据库中多个字段组合而成的信息，如姓名（姓+名），地址（省+市+区+街道）.
date: 2015-04-07 08:45
keywords: [model,虚拟字段,rails,virtual attributes]
category: "Rails"
---

经常我们会用到一些有数据库中多个字段组合而成的信息，如姓名（姓+    名），地址（省+市+区+街道）.

```ruby
class User < ActiveRecord::Base
  # Getter
  def full_name
    [first_name, last_name].join(' ')
  end

  # Setter
  def full_name=(name)
    split = name.split(' ', 2)
    self.first_name = split.first
    self.last_name = split.last
  end
end

```


