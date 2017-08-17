---
layout: post
title: "An Webpack Error: You may need an appropriate loader to handle this file type"
description: "Module parse failed: .. node_modules/semantic-ui-css/themes/default/assets/fonts/icons.woff2 Unexpected character ' ' (1:4)
    You may need an appropriate loader to handle this file type.
    (Source code omitted for this binary file)"
keywords: [Webpack, css-loader, 'Module parse failed', 'Unexpected character']
date: 2017-08-17 17:01:00
category: "前端"
tags:
  - react
---

### Error
> Module parse failed: .../node_modules/semantic-ui-css/themes\default\assets\fonts\icons.woff2 Unexpected character ' ' (1:4)   You may need an appropriate loader to handle this file type. (Source code omitted for this binary file)

### Solution
add the followings to your loaders config:
```javascript
{
  test:/\.(png|jpg|woff|svg|eot|ttf|woff2)$/,
  loader:'url-loader?limit=8192&name=images/[name].[ext]'
}
```