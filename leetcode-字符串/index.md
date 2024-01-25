# Leetcode 字符串


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)-字符串部分



## 1、[1768. 交替合并字符串](https://leetcode.cn/problems/merge-strings-alternately/)

![](https://image.okzhp.xyz/img/20240122213124.png)

```java
class Solution {
    public String mergeAlternately(String word1, String word2) {
        //定义双指针，分别指向两个单词首字母
        int i = 0, j = 0;
        StringBuilder sb = new StringBuilder();
        //定义标志，轮流读取两个单词
        boolean flag = true;
        while(i<word1.length()&&j<word2.length()){
            if(flag){
                sb.append(word1.charAt(i++));
                flag = false;
            }else{
                sb.append(word2.charAt(j++));
                flag = true;
            }
        }
        //如果i==word1.length(),word1.substring(i)将会得到空字符，否则会将剩余部分拼接到末尾
        //j同理
        return sb.append(word1.substring(i)).append(word2.substring(j)).toString();
    }
}
```

## 2、[1071. 字符串的最大公因子](https://leetcode.cn/problems/greatest-common-divisor-of-strings/)

![](https://image.okzhp.xyz/img/20240122225349.png)

```java
    public String gcdOfStrings(String str1, String str2) {
        if(str1.length()<str2.length())return gcdOfStrings(str2,str1);
        if(!str1.contains(str2))return "";
        StringBuilder sb = new StringBuilder(str2);
        while(sb.length()>0){
            //因为求最长字符串，因此每次删除最后一个字母 暴力判断
            if(helper(str1,sb.toString())&&helper(str2,sb.toString()))return sb.toString();
            sb.deleteCharAt(sb.length()-1);
        }
        return "";
    }
    //判断t能否除尽s
    public boolean helper(String s,String t){
        StringBuilder sb = new StringBuilder(t);
        while(sb.length()<s.length()&&!sb.toString().equals(s)){
            sb.append(t);
        }
        return sb.toString().equals(s)?true:false;
    }
```

官方解法：

```java
public String gcdOfStrings(String str1, String str2) {
        if(!str1.concat(str2).equals(str2.concat(str1)))return "";
        //求两个字符串长度的最大公约数
        return str1.substring(0,gcd(str1.length(),str2.length()));
  }
    //辗转相除法 求最大公约数
    public int gcd(int a,int b){
        int remainder  = a%b;
        while(remainder !=0){
            a = b;
            b = remainder ;
            remainder  = a%b;
        }
        return b;
    }
```

## 3、[1431. 拥有最多糖果的孩子](https://leetcode.cn/problems/kids-with-the-greatest-number-of-candies/)

![](https://image.okzhp.xyz/img/20240122230531.png)

```java
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        int max = -1;
        //遍历获取最大糖果数量
        for(int i = 0; i < candies.length; i++){
            max = max > candies[i] ? max : candies[i];
        }
        List res = new ArrayList<Boolean>();
        //将所有额外糖果都分给一个孩子，判断是否大于最大糖果数 即可
        for(int n : candies){
            res.add(n+extraCandies>=max);
        }
        return res;
    }
```

## 4、[605. 种花问题](https://leetcode.cn/problems/can-place-flowers/)

![](https://image.okzhp.xyz/img/20240123002651.png)

```java
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int len = flowerbed.length;
        for(int i=0;i<len;i++){
            //此处未种花再判断前后
            if(flowerbed[i] == 0){
                //前面种花直接continue
                if(i>0 && flowerbed[i-1]==1)continue;
                //后面种花直接continue
                if(i<len-1 && flowerbed[i+1]==1)continue;
                //否则此处可以种花
                flowerbed[i] = 1;
                n--;
            }
        }    
        return n <= 0;
    }
```

## 5、[345. 反转字符串中的元音字母](https://leetcode.cn/problems/reverse-vowels-of-a-string/)

![](https://image.okzhp.xyz/img/20240123142514.png)

```java
class Solution {
    public String reverseVowels(String s) {
        int i = 0, j = s.length()-1;
        char[] cs = s.toCharArray();
        while(i<j){
            //从左边找到第一个元音字母
            while(i<j&&!isAEIOU(cs[i])){
                i++;
            }
            //从右边找到第一个元音字母
            while(i<j&&!isAEIOU(cs[j])){
                j--;
            }
            //交换两个字母
            if(i<j){
                char tmp = cs[i];
                cs[i] = cs[j];
                cs[j] = tmp;
                i++;
                j--;
            }
        }
        return new String(cs);
    }
    public boolean isAEIOU(char c){
        return "aeiouAEIOU".contains(c+"");
    }
}
```

## 6、[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

![](https://image.okzhp.xyz/img/20240123142706.png)

```java
class Solution {
    public String reverseWords(String s) {
        s = s.trim();
        String[] words = s.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for(int i = words.length-1; i>=0; i--){
            sb.append(words[i]).append(" ");
        }
        sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }
}
```

官方题解，使用了Collections.reverse()和String.join():

```java
class Solution {
    public String reverseWords(String s) {
        // 除去开头和末尾的空白字符
        s = s.trim();
        // 正则匹配连续的空白字符作为分隔符分割
        List<String> wordList = Arrays.asList(s.split("\\s+"));
        Collections.reverse(wordList);
        return String.join(" ", wordList);
    }
}

作者：力扣官方题解
链接：https://leetcode.cn/problems/reverse-words-in-a-string/solutions/194450/fan-zhuan-zi-fu-chuan-li-de-dan-ci-by-leetcode-sol/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 7、[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

![](https://image.okzhp.xyz/img/20240123144316.png)

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        //tmp存储乘积，不需要每次都从头开始乘
        int tmp = 1;
        int[] res = new int[nums.length];
        //先把乘积算一下，处理第一个数
        for(int i = 1;i < nums.length;i++){
            tmp *= nums[i];
        }
        res[0] = tmp;
        for(int i = 1;i < nums.length;i++){
            //如果当前这个数不为0，直接乘以前面的数并除以当前这个数即可求得乘积，如果为0，就需要重新乘一遍
            if(nums[i] != 0){
                tmp = tmp * nums[i-1] /nums[i];    
            }else{
                tmp = 1;
                for(int j = 0;j < nums.length;j++){
                    if(j != i){
                        tmp *= nums[j];
                    }
                }
            }
            res[i] = tmp;
        }
        return res;
    }
}
```

## 8、[334. 递增的三元子序列](https://leetcode.cn/problems/increasing-triplet-subsequence/)

![](https://image.okzhp.xyz/img/20240123160223.png)

```java
class Solution {
    public boolean increasingTriplet(int[] nums) {
        int samll = Integer.MAX_VALUE, mid = Integer.MAX_VALUE;
        for(int n : nums){
            if(samll >= n)samll = n;
            //n>small 保证存在mid>small
            else if(mid >= n)mid = n;
            //保证存在n > mid，即存在
            else return true;
        }
        return false;
    }

}
```

## 9、[443. 压缩字符串](https://leetcode.cn/problems/string-compression/)

![](https://image.okzhp.xyz/img/20240123164356.png)

```java
class Solution {
    public int compress(char[] chars) {
        //res结果，index修改数组的下标
        int res = 0,index = 0;
        for(int i = 0; i < chars.length; ){
            //压缩字符的长度
            int n = 0;
            char cur = chars[i];
            while(i<chars.length && chars[i]==cur){
                i++;
                n++;
            }
            //字符本身占一个长度
            res++;
            chars[index++] = cur;
            //如果长度大于1，需要占用额外长度 例如 a
            if(n > 1){
                String num = String.valueOf(n);
                res += num.length();
                int j = 0;
                while(j<num.length()){
                    chars[index++] = num.charAt(j++);
                }
            }
        }
        return res;   
    }
}
```



