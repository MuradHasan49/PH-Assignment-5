function showdata (){
    let api = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(api)
    .then(res=>res.json())
    .then(data=>{
     for (let i of data.data){
        let vlidation = i.status == 'open'
        if (vlidation){
            console.log(i)
        }else{
            console.log("not")
        }
     }
    })
}
showdata()