# Git快记


# Git快记

参考链接：[创建与合并分支 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424)

![](https://image.okzhp.xyz/img/20230104192418.png)

```shell
将本地仓库和远程仓库相关联，远程仓库名为origin
git remote add origin git地址

查看本地分支 参数-a：所有分支，参数-r：远程分支
git branch

创建dev分支(基于当前分支创建)
git branch dev
切换到dev分支
git checkout dev

上边两个简写为
git checkout -b dev

在dev分支进行开发，开发完毕后执行以下命令将分支push （-u参数有无皆可，待深究其功能）
git push origin dev

有两种合并方式：
1.本地合并到master然后push到origin/master分支
git checkout master
git merge dev
git push origin master
最后删除dev分支
git branch -d dev

正常工作即为第二种方式
2.使用有权限的账户在github仓库将dev合并到master
随后本地master分支拉代码即可更新
git pull origin master
随后删除dev分支
git branch -d dev



```



将当前本地分支绑定到指定远程分支：git push --set-upstream origin master

如下，直接push远程仓库origin时提示未绑定远程分支，执行上边命令后将绑定分支，后续提交可直接git push origin

![image-20230105235949366](https://image.okzhp.xyz/img/image-20230105235949366.png)
