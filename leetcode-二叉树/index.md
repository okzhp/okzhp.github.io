# Leetcode 二叉树


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

# 深度优先搜索DFS

## 1、[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

![](https://image.okzhp.xyz/img/20240129183450.png)

深度优先搜索：

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null)return 0;
        //返回左子树和右子树最大高度 + 1
        return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
    }
}
```

广度优先搜索：

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        int ans = 0;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while(!queue.isEmpty()){
            int size = queue.size();
            while(size > 0){
                TreeNode cur = queue.poll();
                size--;
                if(cur.left != null)queue.offer(cur.left);
                if(cur.right != null)queue.offer(cur.right);
            }
            ans++;
        }
        return ans;
    }
}
```

## 2、[872. 叶子相似的树](https://leetcode.cn/problems/leaf-similar-trees/)

![](https://image.okzhp.xyz/img/20240129190928.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> l1 = new ArrayList<Integer>();
        List<Integer> l2 = new ArrayList<Integer>();
        dfs(root1,l1);
        dfs(root2,l2);
        return l1.equals(l2);
    }

    public void dfs(TreeNode root,List<Integer> list){
        if(root == null)return;
        if(root.left == null && root.right == null){
            list.add(root.val);
        }else{
            dfs(root.left,list);
            dfs(root.right,list);
        }
    }
}
```

## 3、[1448. 统计二叉树中好节点的数目](https://leetcode.cn/problems/count-good-nodes-in-binary-tree/)

![](https://image.okzhp.xyz/img/20240130152126.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    int cnt = 0;
    public int goodNodes(TreeNode root) {
        dfs(root,new ArrayList<Integer>());
        return cnt;
    }
    //最开始想到 遍历每个节点，同时记录路径值，每次将根节点的值和路径中所有值进行比较
    public void dfs(TreeNode root,List<Integer> path){
        if(root == null)return;
        boolean flag = true;
        for(int n : path){
            if(n > root.val){
                flag = false;
                break;
            }
        }
        if(flag)cnt++;
        path.add(root.val);
        dfs(root.left,path);
        dfs(root.right,path);
        //这个过程其实涉及到回溯，需要移除最后一个元素进行回溯，个人感觉回溯偏难，需要多做多感受
        path.remove(path.size()-1);
    }
}
```

这类题有些不熟悉，在做的过程中，dfs方法返回void，操作一个全局变量cnt作为结果。考虑将返回值改为int，直接返回结果，修改后如下：

```java
class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root,new ArrayList<Integer>());
    }
    public int dfs(TreeNode root,List<Integer> path){
        if(root == null)return 0;
        int cnt = 0;
        boolean flag = true;
        for(int n : path){
            if(n > root.val){
                flag = false;
                break;
            }
        }
        if(flag)cnt++;
        path.add(root.val);
        cnt += dfs(root.left,path) + dfs(root.right,path);
        path.remove(path.size()-1);
        return cnt;
    }
}
```

做完后，我知道肯定可以优化，后来看了官方题解，可以使用路径最大值代替整个路径，将空间复杂度从O(n)优化到O(1)，修改后如下：

```java
class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root,Integer.MIN_VALUE);
    }
    public int dfs(TreeNode root,Integer maxValue){
        if(root == null)return 0;
        int res = 0;
        if(root.val >= maxValue){
            res = 1 + dfs(root.left,root.val) + dfs(root.right,root.val);
        }else{
            res = dfs(root.left,maxValue) + dfs(root.right,maxValue);
        }
        return res;
    }
}
```

## 4、[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

![](https://image.okzhp.xyz/img/20240130165400.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    //这里需要区别一下两个函数的区别，pathSum不一定以root为起点，dfs是以root为起点
    public int pathSum(TreeNode root, int targetSum) {
        if(root == null) return 0;
        int ans = dfs(root,targetSum);
        ans += pathSum(root.left,targetSum);
        ans += pathSum(root.right,targetSum);
        return ans;
    }
    public int dfs(TreeNode root,long targetSum){
        if(root == null)return 0;
        int ret = 0;
        if((long)root.val == targetSum)ret++;
        ret += dfs(root.left,targetSum - root.val) + dfs(root.right, targetSum - root.val);
        return ret;
    }
}
```

## 5、[1372. 二叉树中的最长交错路径](https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/)

![](https://image.okzhp.xyz/img/20240131191220.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    int ans;
    public int longestZigZag(TreeNode root) {
        ans = 0;
        dfs(root,true,0);
        dfs(root,false,0);        
        return ans;
    }
    //left true代表向左，false代表向右,len代表路径长度
    public void dfs(TreeNode root,boolean left,int len){
        if(root == null) return;
        ans = Math.max(ans,len);
        if(left){
            //如果向左，且左节点存在
            if(root.left != null){
                dfs(root.left,false,len+1);
            }
            //如果存在右节点，就从这里开始从头算，既然选择了右节点，下一步只能向左
            if(root.right != null){
                dfs(root.right,true,1);
            }
        }else{
            if(root.right != null){
                dfs(root.right,true,len+1);
            }
            if(root.left != null){
                dfs(root.left,false,1);
            }
        }
    }
}
```

