#include<iostream>
using namespace std;


int main(){
    int x,y;
    cin>>x>>y;

    int res = 0;

    while(x <= y){
        x = x*3;
        y = y*2;

        res++;
    }

    cout<<res;
}