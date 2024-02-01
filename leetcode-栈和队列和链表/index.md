# Leetcode 栈和队列和链表


# # [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

# 栈

## 1、[2390. 从字符串中移除星号](https://leetcode.cn/problems/removing-stars-from-a-string/)

![](https://image.okzhp.xyz/img/20240128221846.png)

```java
class Solution {
    //遍历字符串，不是星号就入栈，是星号就出栈，使用模拟栈即可，
    public String removeStars(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if(s.charAt(i) == '*'){
                sb.deleteCharAt(sb.length()-1);
            }else{
                sb.append(s.charAt(i));
            }
        }
        return sb.toString();
    }
}
```

## 2、[735. 小行星碰撞](https://leetcode.cn/problems/asteroid-collision/)

![](https://image.okzhp.xyz/img/20240128222121.png)

```java
class Solution {
    //addLast入栈 removeLast出栈 getLast==peek
    public int[] asteroidCollision(int[] asteroids) {
        LinkedList<Integer> stack = new LinkedList();
        for(int n : asteroids){
            if(n > 0){
                stack.addLast(n);
            }else{
                //负数，把所有大于0且小于负数绝对值的数都出栈，即爆炸消失
                while(stack.size() > 0 && stack.getLast() > 0 && Math.abs(stack.getLast()) < Math.abs(n)){
                    stack.removeLast();
                }
                //如果栈空了 或者栈顶是负数，将负数入栈
                if(stack.size() == 0 || stack.getLast() < 0){
                    stack.add(n);
                }
                //如果正负数相等，出栈 且不入栈 相当于两颗星球都爆炸
                else if(Math.abs(stack.getLast()) == Math.abs(n)){
                    stack.removeLast();
                }
            }
        }
        //使用流转成int数组
        return stack.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

## 3、[394. 字符串解码](https://leetcode.cn/problems/decode-string/)

![](https://image.okzhp.xyz/img/20240128222728.png)

```java
class Solution {
    public String decodeString(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for(char c : s.toCharArray()){
            if(c != ']'){
                stack.push(c);
            }else{
                StringBuilder sb = new StringBuilder();
                //将[]之间的字符记录下来
                while(!stack.isEmpty() && stack.peek() !=  '['){
                    sb.insert(0,stack.pop());
                }
                String tmp = sb.toString();
                sb.delete(0,sb.length());
                //弹出 '['
                stack.pop();
                //记录数字，可能是多位数字
                while( !stack.isEmpty() && stack.peek() >= '0' && stack.peek() <= '9' ){
                    sb.insert(0,stack.pop());
                }
                int cnt = Integer.valueOf(sb.toString());
                //将前面记录的[]之间的字符串重复若干次
                while(cnt > 0){
                    for(char cc : tmp.toCharArray()){
                        stack.push(cc);
                    }
                    cnt--;
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        while(stack.size()>0){
            sb.insert(0,stack.pop());
        }
        return sb.toString();
    }
}
```



# 队列

## 1、[933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/)

![](https://image.okzhp.xyz/img/20240128224816.png)

```java
class RecentCounter {

    Queue<Integer> queue; 

    public RecentCounter() {
        queue = new LinkedList<>();
    }

    public int ping(int t) {
        queue.offer(t);
        while(t - queue.peek() > 3000){
            queue.poll();
        }
        return queue.size();
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * RecentCounter obj = new RecentCounter();
 * int param_1 = obj.ping(t);
 */
```

## 2、[649. Dota2 参议院](https://leetcode.cn/problems/dota2-senate/)

![](https://image.okzhp.xyz/img/20240128234135.png)

```java
class Solution {
    //模拟 
    public String predictPartyVictory(String senate) {
        int len = senate.length();
        //ban代表权力被禁止
        boolean[] ban = new boolean[len];
        while(true){
            //进行多轮模拟
            for(int i = 0; i < len; i++){
                //如果权力被禁止 直接跳过
                if(ban[i])continue;
                char cur = senate.charAt(i);
                //尝试行使胜利权力
                if(victory(cur,senate,ban)){
                    return cur == 'R' ?"Radiant":"Dire";
                }
                //如果没有胜利，就行使禁止权力，最优的禁止即下一位对方选手，因此需要将当前下标传过去
                ban(cur,senate,ban,i);
            }
        }
    }
    //行使胜利，如果所有对手权力都被禁止，则胜利
    public boolean victory(char cur,String senate,boolean[] ban){
        for(int i = 0; i < ban.length; i++){
            if(cur != senate.charAt(i) && !ban[i]){
                return false;
            }
        }
        return true;
    }
    //行使禁止，从当前下标的下一个开始禁止，如果到结束没有禁止，则从头开始再禁止
    public void ban(char cur,String senate,boolean[] ban,int index){
        boolean flag = false;
        for(int i = index + 1; i < ban.length; i++){
            if(cur != senate.charAt(i) && !ban[i]){
                ban[i] = true;
                flag = true;
                break;
            }
        }
        if(!flag){
            for(int i = 0; i < index; i++){
                if(cur != senate.charAt(i) && !ban[i]){
                    ban[i] = true;
                    break;
                }
            }
        }
    }
}
```

上边这种“歪门邪道”是我独创的，官方的解法则使用队列，将双方放到两个队列中，每次出队，比较其出场顺序，出场顺序小的代表先行使权力，会将对方禁止，而自己本身则会再次入队，等待下次行使权力，而出队即代表被禁止。最后哪个队列为空，则对方赢。

```java
class Solution {
    public String predictPartyVictory(String senate) {
        int n = senate.length();
        Queue<Integer> radiant = new ArrayDeque<>();
        Queue<Integer> dire = new ArrayDeque<>();
        for(int i = 0; i < n; i++){
            if(senate.charAt(i) == 'R')radiant.offer(i);
            else dire.offer(i);
        }
        while(!radiant.isEmpty()&&!dire.isEmpty()){
            int r = radiant.poll(),d = dire.poll();
            if(r < d){
                radiant.offer(r + n);
            }else{
                dire.offer(d + n);
            }
        }
        return radiant.isEmpty()?"Dire":"Radiant";
    }

}
```

# 链表

## 1、[2095. 删除链表的中间节点](https://leetcode.cn/problems/delete-the-middle-node-of-a-linked-list/)

![](https://image.okzhp.xyz/img/20240129105417.png)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    //此题关键是找到中间节点的前置节点，通过将前置节点的next指向下下一个节点，即可实现删除下一个节点
    //使用快慢指针，快指针每次走两步，慢指针每次走一步，同时记录慢指针前驱节点。
    //最后使用pre.next = pre.next.next来删除中间节点
    public ListNode deleteMiddle(ListNode head) {
        if(head.next == null) return null;
        ListNode pre = null;
        ListNode slow = head, quick = head;
        while(quick != null && quick.next != null){
            pre = slow;
            slow = slow.next;
            quick = quick.next.next;
        }
        pre.next = pre.next.next;
        return head;
    }
}
```

## 2、[328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)

![](https://image.okzhp.xyz/img/20240129112536.png)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    //先获取第一二个节点，分别为pre,cur，先把一指向三，再把二指向四，同时将pre指向三节点，cur指向四节点
    public ListNode oddEvenList(ListNode head) {
        if(head == null || head.next == null)return head;
        ListNode pre = head, cur = head.next, tmp = cur;
        while(true){
            if(cur == null ||cur.next == null)break;
            pre.next = cur.next;
            pre = pre.next;
            cur.next = pre.next;
            cur = cur.next;
        }
        pre.next = tmp;
        return head;
    }
}
```

## 3、[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

![](https://image.okzhp.xyz/img/20240129113937.png)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    //定义前驱节点、当前节点、临时节点 三个变量，每次使用临时节点记录当前节点的下一个节点，然后当前节点指向前驱节点，
    //然后更新前驱节点为当前节点，当前节点为临时节点
    public ListNode reverseList(ListNode head) {
        ListNode pre = null,cur = head,tmp = null;
        while(cur != null){
            tmp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = tmp;
        }
        return pre;
    }
}
```

## 4、[2130. 链表最大孪生和](https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list/)

![](https://image.okzhp.xyz/img/20240129121620.png)

这种方式会超时，但可以考虑一下这种思路

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    //这种方式会超时，主要思想是先找到链表中点，将链表分为两段，
    //遍历前半段，下标为i，则孪生节点在后半段需要走n/2-i-1步，计算其和，综合时间复杂度O(n^2)，
    public int pairSum(ListNode head) {
        int n = 0,ans = Integer.MIN_VALUE;
        ListNode slow = head,fast = head;
        while(fast != null){
            slow = slow.next;
            fast = fast.next.next;
            n += 2;
        }
        for(int i = 0; i < n/2; i++){
            ListNode cur = slow;
            int sum = 0;
            sum += head.val;
            head = head.next;

            int j = n/2 - i - 1;
            while(j > 0){
                cur = cur.next;
                j--;
            }
            sum += cur.val;
            ans = Math.max(ans,sum);
        }
        return ans;
    }
}
```

第二种方法，是反转后半段链表，然后同步遍历前半段链表和反转后的后半段链表即可

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public int pairSum(ListNode head) {
        int n = 0,ans = Integer.MIN_VALUE;
        ListNode slow = head,fast = head,pre = null;
        //这种方式 slow将停在中间或者后半段第一个节点，由于是偶数个，那就是后半段第一个
        while(fast != null){
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        //将前半段链表和后半段链表断开
        pre.next = null;
        //反转后半段链表，pre即反转后半段链表后的第一个节点
        pre = reverseListNode(slow);
        //最后同步遍历两段链表即可
        while(head != null){
            int sum = head.val + pre.val;
            ans =Math.max(ans,sum);

            head = head.next;
            pre = pre.next;
        }
        return ans;

    }
    public ListNode reverseListNode(ListNode head){
        ListNode pre = null,tmp = null;
        while(head != null){
            tmp = head.next;
            head.next = pre;
            pre = head;
            head = tmp;
        }
        return pre;
    }
}
```



