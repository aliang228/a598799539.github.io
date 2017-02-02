---
layout: post
title: Find联合查询
description: 使用find联合多个model进行查询
keywords: [find_by, association, rails, 联合查询]
date: 2015-03-20 11:24
category: "Rails"
tags:
  - rails
  - 联合查询
---

```ruby
class Project < ActiveRecord::Base
  has_many :tasks
end

class Task < ActiveRecord:Base
  belongs_to :project
end

## 查找某一个项目下的未完成任务, 按时间逆序排序
@project = Project.find(param[:id])
@task = @project.tasks.find_by_complete(false, order: "created_at DESC")
```

