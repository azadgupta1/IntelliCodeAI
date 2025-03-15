#include<iostream>
using namespace std;

int main(){
    int t;
    int cnt = 0;
    cin>>t;

    while(t--){

        int sol[3];

        for(int i = 0; i<3; i++){
            cin>>sol[i];
        }
        
        int max = 0;

        for(int i = 0; i<3; i++){
            if(sol[i] == 1){
                max++;
            }
        }
        if(max >= 2){
                cnt++;
        }
    }

    cout<<cnt;
}