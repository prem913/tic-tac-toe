const combinations=[
    [1,1,1,
     0,0,0,
     0,0,0
    ],
    [0,0,0,
    1,1,1,
    0,0,0],
    [
    0,0,0,
    0,0,0,
    1,1,1
    ],
    [
    1,0,0,
    1,0,0,
    1,0,0
    ],
    [
    0,1,0,
    0,1,0,
    0,1,0
    ],
    [
    0,0,1,
    0,0,1,
    0,0,1
    ],
    [
    1,0,0,
    0,1,0,
    0,0,1
    ],
    [
    0,0,1,
    0,1,0,
    1,0,1
    ]
]
const getLength=(arr,key)=>{
    let l=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==key) l++;
    }
    return l;
}
export const check =async(arr,callback)=>{
    for(let i=0;i<combinations.length;i++){
        let pre=-2;
            let s=1;
        for(let j=0;j<9;j++){
            if(combinations[i][j]){
                if(pre===-2 && arr[j]!==-1){
                    pre=arr[j];
                    continue;
                }
                if(pre===arr[j]) s++;
            }
                if(s===3) return callback(pre);
        }
    }
    if(getLength(arr,-1)===9){
        return callback(2)
    }
    return false;
}