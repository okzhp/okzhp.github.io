# Hugo搭建博客（上）


**这是Hugo搭建博客的第一期，第二期请参考：[Hugo搭建博客（下） - Okzhp](http://okzhp.tk/hugo搭建博客-2/)**

## 1.前言

​	很早之前就想要搭建一个博客，奈何伊始眼界太窄，不知以何种方式搭建博客。当时还在github上搜一些博客项目，譬如nbBlog、halo等。也听说过github搭建博客，但却不了解它到底是个什么形态。由于种种信息差，我很长时间内一直以为需要买一台服务器然后才能搭建自己的博客，最终也就搁置了。

后来了解到hugo，花了几天时间研究，没少折腾，最终也算有了博客的雏形。谨以此文作为自己的第一篇博客，记录一下博客搭建的过程。



{{< admonition type=info title="提示" >}}

学习新技术的一种绝佳方式就是看官方文档。

本文对于一些说明可以直接点击跳转到官网说明。

{{< /admonition >}}

**Let's Begin！**

{{< admonition type=info title="相关文档说明" >}}

通常github上较火的项目都会有文档说明，有些有中文说明，如果没有中文说明的话，可以尝试google搜索`项目名 中文`，通常可以找到相关文档。

以下列出本文参考的一些文档和链接：

- [Hugo官方文档](https://gohugo.io/getting-started/)
- [Hugo中文文档](https://www.gohugo.org/doc/overview/quickstart/)
- [LoveIt官方文档中文](https://hugoloveit.com/zh-cn)

{{< /admonition >}}

## 2.何为Hugo?

Hugo是一个用go语言实现的静态网站构建框架，github上star数64.5k（截止到2023.1.2）。Hugo的官网是这么介绍的：The world’s fastest framework for building websites。世界上最快的构建网站的框架，简单来说就是一个用来构建静态网站的框架。

需要注意的是，hugo有许多主题可选，想要构建自己的博客，需要选一款中意的主题，然后在此基础上进行配置或自定义修改。

{{< admonition type=info title="静态网站构建框架对比" open=false >}}

Hugo、Hexo、Jekyll。

博客生成器也叫静态网站生成器，是一种将文本文档通过一些处理生成一个有机整体的html语言的网站，由于生成的静态网页可以直接托管在主机或vps上，配合nginx或Apache就可以供网民使用。github与gitcafe等网站也支持免费托管静态网页文件，非常方便。

编译速度：Hugo>hexo>Jekyll

Hugo使用go语言是一种编译型语言，速度非常快，而Jekyll使用ruby编写，hexo使用nodejs编写，ruby与nodejs都是面向对象的高级解释型语言，执行效率比编译型语言要低。

{{< /admonition >}}



## 3.使用Hugo前置条件

Hugo官网推荐使用Hugo前安装Git和Go。在我搭建博客的过程中，git是必须的，go并非必须。

**使用Hugo搭建博客需要安装Hugo和Git。以下仅对Hugo安装进行说明，git安装请自行搜索。**

Hugo有两个版本，这是[官网安装Hugo](https://gohugo.io/installation/)的说明：

![](https://image.okzhp.tk/img/20230102191155.png)

安装方式有好几种，选择一种安装即可：

1. 直接下载编译好的exe文件。[下载地址](https://github.com/gohugoio/hugo/releases)

2. 通过包管理器安装（一行命令即可，但需要首先安装对应包管理器）。

   ![](https://image.okzhp.tk/img/20230102193810.png)

3. 通过Go安装构建。

   ![](https://image.okzhp.tk/img/20230102193854.png)

   简单来说，需要先安装git以及1.18版本以上的go并设置好环境变量。然后执行下面两条命令：

   ``` shell
   #通过go安装Hugo
   go install -tags extended github.com/gohugoio/hugo@latest
   #查看Hugo版本，注意是extended版本
   hugo version
   ```

   

## 4.Hugo快速上手

快速上手参考官网quick start。

至此，如果在命令行中执行hugo和git如果没有报错，即可开始下一步了。

```shell
#创建一个quickstart网站的骨架
hugo new site quickstart
#进入该文件夹
cd quickstart
```

然后就需要在[主题列表](https://themes.gohugo.io/)选择一个主题，并复制其git地址，比如我选择的就是LoveIt，然后执行：

```shell
#将主题clone到themes/LoveIt文件夹下
git clone https://github.com/dillonzq/LoveIt.git themes/LoveIt
#注意，现在只是下载了主题但还没有应用，打开quickstart文件夹下的config.toml 添加下面两行配置：
theme = 'LoveIt'
buildDrafts = true
前者指定了主题，后者指定了将草稿也进行构建（新建的文章默认是草稿）。

#创建第一篇文章first_post
hugo new posts/first_post.md
#在编辑好文章后 执行以下命令启动网站。
hugo serve
```

然后在对应端口即可访问网站。

此时，网站还非常简陋，如下：

![](https://image.okzhp.tk/img/20230102201336.png)

至此，骨架已经搭建完毕。下面将对界面进行基本的配置。

## 5.LoveIt初配置

{{< admonition type=note >}}

该部分配置仅针对LoveIt主题，不同的主题配置有所差异，因此务必参考官方文档说明。LoveIt的[官方文档](https://hugoloveit.com/zh-cn)还是比较详尽的，而且有中文版。

{{< /admonition >}}

{{< admonition type=tip open=false >}}

官网的quick start就像数学课本的例题一样，

例：1+1=2，既然已知1+1=2，那我们就可以推导出$c = \pm\sqrt{a^2 + b^2}$ and \\(f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi\\)

{{< /admonition >}}

> 页面的外观基本上取决于你的配置文件config.toml（或者config.yaml），因此一个健全的config.toml就可以实现基本的外观布局。

经过简单的配置后，现在的配置文件应该是这样：

```toml
baseURL = 'http://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
theme = 'LoveIt'
buildDrafts = true
```

下面罗列一些基本的配置，了解基本的配置有助于理解配置的原理。

> 尝试替换配置中的一些[ICON]([Find the Perfect Icon for Your Project in Font Awesome 5 | Font Awesome](https://fontawesome.com/v5/search))

```toml
# 设置默认的语言 ["en", "zh-cn", "fr", "pl", ...]
defaultContentLanguage = "zh-cn"
# 菜单，也就是最上边的一排栏目
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
    pre = ""
    # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
    post = ""
    name = "文章"
    url = "/posts/"
    # 当你将鼠标悬停在此菜单链接上时, 将显示的标题
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "标签"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "分类"
    url = "/categories/"
    title = ""
  [[menu.main]]
    weight = 4
    identifier = "about"
    pre = ""
    post = ""
    name = "关于"
    url = "/about"
    title = ""
  [[menu.main]]
    weight = 5
    identifier = "github"
    pre = "<i class='fab fa-github fa-fw' aria-hidden='true'></i>"
    post = ""
    name = ""
    url = "https://github.com/okzhp"
    title = "GitHub"
  # 页面头部导航栏配置
  [params.header]
    # 桌面端导航栏模式 ["fixed", "normal", "auto"]
    desktopMode = "fixed"
    # 移动端导航栏模式 ["fixed", "normal", "auto"]
    mobileMode = "auto"
    #  页面头部导航栏标题配置
    [params.header.title]
      # LOGO 的 URL
      logo = ""
      # 标题名称
      name = "Okzhp"
      # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
      pre = '<i class="fab fa-joomla"></i>'
      # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
      post = ""
      #  是否为标题显示打字机动画
      typeit = false
  [params.footer]
    enable = true
    #  自定义内容 (支持 HTML 格式)
    custom = ''
    #  是否显示 Hugo 和主题信息
    hugo = false
    #  是否显示版权信息
    copyright = true
    #  是否显示作者
    author = true
    # 网站创立年份
    since = 2022
    # ICP 备案信息，仅在中国使用 (支持 HTML 格式)
    icp = ""
    # 许可协议信息 (支持 HTML 格式)
    license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'
```

上边罗列了最基本的header、菜单栏已经footer的配置。以下为一个较为完整的配置文件（**仅供参考**）：

```toml
baseURL = "https://okzhp.github.io"

# 更改使用 Hugo 构建网站时使用的默认主题
theme = "LoveIt"
# 网站标题
title = "Okzhp"
# 是否构建草稿
buildDrafts = true

# 设置默认的语言 ["en", "zh-cn", "fr", "pl", ...]
defaultContentLanguage = "zh-cn"
# 网站语言, 仅在这里 CN 大写 ["en", "zh-CN", "fr", "pl", ...]
languageCode = "zh-CN"
# 语言名称 ["English", "简体中文", "Français", "Polski", ...]
languageName = "简体中文"
# 是否包括中日韩文字
hasCJKLanguage = true

# 默认每页列表显示的文章数目
paginate = 12
# 谷歌分析代号 [UA-XXXXXXXX-X]
googleAnalytics = ""
# 版权描述，仅仅用于 SEO
copyright = ""

# 是否使用 robots.txt
enableRobotsTXT = true
# 是否使用 git 信息
enableGitInfo = false
# 是否使用 emoji 代码
enableEmoji = true

# 忽略一些构建错误
ignoreErrors = ["error-remote-getjson", "error-missing-instagram-accesstoken"]

# 作者配置
[author]
  name = "Caspian"
  email = "1241683615@qq.com"
  link = ""

# 菜单配置
[menu]
  [[menu.main]]
    weight = 1
    identifier = "posts"
    # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
    pre = ""
    # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
    post = ""
    name = "文章"
    url = "/posts/"
    # 当你将鼠标悬停在此菜单链接上时, 将显示的标题
    title = ""
  [[menu.main]]
    weight = 2
    identifier = "tags"
    pre = ""
    post = ""
    name = "标签"
    url = "/tags/"
    title = ""
  [[menu.main]]
    weight = 3
    identifier = "categories"
    pre = ""
    post = ""
    name = "分类"
    url = "/categories/"
    title = ""
  [[menu.main]]
    weight = 4
    identifier = "about"
    pre = ""
    post = ""
    name = "关于"
    url = "/about"
    title = ""
  [[menu.main]]
    weight = 5
    identifier = "github"
    pre = "<i class='fab fa-github fa-fw' aria-hidden='true'></i>"
    post = ""
    name = ""
    url = "https://github.com/okzhp"
    title = "GitHub"

  

[params]
  # 网站默认主题样式 ["auto", "light", "dark"]
  defaultTheme = "auto"
  # 公共 git 仓库路径，仅在 enableGitInfo 设为 true 时有效
  gitRepo = "https://github.com/okzhp"
  #  哪种哈希函数用来 SRI, 为空时表示不使用 SRI
  # ["sha256", "sha384", "sha512", "md5"]
  fingerprint = ""
  #  日期格式
  dateFormat = "2006-01-02"
  # 网站标题, 用于 Open Graph 和 Twitter Cards
  title = "我的网站"
  # 网站描述, 用于 RSS, SEO, Open Graph 和 Twitter Cards
  description = "这是我的全新 Hugo 网站"
  # 网站图片, 用于 Open Graph 和 Twitter Cards
  images = ["/logo.png"]

  # 页面头部导航栏配置
  [params.header]
    # 桌面端导航栏模式 ["fixed", "normal", "auto"]
    desktopMode = "fixed"
    # 移动端导航栏模式 ["fixed", "normal", "auto"]
    mobileMode = "auto"
    #  页面头部导航栏标题配置
    [params.header.title]
      # LOGO 的 URL
      logo = ""
      # 标题名称
      name = "Okzhp"
      # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
      pre = '<i class="fab fa-joomla"></i>'
      # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
      post = ""
      #  是否为标题显示打字机动画
      typeit = false
  

  [params.busuanzi]         # count web traffic by busuanzi                             # 是否使用不蒜子统计站点访问量
    enable = true
    siteUV = true
    sitePV = true
    pagePV = true
  [params.runtime]
    enable = true

  [params.reward]                                         # 文章打赏
    enable = false
    wechat = "/path/to/your/wechat-qr-code.png"           # 微信二维码
    alipay = "/path/to/your/alipay-qr-code.png" 
  # 页面底部信息配置
  [params.footer]
    enable = true
    #  自定义内容 (支持 HTML 格式)
    custom = ''
    #  是否显示 Hugo 和主题信息
    hugo = false
    #  是否显示版权信息
    copyright = true
    #  是否显示作者
    author = true
    # 网站创立年份
    since = 2022
    # ICP 备案信息，仅在中国使用 (支持 HTML 格式)
    icp = ""
    # 许可协议信息 (支持 HTML 格式)
    license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'

  #  Section (所有文章) 页面配置
  [params.section]
    # section 页面每页显示文章数量
    paginate = 20
    # 日期格式 (月和日)
    dateFormat = "01-02"
    # RSS 文章数目
    rss = 10

  #  List (目录或标签) 页面配置
  [params.list]
    # list 页面每页显示文章数量
    paginate = 20
    # 日期格式 (月和日)
    dateFormat = "01-02"
    # RSS 文章数目
    rss = 10

  #  应用图标配置
  [params.app]
    # 当添加到 iOS 主屏幕或者 Android 启动器时的标题, 覆盖默认标题
    title = "我的网站"
    # 是否隐藏网站图标资源链接
    noFavicon = false
    # 更现代的 SVG 网站图标, 可替代旧的 .png 和 .ico 文件
    svgFavicon = "/favicon.ico"
    # Android 浏览器主题色
    themeColor = "#ffffff"
    # Safari 图标颜色
    iconColor = "#5bbad5"
    # Windows v8-10磁贴颜色
    tileColor = "#da532c"

  #  搜索配置
  [params.search]
    enable = true
    # 搜索引擎的类型 ["lunr", "algolia"]
    type = "lunr"
    # 文章内容最长索引长度
    contentLength = 4000
    # 搜索框的占位提示语
    placeholder = ""
    #  最大结果数目
    maxResultLength = 10
    #  结果内容片段长度
    snippetLength = 50
    #  搜索结果中高亮部分的 HTML 标签
    highlightTag = "em"
    #  是否在搜索索引中使用基于 baseURL 的绝对路径
    absoluteURL = false
    [params.search.algolia]
      index = ""
      appID = ""
      searchKey = ""

  # 主页配置
  [params.home]
    #  RSS 文章数目
    rss = 10
    # 主页个人信息
    [params.home.profile]
      enable = true
      # Gravatar 邮箱，用于优先在主页显示的头像
      gravatarEmail = ""
      # 主页显示头像的 URL
      avatarURL = "/images/avatar.png"
      #  主页显示的网站标题 (支持 HTML 格式)
      title = "学无止境"
      # 主页显示的网站副标题 (允许 HTML 格式)
      subtitle = "风景"
      # 是否为副标题显示打字机动画
      typeit = true
      # 是否显示社交账号
      social = true
      #  免责声明 (支持 HTML 格式)
      disclaimer = ""
    # 主页文章列表
    [params.home.posts]
      enable = true
      # 主页每页显示文章数量
      paginate = 6
      #  被 params.page 中的 hiddenFromHomePage 替代
      # 当你没有在文章前置参数中设置 "hiddenFromHomePage" 时的默认行为
      defaultHiddenFromHomePage = false

  # 作者的社交信息设置
  [params.social]
    GitHub = "okzhp"
    Linkedin = ""
    Twitter = ""
    Instagram = ""
    Facebook = ""
    Telegram = "cihvsoj"
    Medium = ""
    Gitlab = ""
    Youtubelegacy = ""
    Youtubecustom = ""
    Youtubechannel = ""
    Tumblr = ""
    Quora = ""
    Keybase = ""
    Pinterest = ""
    Reddit = ""
    Codepen = ""
    FreeCodeCamp = ""
    Bitbucket = ""
    Stackoverflow = ""
    Weibo = ""
    Odnoklassniki = ""
    VK = ""
    Flickr = ""
    Xing = ""
    Snapchat = ""
    Soundcloud = ""
    Spotify = ""
    Bandcamp = ""
    Paypal = ""
    Fivehundredpx = ""
    Mix = ""
    Goodreads = ""
    Lastfm = ""
    Foursquare = ""
    Hackernews = ""
    Kickstarter = ""
    Patreon = ""
    Steam = ""
    Twitch = ""
    Strava = ""
    Skype = ""
    Whatsapp = ""
    Zhihu = "ren-sheng-ku-duan-xiang-yizhi-lan"
    Douban = ""
    Angellist = ""
    Slidershare = ""
    Jsfiddle = ""
    Deviantart = ""
    Behance = ""
    Dribbble = ""
    Wordpress = ""
    Vine = ""
    Googlescholar = ""
    Researchgate = ""
    Mastodon = ""
    Thingiverse = ""
    Devto = ""
    Gitea = ""
    XMPP = ""
    Matrix = ""
    Bilibili = "253435099"
    Discord = ""
    DiscordInvite = ""
    Lichess = ""
    ORCID = ""
    Pleroma = ""
    Kaggle = ""
    MediaWiki= ""
    Plume = ""
    HackTheBox = ""
    RootMe= ""
    Phone = ""
    Email = "1241683615@qq.com"
    RSS = true # 

  #  文章页面全局配置
  [params.page]
    #  是否在主页隐藏一篇文章
    hiddenFromHomePage = false
    #  是否在搜索结果中隐藏一篇文章
    hiddenFromSearch = false
    #  是否使用 twemoji
    twemoji = false
    # 是否使用 lightgallery
    lightgallery = false
    #  是否使用 ruby 扩展语法
    ruby = true
    #  是否使用 fraction 扩展语法
    fraction = true
    #  是否使用 fontawesome 扩展语法
    fontawesome = true
    # 是否在文章页面显示原始 Markdown 文档链接
    linkToMarkdown = true
    #  是否在 RSS 中显示全文内容
    rssFullText = false
    #  目录配置
    [params.page.toc]
      # 是否使用目录
      enable = true
      #  是否保持使用文章前面的静态目录
      keepStatic = true
      # 是否使侧边目录自动折叠展开
      auto = true
    #  代码配置
    [params.page.code]
      # 是否显示代码块的复制按钮
      copy = true
      # 默认展开显示的代码行数
      maxShownLines = 50
    #  KaTeX 数学公式
    [params.page.math]
      enable = true
      #  默认行内定界符是 $ ... $ 和 \( ... \)
      inlineLeftDelimiter = ""
      inlineRightDelimiter = ""
      #  默认块定界符是 $$ ... $$, \[ ... \],  \begin{equation} ... \end{equation} 和一些其它的函数
      blockLeftDelimiter = ""
      blockRightDelimiter = ""
      # KaTeX 插件 copy_tex
      copyTex = true
      # KaTeX 插件 mhchem
      mhchem = true
    #  Mapbox GL JS 配置
    [params.page.mapbox]
      # Mapbox GL JS 的 access token
      accessToken = ""
      # 浅色主题的地图样式
      lightStyle = "mapbox://styles/mapbox/light-v10?optimize=true"
      # 深色主题的地图样式
      darkStyle = "mapbox://styles/mapbox/dark-v10?optimize=true"
      # 是否添加 NavigationControl
      navigation = true
      # 是否添加 GeolocateControl
      geolocate = true
      # 是否添加 ScaleControl
      scale = true
      # 是否添加 FullscreenControl
      fullscreen = true
    #  文章页面的分享信息设置
    [params.page.share]
      enable = true
      Twitter = true
      Facebook = true
      Linkedin = false
      Whatsapp = false
      Pinterest = false
      Tumblr = false
      HackerNews = true
      Reddit = false
      VK = false
      Buffer = false
      Xing = false
      Line = true
      Instapaper = false
      Pocket = false
      Flipboard = false
      Weibo = true
      Blogger = false
      Baidu = false
      Odnoklassniki = false
      Evernote = false
      Skype = false
      Trello = false
      Mix = false
    #  评论系统设置
    [params.page.comment]
      enable = true
      # Disqus 评论系统设置
      [params.page.comment.disqus]
        # 
        enable = false
        # Disqus 的 shortname，用来在文章中启用 Disqus 评论系统
        shortname = ""
      # Gitalk 评论系统设置
      [params.page.comment.gitalk]
        # 
        enable = false
        owner = ""
        repo = ""
        clientId = ""
        clientSecret = ""
      # Valine 评论系统设置 参考https://valine.js.org/
      [params.page.comment.valine]
        enable = false
        appId = "UEpLcdixynrCLnKUw0Tux5hK-MdYXbMMI"
        appKey = "krDHzbea1rh6NJEQuNCwg60u"
        placeholder = "说点什么吧..."
        # avatar 头像
        # 空字符串''		Gravatar官方图形
        # mp		神秘人(一个灰白头像)
        # identicon		抽象几何图形
        # monsterid		小怪物
        # wavatar		用不同面孔和背景组合生成的头像
        # retro		八位像素复古头像
        # robohash		一种具有不同颜色、面部等的机器人
        # hide	 	不显示头像
        avatar = "retro"
        meta= ['nick','mail']
        pageSize = 10
        # 为空时自动适配当前主题 i18n 配置
        lang = ""
        # 开启访问量 注意和busuanzi开一个就形
        visitor =true
        recordIP = true
        highlight = true
        enableQQ = true
        serverURLs = ""
        #  emoji 数据文件名称, 默认是 "google.yml"
        # ["apple.yml", "google.yml", "facebook.yml", "twitter.yml"]
        # 位于 "themes/LoveIt/assets/lib/valine/emoji/" 目录
        # 可以在你的项目下相同路径存放你自己的数据文件:
        # "assets/lib/valine/emoji/"
        emoji = "twitter.yml"
      # Facebook 评论系统设置
      [params.page.comment.facebook]
        enable = false
        width = "100%"
        numPosts = 10
        appId = ""
        # 为空时自动适配当前主题 i18n 配置
        languageCode = "zh_CN"
      #  Telegram Comments 评论系统设置
      [params.page.comment.telegram]
        enable = false
        siteID = ""
        limit = 5
        height = ""
        color = ""
        colorful = true
        dislikes = false
        outlined = false
      #  Commento 评论系统设置
      [params.page.comment.commento]
        enable = false
      #  utterances 评论系统设置
      [params.page.comment.utterances]
        enable = false
        # owner/repo
        repo = ""
        issueTerm = "pathname"
        label = ""
        lightTheme = "github-light"
        darkTheme = "github-dark"
      # giscus comment 评论系统设置 (https://giscus.app/zh-CN)
      [params.page.comment.giscus]
        # 你可以参考官方文档来使用下列配置
        enable = false
        repo = ""
        repoId = ""
        category = "Announcements"
        categoryId = ""
        # 为空时自动适配当前主题 i18n 配置
        lang = ""
        mapping = "pathname"
        reactionsEnabled = "1"
        emitMetadata = "0"
        inputPosition = "bottom"
        lazyLoading = false
        lightTheme = "light"
        darkTheme = "dark"
    #  第三方库配置
    [params.page.library]
      [params.page.library.css]
        # someCSS = "some.css"
        # 位于 "assets/"
        # 或者
        # someCSS = "https://cdn.example.com/some.css"
      [params.page.library.js]
        # someJavascript = "some.js"
        # 位于 "assets/"
        # 或者
        # someJavascript = "https://cdn.example.com/some.js"
    #  页面 SEO 配置
    [params.page.seo]
      # 图片 URL
      images = []
      # 出版者信息
      [params.page.seo.publisher]
        name = ""
        logoUrl = ""

  #  TypeIt 配置
  [params.typeit]
    # 每一步的打字速度 (单位是毫秒)
    speed = 50
    # 光标的闪烁速度 (单位是毫秒)
    cursorSpeed = 1000
    # 光标的字符 (支持 HTML 格式)
    cursorChar = ""
    # 打字结束之后光标的持续时间 (单位是毫秒, "-1" 代表无限大)
    duration = -1

  # 网站验证代码，用于 Google/Bing/Yandex/Pinterest/Baidu
  [params.verification]
    google = ""
    bing = ""
    yandex = ""
    pinterest = ""
    baidu = ""

  #  网站 SEO 配置
  [params.seo]
    # 图片 URL
    image = ""
    # 缩略图 URL
    thumbnailUrl = ""

  #  网站分析配置
  [params.analytics]
    enable = false
    # Google Analytics
    [params.analytics.google]
      id = ""
      # 是否匿名化用户 IP
      anonymizeIP = true
    # Fathom Analytics
    [params.analytics.fathom]
      id = ""
      # 自行托管追踪器时的主机路径
      server = ""
    # Plausible Analytics
    [params.analytics.plausible]
      dataDomain = ""
    # Yandex Metrica
    [params.analytics.yandexMetrica]
      id = ""

  #  Cookie 许可配置
  [params.cookieconsent]
    enable = false
    # 用于 Cookie 许可横幅的文本字符串
    [params.cookieconsent.content]
      message = ""
      dismiss = ""
      link = ""

  #  第三方库文件的 CDN 设置
  [params.cdn]
    # CDN 数据文件名称, 默认不启用
    # ["jsdelivr.yml"]
    # 位于 "themes/LoveIt/assets/data/cdn/" 目录
    # 可以在你的项目下相同路径存放你自己的数据文件:
    # "assets/data/cdn/"
    data = ""

  #  兼容性设置
  [params.compatibility]
    # 是否使用 Polyfill.io 来兼容旧式浏览器
    polyfill = false
    # 是否使用 object-fit-images 来兼容旧式浏览器
    objectFit = false

# Hugo 解析文档的配置
[markup]
  # 语法高亮设置
  [markup.highlight]
    codeFences = true
    guessSyntax = true
    lineNos = true
    lineNumbersInTable = true
    # false 是必要的设置
    # (https://github.com/dillonzq/LoveIt/issues/158)
    noClasses = false
  # Goldmark 是 Hugo 0.60 以来的默认 Markdown 解析库
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.renderer]
      # 是否在文档中直接使用 HTML 标签
      unsafe = true
  # 目录设置
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6

# 网站地图配置
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5

# Permalinks 配置
[Permalinks]
  # posts = ":year/:month/:filename"
  posts = ":filename"

# 隐私信息配置
[privacy]
  #  Google Analytics 相关隐私 (被 params.analytics.google 替代)
  [privacy.googleAnalytics]
    # ...
  [privacy.twitter]
    enableDNT = true
  [privacy.youtube]
    privacyEnhanced = true

# 用于输出 Markdown 格式文档的设置
[mediaTypes]
  [mediaTypes."text/plain"]
    suffixes = ["md"]

# 用于输出 Markdown 格式文档的设置
[outputFormats.MarkDown]
  mediaType = "text/plain"
  isPlainText = true
  isHTML = false

# 用于 Hugo 输出文档的设置
[outputs]
  # 
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML", "MarkDown"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  taxonomyTerm = ["HTML"]

```

使用该配置文件后，应该是这个样子：

![](https://image.okzhp.tk/img/20230102225136.png)

可以看到，目前还没有头像，在static文件夹下创建images文件夹，并找一张合适的图片命名为avatar.png放在里面，即可正确显示头像。

此时，博客已经初见雏形了。

那么博客是如何对文章通过标签和分类进行归类呢？答案在于文章的元数据中，打开刚才新建的文章first_post.md，最上边的一些数据就是元数据，在这些数据中我们可以定义文章的标签和分类。下边是一个参考，可以把该数据放在文章的头部并尝试添加标签和分类。

```\
author: ""
authorLink: ""
description: ""
title: "{{ replace .TranslationBaseName "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
draft: false
weight: false
categories: [""]
tags: [""]
```

博客会自动根据分类和标签对文章进行归类，至此一些简略的配置已经叙述完毕。完整的配置文件中有许多其他配置，例如作者、搜索框、副标题、评论系统等等。

> 如果不想每次都要手动在头部添加以上信息，可以再根目录的archetypes文件夹下创建一个default.md，并将内容粘贴进去，这样每次执行hugo new posts/xxx.md就会自动在头部添加以上信息。


