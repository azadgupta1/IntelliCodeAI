#include<iostream>
#include<vector>
#include<climits>
using namespace std;


int main(){
    vector<int> arr = {2,4,6,-1,4,6,3,8,0,1};

    int n = arr.size();
    int start = 0,   k = 4;
    int windowSum = 0,    maxSum = INT_MIN;

    for(int end = 0; end<n; end++){
        windowSum += arr[end];

        if(end-start+1 == k){
            maxSum = max(maxSum, windowSum);
            windowSum -= arr[start];
            start++;
        }
    }

    cout<<"MaxSum is : "<<maxSum<<endl;
}