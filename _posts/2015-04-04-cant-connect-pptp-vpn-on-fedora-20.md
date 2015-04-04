---
layout: post
title: Fedora 20 连不上PPTP VPN
description: 刚安装了Fedora 20系统，想连接自己搭建的vpn，发现总是连接
不上。终于找到解决办法。
date: 2015-04-04 08:49
keywords: [Fedora,PPTP,VPN,连接不上]
category: [Fedora]
---

刚安装了Fedora 20系统，想连接自己搭建的vpn，发现总是连接
不上。终于找到解决办法。

原因很简单: 

**因为没有关闭防火墙:(**

以下是关闭防火墙的方法：

service 方式

开启：`service iptables start`

关闭： `service iptables stop`


iptables方式


查看防火墙状态：

`/etc/init.d/iptables status`


暂时关闭防火墙：

`/etc/init.d/iptables stop`

重启iptables:

`/etc/init.d/iptables restart`

关闭之后只需要通过设置中添加PPTP的VPN连接即可。
