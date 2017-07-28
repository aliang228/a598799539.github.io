---
layout: post
title: Apache HttpCore in Action
description: Apache HttpCore官方教程笔记
keywords: [Apache, HttpCore,Java,Apache HttpCore in Action]
date: 2017-07-27 19:30:00
category: "Java"
tags:
  - Apache
  - HttpCore
  - Java
---


## 1 HttpCore是什么？
HttpCore是对HTTP协议的基础封装的一套组件。

- 可以用它来建立客户端、代理、服务端Http服务
- 支持同步异步服务
- 一系列基于阻塞和非阻塞IO模型

## 2 HTTP消息简析

一个HTTP消息包含Header和可选的Body.
- 请求头(Request Header)由一个请求行和一系列的头字段组成。
- 响应头(Response Header)由一个状态行和一系列的头字段组成。
- HTTP消息必须包含HTTP版本。

### 几个基本操作：

```java
// GET / HTTP/1.1   # 请求
HttpRequest request = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1)

// HTTP/1.1 200 OK  # 响应
HttpResponse response = new BasicHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SC_OK, "OK");
```

### HTTP消息实体

HttpCore根据内容来源分成三种实体:
- streamed, 从流中接收，来自连接，不可重复读。
- self-contained, 存储于内存中独立于连接，可重复读。 如： `ByteArrayEntity`、 `StringEntity`.
- wrapping, 从另外一个消息实体获得。

HttpCore Http Entity的一些Java实现： `BasicHttpEntity`、`ByteArrayEntity`、`StringEntity`、 `InputStreamEntity`、`FileEntity`、`HttpEntityWrapper`、`BufferedHttpEntity`

Http协议处理：
`RequestContent`、`ResponseContent`、`RequestConnControl`、`ResponseConnControl`、`RequestDate`、`ResponseDate`、`RequestExpectContinue`、`RequestTargetHost`、`RequestUserAgent`、`ResponseServer`

## 3 阻塞I/O模型
由于建立一个连接的过程十分复杂，HttpCore并没有提供对http开放连接的全部支持。

### 中断Http连接：
```java
HttpConnection#close();  //线程非安全
HttpConnection#shutdown() //线程安全
```

### HTTP/1.1定义的三种内容传输机制：

- Content-Length delimited 内容长度区间， 最大长度Long#MAX_VALUE
- Identity coding          仅能用于服务器端，末尾有结束标志，最大长度无限制
- Chunk coding             块传输。最大长度无限制


### HttpService:
```java
HttpProcessor processor = HttpProcessorBuilder.create().add(new ResponseDate())
                            .add(new ResponseServer("My Response Server 1.1"))
                            .add(new ResponseContent())
                            .add(new ResponseConnControl())
                            .build();
HttpService service = new HttpService(processor, null);
```

### HttpRequestHandler and UriHttpRequestHandlerMapper:
```java
HttpRequestHandler handler = new HttpRequestHandler() {
    public void handle(HttpRequest request, HttpResponse response, HttpContext context) throws HttpException, IOException {
        response.setStatusCode(HttpStatus.SC_OK);
        response.setEntity(new StringEntity("some text", ContentType.TEXT_PLAIN));
    }
};

UriHttpRequestHandlerMapper handlerMapper = new UriHttpRequestHandlerMapper();
handlerMapper.register("/service/*", handler);
HttpProcessor processor = HttpProcessorBuilder.create().add(new ResponseDate())
        .add(new ResponseServer("My Response Server 1.1"))
        .add(new ResponseContent())
        .add(new ResponseConnControl())
        .build();
HttpService httpService = new HttpService(processor, handlerMapper);
```
### 连接池(Connection Pool)
连接池可以用来提高连接的持久化重用效率。
连接池默认仅允许总共20个并发连接，并且只能两个并发连接每个路由(HTTP标准限制)

以下是连接池设置方法：
```java
HttpHost target = new HttpHost("localhost");
BasicConnPool connpool = new BasicConnPool();
connpool.setMaxTotal(200);
connpool.setDefaultMaxPerRoute(10);
connpool.setMaxPerRoute(target, 20);
Future<BasicPoolEntry> future = connpool.lease(target, null);
BasicPoolEntry poolEntry = future.get();
HttpClientConnection conn = poolEntry.getConnection();
```

### TLS/SSL支持
```java
SSLContext sslcontext = SSLContexts.createSystemDefault();
SocketFactory sf = sslcontext.getSocketFactory();
SSLSocket socket = (SSLSocket) sf.createSocket("somehost", 443);
// Enforce TLS and disable SSL
socket.setEnabledProtocols(new String[] {
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2" });
// Enforce strong ciphers
socket.setEnabledCipherSuites(new String[] {
        "TLS_RSA_WITH_AES_256_CBC_SHA",
        "TLS_DHE_RSA_WITH_AES_256_CBC_SHA",
        "TLS_DHE_DSS_WITH_AES_256_CBC_SHA" });
DefaultBHttpClientConnection conn = new DefaultBHttpClientConnection(8 * 1204);
conn.bind(socket);
```


