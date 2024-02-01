# Leetcode 图


# [LeetCode75-面试必考精华版](https://leetcode.cn/studyplan/leetcode-75/)

## 1、[841. 钥匙和房间](https://leetcode.cn/problems/keys-and-rooms/)

![](https://image.okzhp.xyz/img/20240201111516.png)

BFS，queue中存储钥匙，初始要将第一个房间标为已访问

```java
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        boolean[] visit = new boolean[rooms.size()];
        Deque<Integer> queue = new ArrayDeque();
        queue.addAll(rooms.get(0));
        visit[0] = true;
        while(!queue.isEmpty()){
            int cur = queue.poll();
            if(visit[cur])continue;
            visit[cur] = true;
            queue.addAll(rooms.get(cur));
        }
        for(boolean v : visit){
            if(!v)return false;
        }
        return true;
    }
```

BFS，queue中存未访问的房间号

```java

    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        boolean[] visit = new boolean[rooms.size()];
        Deque<Integer> queue = new ArrayDeque();
        queue.offer(0);
        while(!queue.isEmpty()){
            int cur = queue.poll();
            visit[cur] = true;
            for(int n : rooms.get(cur)){
                if(!visit[n])queue.offer(n);
            }
        }
        for(boolean v : visit){
            if(!v)return false;
        }
        return true;
    }
```

DFS，

```java
    int num;
    boolean[] visit;
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        visit = new boolean[n];
        num = 0;
        dfs(rooms,0);
        return num == n;
    }
    public void dfs(List<List<Integer>> rooms,int n){
        num++;
        visit[n] = true;
        for(int key : rooms.get(n)){
            if(!visit[key]){
                dfs(rooms,key);
            }
        }
    }
```

## 2、[547. 省份数量](https://leetcode.cn/problems/number-of-provinces/)

![](https://image.okzhp.xyz/img/20240201163251.png)

遇到图和二叉树，首先考虑dfs，bfs，根据经验来看，能使用dfs解决的通常也能使用bfs，反之亦然。

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int ans = 0;
        boolean[] visit = new boolean[n];
        for(int i = 0;i < n;i++){
            if(!visit[i]){
                dfs(isConnected,visit,i);
                ans++;
            }
        }
        return ans;
    }
    public void dfs(int[][] isConnected,boolean[] visit,int i){
        visit[i] = true;
        for(int j = 0; j < visit.length; j++){
            if(isConnected[i][j] == 1 && !visit[j]){
                dfs(isConnected,visit,j);
            }
        }
    }
}
```

bfs，虽然是不同的解法，但大体的思路是一致的，即通过搜索，将所有连通的元素标记访问，每完成一次搜索，结果加一

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int ans = 0;
        boolean[] visit = new boolean[n];
        Queue<Integer> queue = new LinkedList();
        for(int i = 0;i < n;i++){
            if(!visit[i]){
                queue.offer(i);
                while(!queue.isEmpty()){
                    int cur = queue.poll();
                    for(int j = 0; j < n; j++){
                        if(isConnected[cur][j] == 1 && !visit[j]){
                            visit[j] = true;
                            queue.offer(j);
                        }
                    }
                }
                ans++;
            }
        }
        return ans;
    }

}
```



# 图-BFS

## 1、[1926. 迷宫中离入口最近的出口](https://leetcode.cn/problems/nearest-exit-from-entrance-in-maze/)

![](https://image.okzhp.xyz/img/20240201204028.png)

```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int m = maze.length;
        int n = maze[0].length;
        Queue<int[]> queue = new LinkedList();
        queue.offer(entrance);
        maze[entrance[0]][entrance[1]] = 'v';
        int ans = 0;
        int[] dx = {1,-1,0,0};
        int[] dy = {0,0,1,-1};
        while(!queue.isEmpty()){
            ans++;
            int size = queue.size();
            while(size-- > 0){
                int[] cur = queue.poll();
                for(int i = 0; i < 4; i++){
                    int x = cur[0] + dx[i];
                    int y = cur[1] + dy[i];
                    if(x >= 0 && x < m && y >= 0 && y < n && maze[x][y] == '.'){
                        if(x == 0 || x == m-1 || y == 0 || y == n-1 ){
                            return ans;
                        }
                        maze[x][y] = 'v';
                        queue.offer(new int[]{x,y});
                    }
                }
            }
        }
        return -1;
    }
}
```

## 2、[994. 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)

![](https://image.okzhp.xyz/img/20240201211955.png)

```java
class Solution {
    public int orangesRotting(int[][] grid) {
        int ans = 0,m = grid.length,n = grid[0].length;
        int[] dx = {1,-1,0,0};
        int[] dy = {0,0,1,-1};
        Queue<int[]> queue = new LinkedList();

        boolean existsFresh = false;
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                if(grid[i][j] == 1) existsFresh = true;
                else if(grid[i][j] == 2)queue.offer(new int[]{i,j});
            }
        }
        //如果一开始就不存在新鲜橘子，直接返回0
        if(!existsFresh)return 0;

        while(!queue.isEmpty()){
            int size = queue.size();
            while(size-- > 0){
                int[] cur = queue.poll();
                for(int i = 0; i < 4; i++){
                    int nextX = cur[0] + dx[i];
                    int nexty = cur[1] + dy[i];
                    if(nextX >= 0 && nextX < m && nexty >= 0 && nexty < n && grid[nextX][nexty] == 1){
                        grid[nextX][nexty] = 2;
                        queue.offer(new int[]{nextX,nexty});
                    }
                }
            }
            ans++;
        }
        //如果感染后，仍存在新鲜橘子，返回-1
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                if(grid[i][j] == 1)return -1;
            }
        }

        return ans-1;

    }
}
```



