---
layout: post
title: 使用filter_parameter_logging过滤敏感日志
description: 在rails的日志打印中，我们经常需要对信息进行日志打印过滤，如密码一类的信息。
date: 2015-03-31 08:35
keywords: [filter_parameter_logging,过滤后的日志,Rails,密码过滤]
category: [Rails]
---

在rails的日志打印中，我们经常需要对信息进行日志打印过滤，如密码一类的信息。

下面是正常的日志输出:

```ruby
Processing UsersController#create (for 127.0.0.1 at 2009-01-02 10:13:13) [POST]
Parameters: {"user"=>{"name"=>"eifion", "password_confirmation"=>"secret", "password"=>"secret"}, "commit"=>"Register", "authenticity_token"=>"9efc03bcc37191d8a6dc3676e2e7890ecdfda0b5"}
User Create (0.5ms)   INSERT INTO "users" ("name", "updated_at", "password_confirmation", "password", "created_at") VALUES('eifion', '2009-01-02 10:13:13', 'secret', 'secret', '2009-01-02 10:13:13')
```

当我们对`password`做日志过滤后：

```ruby
class ApplicationController < ActionController::Base
  filter_parameter_logging "password" 
end
```
过滤后的日志:

```ruby
Processing UsersController#create (for 127.0.0.1 at 2009-01-02 11:02:33) [POST]
  Parameters: {"user"=>{"name"=>"susan", "password_confirmation"=>"[FILTERED]", "password"=>"[FILTERED]"}, "commit"=>"Register", "action"=>"create",
  "authenticity_token"=>"9efc03bcc37191d8a6dc3676e2e7890ecdfda0b5", "controller"=>"users"}
    User Create (0.4ms)   INSERT INTO "users" ("name", "updated_at", "password_confirmation", "password", "created_at") VALUES('susan', '2009-01-02 11:02:33', 'verysecret', 'verysecret', '2009-01-02
    11:02:33')
```

