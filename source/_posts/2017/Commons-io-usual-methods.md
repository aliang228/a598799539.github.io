---
layout: post
title: CommonsIO常用工具方法
description: CommonsIO常用工具方法
keywords: [Java, Commons IO, Utils]
date: 2017-07-31 19:10:00
category: "Java"
tags:
  - Java
  - Commons IO
  - Utils
---

### 1 FileUtils

- 获取文件：`getFile("src", "main", "java")`、`getFile(parent, "src")`
**常用目录(Path结尾返回String,否则返回File)**
- 系统临时文件目录：`getTempDirectoryPath()`、`getTempDirectory()`
- Home目录：`getUserDirectoryPath()`、`getUserDirectory()`
- 文件输入输出流：`openInputStream(final File file)`、`openOutputStream(final File file, final boolean append)`
- 文件大小单位转换(字节数转K、M、G等)： `byteCountToDisplaySize(final long size)`
- Touch文件(创建一个空文件或者更新文件更新时间)：`touch(final File file)`
- 获取目录下文件列表(ls 不包含目录,包含递归子目录)：`listFiles(final File directory, final IOFileFilter fileFilter, final IOFileFilter dirFilter)`
> 关于IOFileFilter: new WildcardFileFilter("*.*"); 可以正则匹配

- 获取目录下文件与目录列表(包含递归子目录)： `listFilesAndDirs(final File directory, final IOFileFilter fileFilter, final IOFileFilter dirFilter)`
- 获取目录文件(是否递归子目录)：`listFiles(final File directory, final String[] extensions, final boolean recursive)`
- 文件比较：`contentEquals(final File file1, final File file2)`、`isFileNewer(final File file, final File reference)`
- URL与File：`toFile(final URL url)`、`toURLs(final File[] files)`
- 文件拷贝：`copyFileToDirectory(final File srcFile, final File destDir)`、`copyFile(final File srcFile, final File destFile)`、`copyToDirectory(final File src, final File destDir)`
- 目录拷贝：`copyDirectory(final File srcDir, final File destDir)`
- 删除与清理：`deleteDirectory(final File directory)`、`cleanDirectory(final File directory)`(不删除当前目录)、`forceDelete(final File file)`
- 读文件：`readFileToString(final File file, final String encoding)`、`readFileToByteArray(final File file)`、`readLines(final File file, final Charset encoding) `
- 写文件：`writeStringToFile(final File file, final String data, final Charset encoding,final boolean append)`、`writeByteArrayToFile(final File file, final byte[] data)`、`writeLines(final File file, final Collection<?> lines)`
- 新建文件夹：`forceMkdir(final File directory)`
- 文件大小：`sizeOf(final File file)`、`sizeOfDirectory(final File directory)`
- 移动文件：`moveDirectory(final File srcDir, final File destDir)`、`moveFile(final File srcFile, final File destFile)`

### 2 FilenameUtils
- 路径规范化：`normalize(final String filename)`
- 拼接：`concat(final String basePath, final String fullFilenameToAdd)`
- 前置目录：`getPrefix(final String filename)`
- 获取文件目录：`getPath(final String filename)`
- 获取文件名称：`getName(final String filename)`(带后缀)、`getBaseName(final String filename)`
- 后缀：`getExtension(final String filename)`、`isExtension(final String filename, final String extension)`

### 3 FileSystemUtils
- 剩余空间：`freeSpaceOS(final String path, final int os, final boolean kb, final long timeout)`
