// #include <bits/stdc++.h>
// using namespace std;

// int n, m;
// vector<vector<int>> g;
// vector<int> p, sz;
// vector<bool> act;
// vector<long long> comp;

// int findp(int x) {
//     return p[x] == x ? x : p[x] = findp(p[x]);
// }

// bool unite(int a, int b) {
//     a = findp(a);
//     b = findp(b);
//     if (a == b) return false;
//     if (sz[a] < sz[b]) swap(a, b);
//     p[b] = a;
//     sz[a] += sz[b];
//     return true;
// }

// int main() {
//     ios::sync_with_stdio(false);
//     cin.tie(NULL);

//     cin >> n >> m;
//     g.assign(n+1, {});
//     for (int i = 0, u, v; i < m; i++) {
//         cin >> u >> v;
//         g[u].push_back(v);
//         g[v].push_back(u);
//     }

//     p.resize(n+1);
//     sz.assign(n+1, 1);
//     act.assign(n+1, false);
//     comp.assign(n+2, 0);

//     for (int i = 1; i <= n; i++) p[i] = i;

//     long long cur = 0;
//     for (int i = n; i >= 1; i--) {
//         cur++;
//         act[i] = true;
//         for (int v : g[i]) {
//             if (act[v] && unite(i, v)) {
//                 cur--;
//             }
//         }
//         comp[i] = cur;
//     }
//     comp[n+1] = 0;

//     for (int i = 1; i <= n; i++) {
//         cout << comp[i+1] << "\n";
//     }

//     return 0;
// }


#include <bits/stdc++.h>
using namespace std;

int p[100001], r[100001], res[100001];
bool e[100001];
vector<int> g[100001];

int f(int u) {
    return p[u] == u ? u : p[u] = f(p[u]);
}

void mi(int u, int v, int &c) {
    u = f(u), v = f(v);
    if (u != v) {
        if (r[u] < r[v]) swap(u, v);
        p[v] = u;
        if (r[u] == r[v]) r[u]++;
        c--;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) {
        p[i] = i;
        r[i] = 0;
    }
    for (int i = 0; i < m; ++i) {
        int a, b;
        cin >> a >> b;
        if (a > b) swap(a, b);
        g[a].push_back(b);
        g[b].push_back(a);
    }
    int c = 0;
    for (int i = n; i >= 1; --i) {
        e[i] = true;
        c++;
        for (int v : g[i]) {
            if (e[v]) {
                mi(i, v, c);
            }
        }
        res[i] = c;
    }
    for (int i = 1; i <= n; ++i) {
        cout << res[i] << "\n";
    }
    return 0;
}