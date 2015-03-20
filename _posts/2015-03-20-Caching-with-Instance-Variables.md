---
layout: post
title: 使用实例变量进行cache
description: 使用实例变量进行cache
keywords: [Rails, Railscast, Instance Variliables, Cache]
date: 2015-03-20 09:27:00
category: "Rails"
---

```ruby
class ApplicationController < ActionController::Base
  def current_user
    User.find(session[:user_id])
  end
end
```

以上代码`User.find(session[:user_id])`在每次`current_user`被调用都将会执行一次查询。
如果改成如下将可以避免这个问题。

```ruby
@current_user ||= User.find(sessions[:user_id])
```
