---
sidebar_position: 2
---

# 介绍

## 什么是虚拟专用网络

互联网上存在大量自称 VPN (虚拟专用网络)的代理工具,严格意义上来说这些工具应该被称为 Proxy (代理).
两者的区别是: VPN 可以让虚拟网络中的设备相互访问; Proxy 则是把一台设备作为跳板访问另一台设备.

典型的 VPN 有 OpenVPN 和 IPSec, 以及进入 Linux 内核的 WireGuard.
典型的 Proxy 有 Socks5, Shadowsocks, V2Ray.

这个项目能且仅能帮你完成多台设备间组网.

## 为什么再实现一款虚拟专用网络工具

上面提到许多经典的 VPN, 它们已经能满足用户的绝大多数场景.
但是它们协议特征明显,在国内特殊的网络环境下,这成了缺陷,防火墙可以轻易的识别并阻断流量.
我曾是 WireGuard 用户,在防火墙的干扰下,我与网络里的其他设备失去了连接.
因此需要用设计代理的思路来设计 VPN, 让 VPN 有一定的抗防火墙的能力.

## 整体设计思路

设计的宗旨是简洁.在不牺牲性能和核心功能的情况下,用最少的代码量和最简单的概念完成设计.

### 降低配置复杂度

WireGuard 在 VPN 里配置已经相对较简单了,但对我来说依旧过于复杂.回忆一下你用多长时间完成的第一次 WireGuard 组网.
WireGuard 需要强制指定虚拟地址,不适用于想要灵活接入多个客户端并动态分配地址的场景.

用 WSS(Web Socket Secure) 处理通信,在保证链路数据安全的情况下,免去了配置公私钥的过程.
用口令校验客户端,可以轻松的让新客户端加入网络,这样就能由服务端实现地址动态分配.

### 高效的断线重连

在某些情况下 WireGuard 会断线,只有重启客户端才能解决.此时对于一个无人值守的设备,就意味着彻底失联.
曾经为了解决这个问题,给设备配置每天重启一次,这显然是一种很丑陋的解决方案.

使用 WSS 通信,就可以用 Ping/Pong 完成 TCP 保活,即使 TCP 连接异常断开,应用也可以及时发现,迅速处理.

### 支持内网穿透的对等连接

虽然 WireGuard 支持对等连接,但要求设备之间能够直接访问,对于双方都在 NAT 后面的情况无能为力.
增加内网穿透功能,可以节约服务端转发的流量,同时还能降低通信延迟.

内网穿透通过 STUN 服务器获取本地 UDP Socket 被映射后的公网地址和端口,通过服务端与其他客户端交换地址和端口信息,并尝试建立连接.

### 高速的客户端中继

有时候两个客户端之间无法直连,但它们都能与另一个客户端直连.此时可以以这个客户端作为中继相互访问.

这实际上是[路由](https://zh.wikipedia.org/wiki/路由)的问题.本项目实现的是距离向量算法.

### 软件定义广域网

在网关上部署 Candy 客户端,通过配置系统路由让多地的局域网组建成一个广域网.
