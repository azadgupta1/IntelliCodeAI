#include<iostream>
using namespace std;
int main(){
    int n,i,j;
    cout<<"Enter the number of the rows"<<endl;
    cin>>n;
    i = 1;
    while(i<=n){
        int spaces = n-i;
        while(spaces){
            cout<<" ";
            spaces = spaces - 1;
        }
         j = 1;
        while(j<=i){
            cout<<"*";
            j = j + 1;
        }
        cout<<endl;
        i = i + 1;
    }
}