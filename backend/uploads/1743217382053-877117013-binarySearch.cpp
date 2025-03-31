#include<iostream>
#include<vector>
using namespace std;

int binarySearch(int target, vector<int> &arr){
    int s = 0;
    int e = arr.size() - 1;

    while(s <= e){
        int mid = (s+e)/2;

        if(arr[mid] == target){
            return mid;
        }
        else if(target > arr[mid]){
            s = mid + 1;
        }
        else{
            e = mid -1;
        }
    }
    return -1;
}


int main(){

    int num = 5;
    vector<int> arr = {3,5,8,10,34};

    int index = binarySearch(num, arr);


    cout<<"The number is at '"<<index<<"'th index"<<endl;

    return 0;
}