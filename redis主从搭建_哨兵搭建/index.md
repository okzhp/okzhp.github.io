# Redis主从搭建_哨兵搭建




## Redis主从搭建

> 工作中虽然用过redis，但是并没有深入研究整个搭建的过程，搭建过程中也踩了不少坑，借此记录一下。

## 1、兵马未动，粮草先行

为了更贴近实际，我准备了三台虚拟机，搭建一个一主两从的模型，后面的哨兵搭建也是基于主从搭建。

在三台虚拟机中各自安装redis，linux用的是ubuntu 22.04这个版本，安装过程参考[redis官网[Install Redis on Linux | Redis](https://redis.io/docs/install/install-redis/install-redis-on-linux/)]，但也有一些要注意的地方：

{{< admonition type=info title="提示" >}}

1. 使用一行命令`sudo snap install redis`可以安装，但是这种方式的安装目录有些封闭，且难以进行配置，一开始用这种方式安装的，后面配置起来就很不方便，故不采用这种放松。

2. 熟悉linux安装的话，可能直接就想到使用`sudo apt install redis`，这样是可以，但是安装的版本可能不是最新的，（也可能是因为没执行`sudo apt update`和`sudo apt upgrade`）,如果搭建主从，redis版本应该是需要统一的，因为我用6.x的版本和7.x的版本并不能正常进行数据同步。因此，除非对版本有明确要求，否则安装时最好无脑选择官网推荐的第一种方式，这种方式安装的是最新(稳定)版本，即：

```shell
sudo apt install lsb-release curl gpg

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis

#最后一步 可能由于网络原因失败，多试几次基本没问题
```

3. 确保三台虚拟机的ip处于同一网段。
4. 这个版本的ubuntu，安装时会创建一个非root账户，有些服务的目录只有切换到root账户才能看到，这个后面会讲。

{{< /admonition >}}

准备完毕后，情况如下：

虚拟机a：192.168.8.18，用户是aaa

虚拟机b：192.168.8.19，用户是bbb

虚拟机c： 192.168.8.21，用户是ccc

如果需要通过ssh连接，需要先安装`sudo apt-get install openssh-server`开放ssh服务，这个版本默认是关闭的，不安装的话连接是会被拒绝的，我在三台虚拟机分别装好了redis和openssh，然后通过ssh工具连接，方便统一操作，最终如图：

![](https://image.okzhp.xyz/img/20240109222113.png)

通过命令`service redis-server status`查看redis状态，可以看到三台服务器的redis服务都已启动：

![](https://image.okzhp.xyz/img/20240109224020.png)

至此准备工作已完成，接下来需要将它们设置主从关系。

```shell
#查看服务当前状态
service redis-server status
#停止服务
service redis-server stop
#启动服务
service redis-server start
#重启服务
service redis-server restart
```

# 2、运筹帷幄，决胜千里

准备工作做完后，这一步主要就是做一些配置，虽然网上很多教程，但是只能说千人千面，别人的只能拿来参考，只有真正动手实践才能融会贯通，这一步也有不少坑。

首先要说明的是，通过命令`ps -ef|grep redis`可以看到，redis服务的运行者是redis，如果我们使用账户aaa去查看redis的配置，它会提醒我们没有权限，即使我们使用`chmod`修改了权限，里边的配置文件仍然是空的，因此我们需要切换到root用户，直接修改配置文件。

![](https://image.okzhp.xyz/img/20240109225522.png)

> redis默认的一些目录（需要root用户）：
> 
> 配置文件：/etc/redis/redis.conf  最重要的！日志文件和备份文件的路径都在配置文件里配置。
> 
> 日志文件：/var/log/redis/redis-server.log
> 
> RDB备份文件：/var/lib/redis/dump.rdb

后续需要修改配置文件，使用`apt install vim`安装一下vim。

这一步修改配置有两种方式，一种是直接修改redis.conf文件，这种方式修改完是永久生效的，即使重启也会生效；另一种是通过redis-cli连接redis后，通过`config set key value`的方式修改指定的配置，这种方式是临时生效，重启后需要重新配置。

这里主要讲下第一种方式，主打一个一劳永逸！需要配置的地方也不多，在配置文件中找到以下参数并配置即可：

```properties
# 默认redis不允许别的主机访问，0代表所有主机都可以访问
bind 0.0.0.0

# 保护模式，默认是开的，没有密码的情况下不允许别的主机访问，这里把它关掉
protected-mode no

#其余有非常多的配置，后续可以根据需要细看

#这里有一个关键参数，下文细🔒
#replicaof <masterip> <masterport>


```

redis默认是主节点，因此`replicaof `默认是注释的（这个参数等效于slaveof，只不过slaveof参数有些老了），这里我选择a作为主节点，b、c作为从节点，因此我在b、c的配置文件中配置`replicaof 192.168.8.18 6379`,意味b、c作为a的从节点。



修改完配置，需要重启服务`service redis-server restart`，三台服务器都需要进行配置，配置完成后对其进行验证。

在a服务器上，使用redis-cli命令连接redis，此时`keys *`还没有值，通过 `info replication`可以看到a节点为主节点，且有两个从节点，如下图：

![](https://image.okzhp.xyz/img/20240109235304.png)



在b服务器上，执行同样的命令，可以看到b为从节点，且主节点是a节点，如图：

![](https://image.okzhp.xyz/img/20240109235244.png)

c服务器同b。

这样主从关系就配置完成了，这还不够，因为还需要验证主从数据同步，在主从模式中，主节点负责写入，从节点负责同步，只需在a节点写入数据，然后在b、c节点查看数据是否同步过来了即可：

a节点写入：

![](https://image.okzhp.xyz/img/20240110150448.png)

去b、c节点查看：

![](https://image.okzhp.xyz/img/20240109235219.png)

可以看到可以正常同步。如果配置都没问题，但是同步不了，首先看下redis版本是否一致，如果版本不一致很有可能是无法同步的：

![](https://image.okzhp.xyz/img/20240109234904.png)

如果出现版本不一致，只有祈祷可以卸载干净，并且再安装的时候不会出现依赖错误😶,反正出现了两三次我只能重装系统，引擎搜烂了都解决不了这个错误，但是，程序嘛，总会有各种各样的问题，哪怕完全一样的步骤，也可能因为其他因素（网络、系统版本等）导致结果不一样，这个只能放平心态。

至此，主从模式就搭建完毕了。

> 主从模式存在一个问题，假如主节点挂了，系统就无法向redis写入数据，直到主节点恢复正常。这可能是无法接受的，此时，就可以在此基础上搭建哨兵模式——在主节点挂了以后，会自动选取其他节点为新的主节点。

# 3、一鼓作气，乘胜追击



> 在搭建哨兵模式时，我发现了以服务形式安装redis的种种弊端，尝试了若干种安装redis的形式，最终发现还是编译源码的方式最稳定可靠。使用apt安装的服务莫名会出现依赖错误，而且难以解决。原本的计划是在上边三台服务器中各自启动一个哨兵，但由于使用apt安装的reids并不包含sentinel服务，需要单独去安装sentinel，并且后面出现了依赖的问题，我不想重装系统...于是...

先提一句，以后安装还是老实地用编译源码的形式吧！

我又启了一台虚拟机，打算在这上边部署三个哨兵。上节的三台服务器ip分别为18、19、21，后来打开ip变成了15、16、17，其中16是主节点，15、17是从节点！

在这台虚拟机上，我使用了编译源码的形式安装了redis，当然也包括了redis-sentinel。具体安装命令：

```shell
#在~/app目录下下载redis包
weget http://download.redis.io/releases/redis-7.2.4.tar.gz

#解压包
tar -zxf redis-7.2.4.tar.gz

cd redis-7.2.4

#编译命令需要gcc
sudo apt-get install gcc

#编译
make

#如果出错了清理一下
#make distclean

#如果没出错，执行安装即可
make install


```

安装完后，命令在`/usr/local/bin`目录下，redis目录下有一个默认的sentinel.conf文件，把它复制出来三份。修改其中的端口分别为26379、26380、26381，以及 `sentinel monitor mymaster 192.168.8.16 6379 2`

为了看到选举过程，没有启动守护，因此开了三个终端运行三个哨兵服务：

```shell
redis-sentinel ./sentinel-1.conf 

redis-sentinel ./sentinel-2.conf 

redis-sentinel ./sentinel-3.conf 
```

把主节点16停止服务，大约经过30秒左右，原本为从节点的17已经成为了主节点：

![](https://image.okzhp.xyz/img/20240110174946.png)

而原本为从节点的15新的主节点也变成了17

![](https://image.okzhp.xyz/img/20240110175014.png)

可以看到，主节点下线后，会从剩余的从节点中选举出一个作为主节点，这是sentinel-1的选举过程：

![](https://image.okzhp.xyz/img/20240110175522.png)



自动选举的过程会修改redis.conf文件和sentinel.conf文件。

原来的主节点上线后，可以看到已经成为了新主节点的从节点：

![](https://image.okzhp.xyz/img/20240110175839.png)



# 4、知己知彼，百战不殆

这只是简单的搭建了主从和哨兵模式，其实有很多可以配置的地方，比如密码、存放文件的目录、其他一些参数等等。千里之行始于足下，先把第一步走扎实，至于后面再细细研究。

> 可以认真看下默认的redis.conf和sentinel.conf，对于每项参数都有英文说明，认真看一遍再结合搜索引擎，基本就懂个七七八八了。



当然，redis还有一个集群模式，这个留着下次记录🤣

> 插个眼，里边有redis四种模式
> 
> [Redis Cluster模式部署 | 程序猿DD (didispace.com)](https://www.didispace.com/installation-guide/middleware/redis-cluster.html)

