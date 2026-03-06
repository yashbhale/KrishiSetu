#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin>>n;
    unordered_set<string> p;
    p.reserve(n*2);
    string s;
    for(int i=0;i<n;i++){
        cin>>s;
        p.insert(s);
    }

    const int M=100000;
    vector<bool> isp(M+1,true);
    isp[0]=isp[1]=false;
    for(int i=2;i*i<=M;i++) if(isp[i])
        for(int j=i*i;j<=M;j+=i) isp[j]=false;

    int ans=0;
    for(int i=2;i<=M;i++) if(isp[i]){
        s=to_string(i);
        for(int L=1, m=s.size();L<=m;L++){
            if(p.find(s.substr(0,L))!=p.end()){
                ans++;
                break;
            }
        }
    }
    cout<<ans;
    return 0;
}