## 4 基于NIO的异步IO模型
异步IO适合大规模、高负载的场景。

### I/O reactor
HttpCore NIO基于reactor模式。

I/O reactor的用途是对I/O事件作出反应，并将事件通知发送给单个I/O会话。

I/O reactor通常使用少量的dispatch线程(建议每个CPU核心一个)来分派I/O事件通知到大规模的I/O会话或连接。

### I/O reactor 配置
```java
IOReactorConfig config = IOReactorConfig.custom()
                                        .setTcpNoDelay(true)
                                        .setSoTimeout(5000)
                                        .setSoReuseAddress(true)
                                        .setConnectTimeout(5000).build();
IOReactor ioreactor = new DefaultListeningIOReactor(config);
```

###  I/O reactor异常处理
```java
DefaultConnectingIOReactor ioreactor = <...>
ioreactor.setExceptionHandler(new IOReactorExceptionHandler() {
    public boolean handle(IOException ex) {
        if (ex instanceof BindException) {
            // bind failures considered OK to ignore
            return true;
        }
        return false;
    }
    public boolean handle(RuntimeException ex) {
        if (ex instanceof UnsupportedOperationException) {
            // Unsupported operations considered OK to ignore
            return true;
        }
        return false;
    }
});
```

### 非阻塞Http连接
```java
NHttpConnection conn = <...>
HttpRequest request = conn.getHttpRequest();
if (request != null) {
    System.out.println("Transferring request: " +
            request.getRequestLine());
}
HttpResponse response = conn.getHttpResponse();
if (response != null) {
    System.out.println("Transferring response: " +
            response.getStatusLine());
}
```

### Http IO事件分发
- NHttpClientEventHandler 
- NHttpServerEventHandler

### 非阻塞HTTP content producers
NByteArrayEntity、NStringEntity、NFileEntity、

### 非阻塞HTTP协议handler
```java
HttpAsyncRequestHandler<HttpRequest> rh = new HttpAsyncRequestHandler<HttpRequest>() {
    public HttpAsyncRequestConsumer<HttpRequest> processRequest(
            final HttpRequest request,
            final HttpContext context) {
        // Buffer request content in memory for simplicity
        return new BasicAsyncRequestConsumer();
    }
    public void handle(
            final HttpRequest request,
            final HttpAsyncExchange httpexchange,
            final HttpContext context) throws HttpException, IOException {
        HttpResponse response = httpexchange.getResponse();
        response.setStatusCode(HttpStatus.SC_OK);
        NFileEntity body = new NFileEntity(new File("static.html"),
                ContentType.create("text/html", Consts.UTF_8));
        response.setEntity(body);
        httpexchange.submitResponse(new BasicAsyncResponseProducer(response));
    }
};
```

### 非阻塞连接池
```java
HttpHost target = new HttpHost("localhost");
ConnectingIOReactor ioreactor = <...>
BasicNIOConnPool connpool = new BasicNIOConnPool(ioreactor);
connpool.lease(target, null,
        10, TimeUnit.SECONDS,
        new FutureCallback<BasicNIOPoolEntry>() {
            @Override
            public void completed(BasicNIOPoolEntry entry) {
                NHttpClientConnection conn = entry.getConnection();
                System.out.println("Connection successfully leased");
                // Update connection context and request output
                conn.requestOutput();
            }
            @Override
            public void failed(Exception ex) {
                System.out.println("Connection request failed");
                ex.printStackTrace();
            }
            @Override
            public void cancelled() {
            }
        });
```

### 非阻塞TLS/SSL
```java
SSLContext sslcontext = SSLContexts.createDefault();
// Plain I/O session
IOSession iosession = <...>
SSLSetupHandler mysslhandler = new SSLSetupHandler() {
    public void initalize(final SSLEngine sslengine) throws SSLException {
        // Enforce TLS and disable SSL
        sslengine.setEnabledProtocols(new String[] {
                "TLSv1",
                "TLSv1.1",
                "TLSv1.2" });
    }
    public void verify(
            final IOSession iosession, final SSLSession sslsession) throws SSLException {
    }
};
SSLNHttpClientConnectionFactory connfactory = new SSLNHttpClientConnectionFactory(
        sslcontext, mysslhandler, ConnectionConfig.DEFAULT);
NHttpClientConnection conn = connfactory.createConnection(iosession);
```

## 5 官方demo github拷贝
[地址](https://github.com/a598799539/http_core_example.git)