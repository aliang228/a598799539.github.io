---
layout: post
title: "[Java性能优化]06 装饰者模式"
description: 装饰者模式充分利用委托机制，降低耦合，构建一个“超级对象”，使其拥有组件的各种功能。
keywords: [装饰者模式,Decorator, Java]
date:   2015-06-21  16:18:00
category: "java"
---

装饰者模式拥有一种非常巧妙的结构，它可以动态添加对象功能。
它使用委托机制，降低代码的耦合性，复用系统中的各个组件，使得我们最终构造的对象具有这些所有功能。

装饰者模式可以有效的分离性能组件和功能组件，从而提升模块的可维护性并增加模块的复用性。

装饰者(`Decorator`)和被装饰者(`ConcreteComponent`)拥有相同的接口`Component`。
被装饰者通常是系统的核心组件，完成特定的功能目标。而装饰者则可以在被装饰者的方法前后加上特定的前置处理或者后置处理，
增强被装饰者功能。

下面举例说明：

需求：我们需要将一个内容以HTML的方式发布。

- 需要将内容转换成HTML文本
- 增加HTML头
- 增加HTTP头

首先，我们定义一个组件接口，它的主要功能就是对内容进行处理。

```Java
public interface IPacketCreator {
    public String handleContent();
}
```

`PacketCreator`用于返回数据包的核心数据：

```Java
public class PacketBodyCreator implements IPacketCreator {

    @Override
    public String handleContent() {
        return "Content of Body";
    }
}
```

`PacketDecorator`对组件进行维护， 它并不实现业务逻辑，仅仅给子类提供一个委托对象。

```Java
public abstract class PacketDecorator implements IPacketCreator {
    IPacketCreator component;

    public PacketDecorator(IPacketCreator creator) {
        this.component = creator;
    }
}
```

下面是具体组件的实现：

```Java
public class PacketHtmlHeaderCreator extends PacketDecorator {

    public PacketHtmlHeaderCreator(IPacketCreator creator) {
        super(creator);
    }

    @Override
    public String handleContent() {
        StringBuilder sb = new StringBuilder();
        sb.append("<html>");
        sb.append("<body>");
        sb.append(component.handleContent());
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }
}


public class PacketHTTPHeaderCreator extends PacketDecorator{

    public PacketHTTPHeaderCreator(IPacketCreator creator) {
        super(creator);
    }

    @Override
    public String handleContent() {
        StringBuffer sb = new StringBuffer();
        sb.append("CacheControl:no-cache\n");
        sb.append("Date:Sun,21June201515:58:57GMT\n");
        sb.append(component.handleContent());
        return sb.toString();
    }
}
```

测试：

```Java
public class DecoratorTester {
    public static void main(String[] args) {
        IPacketCreator pc = new PacketHTTPHeaderCreator(
                new PacketHtmlHeaderCreator(new PacketBodyCreator()));
        System.out.println(pc.handleContent());
    }
}
```
从例子中我们可以看出，组件的各种功能最后被一层层的嵌入最终的pc中。

其实装饰者模式在日常使用中也很常见，比如JDK中的`IO Stream`:

```Java
DataOutputStream dos = new DataOutputStream(new BufferedOutputStream(new FileOutputStream("/data/file.txt")));
```

