const myForm = document.getElementById('my-form');
const sellingPrice = document.getElementById('num');
const productName = document.getElementById('name');

myForm.addEventListener('submit',onSubmit);

var sum = 0;

function onSubmit(e){
    e.preventDefault();

    const price = sellingPrice.value;
    const product = productName.value;

    const obj = {
        price,
        product
    }

    axios.post("https://crudcrud.com/api/eff5d1d9b169497691f59228c0be0b67/data",obj)
    .then(res => {
        // console.log(res)
        showProducts(res.data);
    })
    .catch(err => {
        console.error(err); 
    })
}

window.addEventListener('DOMContentLoaded',()=>{
    const data = axios.get("https://crudcrud.com/api/eff5d1d9b169497691f59228c0be0b67/data")
    .then(res => {
        // console.log(res)
        for(var i = 0;i<res.data.length;i++){
            //showProducts();
            showProducts(res.data[i]);
        }
    })
    .catch(err => {
        console.error(err); 
    })
})

function showProducts(ob){
    const parentEl = document.getElementById('products');
    const childEl = document.createElement('li');

    const txt = document.getElementById('price2');

    const deleteEl = document.createElement('input');
    deleteEl.type = 'button';
    deleteEl.value = 'Delete Product';

    deleteEl.onclick = () =>{

        axios.delete(`https://crudcrud.com/api/eff5d1d9b169497691f59228c0be0b67/data/${ob._id}`)
        .then(res => {
            console.log(res);
            parentEl.removeChild(childEl);
        })
        .catch(err => {
            console.error(err); 
        })

    }


    childEl.textContent = ob.price + " - "+ ob.product+" ";
    childEl.appendChild(deleteEl);

    parentEl.appendChild(childEl);


}