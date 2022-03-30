let products = JSON.parse(localStorage.getItem("products"))
? JSON.parse(localStorage.getItem("products"))
: [
    {
        title: "chic-shirt",
        category: "tops",
        price: "399",
        img: "https://i.postimg.cc/Y0WgG0q8/shirt.jpg",
    },
    {
        title: "chic leather jacket",
        category: "jackets",
        price: "450",
        img: "https://i.postimg.cc/pTNnN3gy/jacket.jpg",
    },{
        title: "brown pants",
        category: "bottoms",
        price: "299",
        img: "https://i.postimg.cc/GmJfs1jn/pants.jpg",
    },{
        title: "beige dress",
        category: "dresses",
        price: "180",
        img: "https://i.postimg.cc/3RP1cLZZ/dress.jpg",
    }
    ]
let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart")) :[];
//  read //

function readProducts(products) {
    document.querySelector("#products").innerHTML = "";
    products.forEach((product, i) => {
      document.querySelector("#products").innerHTML += `
        <div class="card">
  <img src="${product.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${ product.title }</h4>
    <h5>${product.category}</h5>
    <p class="card-text">R${product.price}</p>
    <div>
    <label class="form-label">Quantity:</label>
    <input type="number" min=1 value=1 id="addQTY${i}"/>
    </div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-modal${i}" >update</button>
    <button class="btn btn-danger" onclick="deleteProducts(${i})" >delete</button>
    <button class="btn btn-danger" onclick="addToCart(${i})" >add to cart</button>
  </div>
</div>
    <div class="modal fade" id="update-modal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">update a product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
      TITLE<input type="text" id="update-title${i}"/> <br>
      CATEGORY<select name="category" id="update-category${i}"><br>
      <option value="select">-select one-</option><br>
      <option value="dresses">dresses</option>
      <option value="tops">tops</option>
      <option value="bottoms">bottoms</option>
      <option value="jackets">jackets</option>
    </select><br>
    PRICE<input type="text" id="update-price${i}" value=""/><br>
    IMG LINK<input type="text" id="update-img${i}" value=""/><br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="updateProducts(${i})" data-bs-toggle="modal" data-bs-target="#update-modal${i}">Save changes</button>
        </div>
      </div>
    </div>
    
  </div>
    `;
    });
  };
  readProducts(products);

  //create//

function createProducts(){
    let title = document.querySelector(`#update-title`).value;
    let category = document.querySelector(`#update-category`).value;
    let price = document.querySelector(`#update-price`).value;
    let img = document.querySelector(`#update-img`).value;
    try {
      if (!title || !price ||!img) throw new Error("No product to add !!!");
      products.push({
          title,
          category,
          price,
          img,
      });
      localStorage.setItem("products", JSON.stringify(products));
      readProducts(products);
      document.querySelector("#products").value = "";
    } catch (err) {
      alert(err);
    }
  }

  //delete//

function deleteProducts(i) {
    products.splice(i, 1);
    localStorage.setItem("#products", JSON.stringify(products));
    readProducts(products);
  }
  
  //update//

function updateProducts(i) {
  let title = document.querySelector(`#update-title${i}`).value;
  let category = document.querySelector(`#update-category${i}`).value;
  let price = document.querySelector(`#update-price${i}`).value;
  let img = document.querySelector(`#update-img${i}`).value;
    try {
      if (!title || !price || !img) throw new Error("please enter all fields to update!!!");
      products[i] = {
        title,
        category,
        price,
        img,
      };
      localStorage.setItem("products", JSON.stringify(products));
      readProducts(products);
    } catch (err) {
      alert(err);
    }
  }
  //  add to cart //
  
  function addToCart(i){
    let QTY = document.querySelector(`#addQTY${i}`).value;
    let added = false;
    cart.forEach(product => {
      if(product.title == products[i].title){
        product.QTY = parseInt(product.QTY) + parseInt(QTY)
        added = true
        localStorage.setItem("cart",JSON.stringify(cart));
      }
    })
    if (!added){
      cart.push({...products[i] ,QTY});
      localStorage.setItem("cart",JSON.stringify(cart));
    }
    
  }
  showCartBadge();
  
    //  cart badge //
    function showCartBadge() {
      document.querySelector("#badge").innerHTML = cart ? cart.length : "";
    }
  //  sort by category //
   function categorysort(){
     let category =document.querySelector("#categorysort").value;
      
     if(category=="all"){
       readProducts(products);
       return;
     }

     let filteredproducts=products.filter(product => {
       return product.category == category
     })
     readProducts(filteredproducts);
   }


  //  sort by price //

  function pricesort(){
    let direction = document.querySelector("#pricesort").value
    
    let sortedProducts = products.sort((a,b)=>a.price - b.price);

    console.log(sortedProducts);
    
    if(direction == "descending") sortedProducts.reverse();
    readProducts(sortedProducts);
  }
  //  sort by name //

  function Sortname(){
    let direction = document.querySelector("#Sortname").value;

    let sortedProducts = products.sort((a,b)=> {
      if (a.title.toLowerCase()<b.title.toLowerCase()){
        return -1 ;
      }
      if (a.title.toLowerCase()> b.title.toLowerCase()){
        return 1 ;
      }
      return 0 ;
    });
    if (direction == "descending") sortedProducts.reverse();
    console.log(sortedProducts);
    readProducts(products);
    
  }