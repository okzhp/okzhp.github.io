# Leetcode 双指针


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

## 1、[283. 移动零](https://leetcode.cn/problems/move-zeroes/)

![](https://image.okzhp.xyz/img/20240123172057.png)

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int len = nums.length;
        //i指针用于遍历非0数字，j指针用于将非0数字放到前边，可以直接覆盖，最后剩余的都用0填充即可
        for(int i = 0,j = 0;i < len;i++){
            if(nums[i] != 0){
                nums[j++] = nums[i];
            }
            if(i == len-1){
                while(j<len){
                    nums[j++] = 0;
                }
            }
        }
    }
}
```

## 2、[392. 判断子序列](https://leetcode.cn/problems/is-subsequence/)

![](https://image.okzhp.xyz/img/20240123180335.png)

```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        //递归解法 终止条件
        if(s.length()==0)return true;
        int index = t.indexOf(s.charAt(0));
        //如果首字母存在，递归判断余下的部分
        if(index >= 0){
            return isSubsequence(s.substring(1),t.substring(index+1));
        }else{
            return false;
        }
    }
}
```

双指针，参考官方，真简洁！

```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int len1 = s.length(),len2 = t.length(),i = 0,j = 0;
        //定义两个指针，分别指向两个字符串的首字母，如果相等，都往后移，如果不等，j往后移
        while(i<len1 && j<len2){
            if(s.charAt(i) == t.charAt(j)){
                i++;
            }
            j++;
        }
        return i == len1;
    }
}
```

## 3、[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

![](https://image.okzhp.xyz/img/20240125232718.png)

```java
class Solution {
    public int maxArea(int[] height) {
        //从两端向中间找，哪端高度低，哪端向中间移动，因为盛水的最大容量取决于更低的一端
        int res = 0,i = 0;
        for(int j = height.length - 1; j > i;){
            res = Math.max(res,(j - i) * Math.min(height[i],height[j]));
            if(height[i] < height[j])i++;
            else j--;
        }
        return res;
    }
}
```

```java
//暴力解法 导致超时
class Solution {
    public int maxArea(int[] height) {
        int res = 0;
        for(int i = 0; i < height.length; i++){
            for(int j = i + 1; j < height.length; j++){
                res = Math.max(res,(j - i) * Math.min(height[i],height[j]));
            }
        }
        return res;
    }
}

```

## 4、[1679. K 和数对的最大数目](https://leetcode.cn/problems/max-number-of-k-sum-pairs/)

![](https://image.okzhp.xyz/img/20240125234833.png)

```java
class Solution {
    public int maxOperations(int[] nums, int k) {
        //先排序，首尾相加，如果相等，两个指针内移，如果比k大，j--，如果比k小，i++
        Arrays.sort(nums);
        int cnt = 0,i = 0,j = nums.length - 1;
        while(i < j){
            if(nums[i] + nums[j] == k){
                cnt++;
                i++;
                j--;
            }else if(nums[i] + nums[j] > k){
                j--;
            }else{
                i++;
            }
        }
        return cnt;
    }
}
```

暴力解法，同样超时：

```java
class Solution {
    public int maxOperations(int[] nums, int k) {
        int cnt  = 0;
        boolean[] visited = new boolean[nums.length];
        for(int i = 0; i < nums.length - 1; i++){
            if(visited[i])continue;
            for(int j = i + 1; j < nums.length; j++){
                if(visited[j])continue;
                if(nums[i] + nums[j] == k){
                    visited[i] = true;
                    visited[j] = true;
                    cnt++;
                    break;
                }
            }
        }
        return cnt;
    }
}
```

