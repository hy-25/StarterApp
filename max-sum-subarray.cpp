
//maximum sum subarray

//Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
//Output: 6
//Explanation: The contiguous subarray [4, -1, 2, 1] has the maximum sum (4 + (-1) + 2 + 1 = 6).


#include <bits/stdc++.h>
using namespace std;


vector<int> getInput(){
    int length = 0;
    cin>>length;
    
    vector<int> inputArr;
    
    for(int i =0;i<length;i++){
        int temp;
        cin>>temp;
        
        inputArr.push_back(temp);
    }
    
    return inputArr;
}

int main() {
    
    vector<int> input = getInput();
    
    
    
    //maximumSumSubarray
    
    int maxSum = 0;
    int curSum = 0;
    
    for(int i =0;i<input.size();i++){
         curSum+=input[i];
        
        if(curSum > maxSum){
            maxSum = curSum;
        }
        
        if(curSum < 0){
            curSum = 0;
        }
        
    }
    
    cout<< maxSum<<endl;
    

}
