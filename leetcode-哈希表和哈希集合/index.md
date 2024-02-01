# Leetcode 哈希表和哈希集合


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

## 1、[2215. 找出两数组的不同](https://leetcode.cn/problems/find-the-difference-of-two-arrays/)

![](https://image.okzhp.xyz/img/20240127214457.png)

```java
class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        Set<Integer> set1 = Arrays.stream(nums1).boxed().collect(Collectors.toSet());
        Set<Integer> set2 = Arrays.stream(nums2).boxed().collect(Collectors.toSet());
        for(int n : nums1){
            if(set2.contains(n))set2.remove(n);
        }
        for(int n : nums2){
            if(set1.contains(n))set1.remove(n);
        }
        return List.of(List.copyOf(set1),List.copyOf(set2));

    }
}
```

## 2、[1207. 独一无二的出现次数](https://leetcode.cn/problems/unique-number-of-occurrences/)

![](https://image.okzhp.xyz/img/20240127214550.png)

```java
class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        Map<Integer,Integer> map = new HashMap<>();
        for(int n : arr){
            if(map.containsKey(n)){
                map.put(n,map.get(n) + 1);
            }else{
                map.put(n,1);
            }
        }
        //将所有出现次数添加到set中，如果size相等则表示没有重复
        return new HashSet(map.values()).size() == map.values().size() ? true : false;
    }
}
```

## 3、[1657. 确定两个字符串是否接近](https://leetcode.cn/problems/determine-if-two-strings-are-close/)

![](https://image.okzhp.xyz/img/20240127222803.png)

首先统计每个字母出现的次数，然后需要保证两个单词的字母种类一模一样，此外还需要保证出现的次数集合相等，即可保证单词是相似的。一开始使用了map，其实可以简化为数组，两种解法思路是一致的，只是对hashmap进行条件判断不如数组判断方便，且数组效率更高！

```java
class Solution {
    public boolean closeStrings(String word1, String word2) {
        if(word1.length() != word2.length())return false;
        Map<Character,Integer> map1 = new HashMap<>();
        Map<Character,Integer> map2 = new HashMap<>();
        for(char c : word1.toCharArray()){
            map1.put(c,map1.getOrDefault(c,0)+1);
        }
        for(char c : word2.toCharArray()){
            map2.put(c,map2.getOrDefault(c,0)+1);
        }
        if(map1.keySet().size() != map2.keySet().size())return false;

        for(char c : map1.keySet()){
            if(!map2.containsKey(c))return false;
        }


        List<Integer> l1 = new ArrayList<>(map1.values());
        List<Integer> l2 = new ArrayList<>(map2.values());

        Collections.sort(l1);
        Collections.sort(l2);

        for(int i = 0;i<l1.size();i++){
            if(!l1.get(i).equals(l2.get(i)))return false;
        }
        return true;

    }
}
```

```java
class Solution {
    public boolean closeStrings(String word1, String word2) {
        int[] count1 = new int[26];
        int[] count2 = new int[26];
        for(char c : word1.toCharArray()){
            count1[c-'a']++;
        }
        for(char c : word2.toCharArray()){
            count2[c-'a']++;
        }

        for(int i = 0; i < 26; i++){
            if(count1[i] == 0 && count2[i] >0 || count1[i] > 0 && count2[i] == 0)return false;
        }
        Arrays.sort(count1);
        Arrays.sort(count2);
        return Arrays.equals(count1,count2);
    }
}
```

## 4、[2352. 相等行列对](https://leetcode.cn/problems/equal-row-and-column-pairs/)

![](https://image.okzhp.xyz/img/20240127225522.png)

将每一行使用,分割拼接作为key，存在hashmap中，然后竖着遍历数组，判断是否存在于hashmap，如果存在，加上其值即可。

```java
class Solution {
    public int equalPairs(int[][] grid) {
        int ans = 0;
        Map<String,Integer> map1 = new HashMap<>();      

        for(int i = 0; i <grid.length; i++){
            String key = "";
            for(int j = 0; j<grid[0].length; j++){
                key += grid[i][j] + ",";
            }
            map1.put(key,map1.getOrDefault(key,0)+1);
        }

        for(int j = 0; j <grid[0].length; j++){
            String key = "";
            for(int i = 0; i<grid[0].length; i++){
                key += grid[i][j] + ",";
            }
            if(map1.containsKey(key)){
                ans += map1.get(key);
            }
        }
        return ans;
    }
}
```

也可以使用纯数组遍历，官方解法，而且使用数组无论在时间还是空间上都比使用hashmap更有优势。解法一的时间复杂度是O(n^2)，空间复杂度也是O(n^2)，解法二的时间复杂度是O(n^3)，空间复杂度是O(1)，即使解法一的时间复杂度低于解法二，但执行时间仍然没有解法二快，可以看出数组这种数据结构在效率上是优于其他构造的数据结构的。

```java
class Solution {
    public int equalPairs(int[][] grid) {
        int res = 0, n = grid.length;
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (equal(row, col, n, grid)) {
                    res++;
                }
            }
        }
        return res;
    }

    public boolean equal(int row, int col, int n, int[][] grid) {
        for (int i = 0; i < n; i++) {
            if (grid[row][i] != grid[i][col]) {
                return false;
            }
        }
        return true;
    }
}
```



