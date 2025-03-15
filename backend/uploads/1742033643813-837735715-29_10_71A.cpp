#include<iostream>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        string s;
        cin>>s;

        int len = s.length();

        if(len <= 10){
            cout<<s<<endl;
        }else{
            string res = "";
            res = s[0]+to_string(len-2)+s[len-1];
            cout<<res<<endl;
        }
    }
}