let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let create=document.getElementById("create")
let search=document.getElementById("search")

let mood="create";
let temp;
let proData;
if(localStorage.getItem("product"))
{
    proData=JSON.parse(localStorage.product)
}
else{
    proData=[]
}
//get all data
function getTotal(){
    if(price.value!=""){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result
        total.style.backgroundColor="#040"
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor="rgb(190, 16, 48)"
    }
}

// save to local storage
create.addEventListener("click",()=>{
    let proObj={

        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(proObj.title!="" && proObj.price!="" && proObj.category!="" && proObj.count<100){
        if(mood=="create"){
            if(count.value > 1){
                for(let i=0 ; i<count.value ; i++)
                {
                proData.push(proObj)
                }
            }
            else{
            proData.push(proObj);
            }
        }
        else{
            proData[temp]=proObj
            mood="create";
            create.innerHTML="create"
            count.style.display="block"
            getTotal()
    
    
        }
        clearData();
    }
    localStorage.setItem("product",JSON.stringify(proData))

    showData()
})

// clear inputs
let clearData=()=>{
    title.value =""
    price.value =""
    taxes.value =""
    ads.value =""
    discount.value =""
    total.innerHTML =""
    count.value =""
    category.value =""
}
// create Table
let createTable=(products)=>{
    let table='';
    for(let i=0;i<products.length;i++){
        table+=`
        <tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateData(${i})" id="update"">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
    }
    document.querySelector("tbody").innerHTML=table
}
// display data
let showData=()=>{
    getTotal()
    createTable(proData)
    if(proData.length>0){
        document.getElementById("deleteAll").innerHTML=
        ` <td><button onclick="deleteAll()">delete all (${proData.length})</button></td>
        `
    }
    else{
        document.getElementById("deleteAll").innerHTML=""
    }
}
showData()

// delete data
let deleteData=(i)=>{
    proData.splice(i,1);
    localStorage.product=JSON.stringify(proData);
    showData();
    console.log(i)
}
let deleteAll=()=>{
    localStorage.removeItem("product");
    proData=[]
    showData()
}
// update data
let updateData=(i)=>{
    title.value=proData[i].title;
    price.value=proData[i].price;
    ads.value=proData[i].ads;
    taxes.value=proData[i].taxes;
    discount.value=proData[i].discount;
    getTotal();
    count.style.display="none";
    create.innerHTML="update";
    category.value=proData[i].category;
    mood="update";
    temp=i;
    localStorage.product=JSON.stringify(proData);
    window.scroll({
        top:0,
        behavior:'smooth'
    })

}
// searching

let searchMode="Title";

let getSearchMode=(id)=>{
    if(id=="searchTitle"){
        searchMode="Title"
    }
    else{
        searchMode="Category"
    }
    search.placeholder=`Search By ${searchMode}`
    search.focus()
    search.value="";
    showData()
}

let searchData=(value)=>{
    let searchpro=[]
    for(let i=0;i<proData.length;i++){
        if(searchMode=="Title"){
            if(proData[i].title.includes(value.toLowerCase())){
                    searchpro.push(proData[i])
            }

        }

        else{
            if(proData[i].category.includes(value.toLowerCase())){
                searchpro.push(proData[i])
            }
        }
    }
    createTable(searchpro)
}