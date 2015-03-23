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

#### （2）Proc和Lambda的异同

```ruby
proc = Proc.new {puts "hello world"}
lambda = lambda {puts "hello world"}

proc.class  # rerturn 'Proc'
lambda.class # return 'Proc'
```
从上面可以看出，其实Proc和lambda都是`Proc`对象。

- `lambda`会检查参数数量而`proc`则不会

```ruby
lam = lambda { |x| puts x}
lam.call(2)  # print 2
lam.call  # ArgumentError: wrong number of arguments (0 for 1)
lam.call(1,2) # ArgumentError: wrong number of arguments (2 for 1)

pro = Proc.new {|x| puts x}
proc.call(2)  # print 2
proc.call    # return nil
proc.call(1,2) # print 1
```

- `lambda`和`proc`对'return'关键字的含义不一样,而且`proc`的`return`只能在方法体中调用

```ruby
def lambda_test
  lam = lambda { return }
  lam.call
  puts "hello"
end

lambda_test   # puts 'hello'

def proc_test
  pro = Proc.new {return}
  proc.call
  puts 'hello'
end

proc_test  # return nil  不打印hello
```
### 2 How do you sort an Array of objects by paticular attributes? What is better way to do sorting with ActiveRecord?
首先我们来回答第一问：怎么通过某个字段来对对象数组排序？  
假设我们有一个对象数组`@users`，我们需要让他对字段`name`排序，则我们可以：

```ruby
@users.sort!{|a,b| a.name <=> b.name}
```
如果是在`ActiveRecord`中，则我们只需：

```ruby
@users = @users.order(:name)
```

### 3 What are some of your favorite gems? What are their alternatives?
下面列举我喜欢的几个常用的gems及它的可替代备选方案

- `Rails`基于MVC设计模式的高效Web开发框架。备选方案:`Sinatra`:轻量级的web开发选择
- `jquery-rails`:jQuery for rails. 
- `haml-rails`:简化view层的编写，少了麻烦重复的标签。可替代:`erb-rails`
- `devise`:用户认证插件。
- `rspec-rails`:test
- `seed-fu`: 数据初始化
- `faraday`: http请求与html内容解析

### 4 In Ruby, which is generally the better option: a recursive function or an iterative one?


### 参考文档
- [1][What Is the Difference Between a Block, a Proc, and a Lambda in Ruby?](http://awaxman11.github.io/blog/2013/08/05/what-is-the-difference-between-a-block/)
- [2] 
