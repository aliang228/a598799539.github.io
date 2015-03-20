---
layout: post
title: Ruby面试题
description: "the ruby interview question, ruby面试题"
keyword: [ruby,interview,question,面试题]
date: 2015-03-20 15:52
category: "Jobs"
---

下面是对[Rails Interview Questions](https://github.com/afeld/rails_interview_questions)中的
`Ruby`部分的解答:

### 1 What's the difference between a lambda, a block and a proc?
#### （1）Blocks与Procs的不同点
- Procs是对象Object，但Block并不是一个对象，它只是一个代码段
- 每个方法至多只能传递一个代码段，但可以传递多个`Proc`


