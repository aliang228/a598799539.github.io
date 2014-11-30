---
layout: post
title: 在ubuntu上搭建一个自己的免费vpn
description: ubuntu上搭建vpn，介绍完整搭建过程。
keywords: [ubuntu,vpn,免费vpn]
date:   2014-11-30 21:24
category: "tools"
---

在我们的日常工作和生活中经常会需要用到VPN来访问一些国外网站，
之前我一直在使用[vcupboss](www.vcupboss.com)的vpn，买了1G，只是在访问
google的时候用下，现在也只用了几百兆。由于最近买了一个美国服务器，79/
月，所以干脆就尝试自己搭建一个vpn。这样的话就不用受流量的限制了。

下面是一些基本的安装步骤:

### 0 大前提 ###
- 一台国外服务器，美国、香港云主机都可。
- SSH工具:我的是fedora系统所以直接使用ssh，windows推荐使用securecrt

### 1 登入远程服务器，在root权限下操作 ###
以下命令都是在执行`su`获取root权限后的操作，你也可以直接都在前面加上
`sudo`

### 2、安装PPTPD

{% highlight bash %}
apt-get install pptpd
{% endhighlight %}

### 3、编辑pptpd.conf文件，设置服务器ip和远程客户端ip

使用vim打开*pptpd.conf*文件(`vi /etc/pptpd.conf`)
取消注释下面内容:
{% highlight bash %}
option /etc/ppp/pptpd-options
localip 192.168.0.1
remoteip 192.168.0.234-238,192.168.0.245
{% endhighlight %}


### 4、添加登陆账户

修改/etc/ppp/chap-secrets文件(`vi /etc/ppp/chap-secrets`),添加一行用户
设置：

{% highlight bash  %}
### 用户名 pptpd "密码" *
username pptpd password *
{% endhighlight %}

> 每个字段间直接用一个空格或tab隔开。
星号(*)代表允许接入的ip可以是任意ip。


**为了使服务器可以跳出局域网，所以我们还需要配置转发。**


### 5、设置DNS解析

编辑pptpd-options文件(`vi /etc/ppp/pptpd-options`)
找到ms-dns，取消掉注释，并修改DNS地址为8.8.8.8 和 8.8.4.4

### 6、开启转发
编辑/etc/sysctl.conf(`vi /etc/sysctl.conf`),
通过取消注释以下内容来打开内和ip转发:

`net.ipv4.ip_forward=1`

### 7、安装iptables并设置自动加载规则
安装iptables:

    apt-get install iptables

使系统支持NAT:

    iptables -t nat -I POSTROUTING -j MASQUERADE
    iptables -I FORWARD -p tcp --syn -i ppp+ -j TCPMSS --set-mss 1356


为了能够将我们之前更改的iptables 的规则保存下来并总是生效，还需要执行以下操作：

- 使用iptables-save保存规则：`iptables-save > /etc/iptables-rules`
- 修改*/etc/network/interfaces* 文件，找到 eth0 部分，在eth0设置最末尾
加上下面这句：`pre-up iptables-restore < /etc/iptables-rules` 
这样当网卡 eth0 被加载的时候就会自动载入我们预先用iptables-save 保存下的配置。

### 8、重新启动服务
    /etc/init.d/pptpd restart

### 9、安装完成
至此，vpn安装完成。你只需在你需要访问外网的机器上(PC，手机),设置vpn连
接，使用PPTP协议即可。畅快的上网吧！！