## 6、[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

![](https://image.okzhp.xyz/img/20240131191805.png)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        TreeNode ans = root;
        //广度搜索这棵树，对于每一层，如果找到了公共节点，记录这个节点，
        //并继续搜索下一层，直到下一层找不到公共节点了，说明上一个节点就是最深的那个公共节点，即最近祖先
        while(!queue.isEmpty()){
            int size = queue.size();
            //flag代表这一层是否找到了公共祖先
            boolean flag = false;
            while(size-- > 0){
                TreeNode cur = queue.poll();
                if(count(cur,p,q) == 2){
                    ans = cur;
                    flag = true;
                }
                if(cur.left != null)queue.offer(cur.left);
                if(cur.right != null)queue.offer(cur.right);
            }
            if(!flag)break;
        }
        return ans;
    }
    //查找root节点包含p和q的个数，如果为2则包含两个节点
    public int count(TreeNode root,TreeNode p,TreeNode q){
        if(root == null)return 0;
        int cnt = 0;
        if(root == p || root == q)cnt++;
        cnt += count(root.left,p,q) + count(root.right,p,q);
        return cnt;
    }
}
```

上边这么写，耗时一千多毫秒，肯定存在优化空间，直接看大佬的解法，耗时几毫米，速度提升几百倍，第一次感受到数量级差距这么明显！

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == p || root == q) return root;
        //在左子树中查找p和q的最近祖先，如果查不到，说明在右子树中
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        //在右树中查找p和q的最近祖先，如果查不到，说明在左子树中
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        //left为null代表，p、q都在右子树
        if(left == null) return right;
        //right为null代表 p、q都在左子树
        if(right == null) return left;
        //left和right都不为null，说明左右子树各有一个，那么最近祖先就是root
        return root;
    }
}
```

# 广度优先搜索BFS

## 1、[199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

![](https://image.okzhp.xyz/img/20240131220903.png)

我个人觉得，广度优先搜索比深度优先搜索具有更统一的模板，它会使用固定的数据结构——队列，固定的代码模板，好好思考一下其原理，并多做几道类似的题，基本就能稳稳掌握BFS了。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if(root == null)return ans;
        //固定格式，将root放到队列中
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        //当队列不为空时
        while(!queue.isEmpty()){
            //首先获取队列size，这是该层的节点数量，通过一个while处理这size个元素，即这一层的元素
            int size = queue.size();
            boolean left = true;
            while(size-- > 0){
                //出队节点
                TreeNode cur = queue.poll();
                if(left){
                    ans.add(cur.val);
                    left = false;
                }
                //如果节点左右节点不为空，将其加入到队列中，
                //先加right即为从右边开始处理，先加left是从左边开始处理
                //这里根据需求来定
                if(cur.right != null)queue.offer(cur.right);
                if(cur.left != null)queue.offer(cur.left);
            }
        }
        return ans;
    }
}
```

## 2、[1161. 最大层内元素和](https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/)

![](https://image.okzhp.xyz/img/20240131223117.png)

但凡涉及到每层元素的问题，首先考虑BFS

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxLevelSum(TreeNode root) {
        int ans = -1;
        int max = Integer.MIN_VALUE;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        //seq代表层数
        int seq = 0;
        while(!queue.isEmpty()){
            seq++;
            int size = queue.size();
            int sum = 0;
            while(size-- > 0){
                TreeNode cur = queue.poll();
                sum += cur.val;
                if(cur.left != null)queue.offer(cur.left);
                if(cur.right != null)queue.offer(cur.right);
            }
            if(sum > max){
                max = sum;
                ans = seq;
            }
        }
        return ans;
    }
}
```

