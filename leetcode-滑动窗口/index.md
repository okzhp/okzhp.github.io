# Leetcode 滑动窗口


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

## 1、[643. 子数组最大平均数 I](https://leetcode.cn/problems/maximum-average-subarray-i/)

![](https://image.okzhp.xyz/img/20240126000721.png)

```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int max,tmp = 0;
        //先计算窗口k个和，随后每滑动一个就减去前一个，并加上新的一个。
        for(int i = 0; i < k; i++){
            tmp += nums[i];
        }
        max = tmp;
        for(int i = 1; i <= nums.length - k; i++){
            tmp = tmp - nums[i-1] + nums[i+k-1];
            max = Math.max(max,tmp);
        }
        return max*1.0/k;
    }
}
```

## 2、[1456. 定长子串中元音的最大数目](https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

![](https://image.okzhp.xyz/img/20240126173735.png)

```java
class Solution {
    //这题和上边那题解法一模一样
    public int maxVowels(String s, int k) {
        int cnt = 0;
        String target = "aeiou";
        for(int i = 0; i < k; i++){
            if(target.contains(s.charAt(i)+""))cnt++;
        }
        int max = cnt;
        for(int i = 1; i <= s.length() - k; i++){
            int pre = target.contains(s.charAt(i-1)+"")?-1:0;
            int cur = target.contains(s.charAt(i+k-1)+"")?1:0;
            cnt = cnt + pre + cur;
            max = Math.max(max,cnt);
        }
        return max;
    }
}
```

## 3、[1004. 最大连续1的个数 III](https://leetcode.cn/problems/max-consecutive-ones-iii/)

![](https://image.okzhp.xyz/img/20240126193636.png)

这题代码太优雅了！好好感受滑动窗口的魅力！

```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        int ans = 0;
        //窗口左右下标
        int left = 0,right = 0;
        //lsum代表从0到left区间0的个数，rsum代表从0到right区间0的个数，rsum-lsum即为窗口中0的个数，要保证其小于等于k
        int lsum = 0,rsum = 0;
        //从头开始扩张窗口
        for(; right < nums.length; right++){
            rsum += 1-nums[right];
            //当窗口中0的个数大于k时，需要将左边界向右滑动，因为右边界向右滑动是不可能减少窗口中0的个数
            while(rsum - lsum > k){
                lsum += 1-nums[left++];
            }
            //在滑动的过程中，记录最大值
            ans = Math.max(ans,right - left + 1);
        }
        return ans;
    }
}
```

## 4、[1493. 删掉一个元素以后全为 1 的最长子数组](https://leetcode.cn/problems/longest-subarray-of-1s-after-deleting-one-element/)

![](https://image.okzhp.xyz/img/20240126195723.png)

这题和上一题，使用滑动窗口的解法几乎一模一样，只改下窗口中0的个数判断条件即可。其实这两题都是在转化问题，将原来的问题通过转化成另一种形式，宇宙的尽头果然还是数学吗...

```java
class Solution {
    public int longestSubarray(int[] nums) {
        int ans = 0;
        int left = 0,right = 0;
        int lsum = 0,rsum = 0;
        for(; right < nums.length; right++){
            rsum += 1 - nums[right];
            //仅这里的条件和上一题不一样
            while(rsum - lsum > 1){
                lsum += 1 - nums[left++];
            }
            ans = Math.max(ans,right - left);
        }
        return ans;
    }
}
```