也可以使用深度优先搜索，dfs总是和递归一起使用，而且需要定义dfs函数，dfs函数有多种定义方式都可以实现，但若定义不好，也会使问题变复杂，因此dfs一定要好好考虑如何定义dfs函数，包括返回值类型，以及方法签名。dfs感觉没有什么捷径，只能多做多练多总结。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    List<Integer> sumList = new ArrayList<>();
    public int maxLevelSum(TreeNode root) {
        dfs(root,0);
        int ans = 0;
        for(int i = 0; i < sumList.size(); i++){
            if(sumList.get(i) > sumList.get(ans)){
                ans = i;
            }
        }
        return ans + 1;
    }
    public void dfs(TreeNode root,int level){
        if(root == null) return;
        if(level >= sumList.size()){
            sumList.add(root.val);
        }else{
            sumList.set(level,sumList.get(level) + root.val);
        }
        dfs(root.left,level + 1);
        dfs(root.right,level + 1);
    }
}
```

# 二叉搜索树

`二叉搜索树`（BST，Binary Search Tree），也称`二叉排序树`或`二叉查找树`。  
二叉搜索树：一棵二叉树，可以为空；如果不为空，满足以下性质：

1. 非空左子树的所有键值小于其根结点的键值。

2. 非空右子树的所有键值大于其根结点的键值。

3. 左、右子树都是二叉搜索树。

## 1、[700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)

![](https://image.okzhp.xyz/img/20240131225807.png)

递归方式，突然发觉一个道理：dfs是通过递归实现的，但递归并非就是dfs。

递归的代码非常简洁优雅。当然还可以通过第二个方法——迭代的方式实现

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if(root == null || root.val == val)return root;
        if(root.val < val)return searchBST(root.right,val);
        return searchBST(root.left,val);
    }
}
```

```java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        TreeNode cur = root;
        while(true){
            if(cur == null || cur.val == val)return cur;
            if(val > cur.val){
                cur = cur.right;
            }else{
                cur = cur.left;
            }
        }
    }
}
```

## 2、[450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)

![](https://image.okzhp.xyz/img/20240201004642.png)

牛鬼蛇神大法：

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if(root == null)return null;
        if(root.val == key){
            dfs(root,0);
            return rebuild();
        }
        //pre存储目标节点的父节点，left代表是左节点，rigth代表是右节点
        TreeNode pre = null,cur = root;
        boolean left = false;
        boolean right = false;
        while(true){
            if(cur == null){
                return root;
            }
            if(cur.val == key){
                dfs(cur,0);
                if(left){
                    pre.left = rebuild();
                }else{
                    pre.right = rebuild();
                }
                return root;
            }
            pre = cur;
            if(cur.val > key){
                left = true;
                right = false;
                cur = cur.left;
            }else{
                right = true;
                left = false;
                cur = cur.right;
            }
        }
    }
    //dfs用于将root节点的所有子节点添加到record中，不包括root节点
    Deque<TreeNode> record = new ArrayDeque();
    public void dfs(TreeNode root,int depth){
        if(root == null)return;
        if(depth != 0)record.offer(root);
        dfs(root.left,depth + 1);
        dfs(root.right,depth + 1);
    }
    //rebuild根据record中的节点重建二叉树
    public TreeNode rebuild(){
        TreeNode root = record.poll();
        while(!record.isEmpty()){
            TreeNode cur = record.poll();
            rebuildHelper(root,cur);
        }
        return root;
    }
    //rebuildHelper将target节点放到root节点下合适的位置
    public void rebuildHelper(TreeNode root,TreeNode target){
        if(root.val > target.val){
            if(root.left == null)root.left = target;
            else rebuildHelper(root.left,target);
        }
        if(root.val < target.val){
            if(root.right == null) root.right = target;
            else rebuildHelper(root.right,target);
        }
    }
}
```

二叉树会经常用到递归！！！！考虑函数的定义，并递归使用，官方递归：

```java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if(root == null) return null;
        if(root.val > key){
            root.left = deleteNode(root.left,key);
        }
        if(root.val < key){
            root.right = deleteNode(root.right,key);
        }
        if(root.val == key){
            if(root.left == null)return root.right;
            if(root.right == null)return root.left;
            //继任者 从右节点中选一个最小的值，其满足大于所有左节点及其子节点，并且小于所有右节点，因此将其作为继任者
            TreeNode successor = root.right;
            while(successor.left != null){
                successor = successor.left;
            }
            //将继任者从右子树中删除
            root.right = deleteNode(root.right,successor.val);
            //继任者的左右节点和root一样，并返回继任者即可
            successor.left = root.left;
            successor.right = root.right;
            return successor;
        }
        return root;
    }
}
```



