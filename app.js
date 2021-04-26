(function(){
    let list = [];
    let cart = [];
    let id = "products";
    const productsElement = document.getElementById(id);
    let obj={
        init: function(){
            this.fetchProducts();
            this.showSearch();
            this.viewProducts(list);
        },
        showSearch: function(){
            
            header = document.createElement("h1");
            header.setAttribute("id","h1");
            header.innerText = "Products Page:";
            productsElement.appendChild(header);

            input =  document.createElement("input");
            input.setAttribute('type', 'text');
            input.setAttribute("placeholder","Search Products...");
            productsElement.appendChild(input); 
            input.addEventListener("keyup", (e)=> {
                searchText = e.target.value;
                if(searchText.length != 0 ){ 
                    this.viewProducts(list.filter(v => v.name.indexOf(searchText) != -1) );
                }else{
                    this.viewProducts(list);
                }

            })
            button = document.createElement('button');
            button.setAttribute("id","cart");
            productsElement.appendChild(button);
            this.updateCartItems(cart);
            
            textNode = document.createElement("br");
            productsElement.appendChild(textNode);
            
            //Add EventListener
            button.addEventListener("click", (e) => {
                this.viewCart(cart);
            });
        },
        fetchProducts: function(){
            console.log("Fetching product list");
            /* Adding some dummy products or even can be fetched from API */
            let product = { name: "Product 1" , price: 20.5 , discription: 'Used for home purpose'};
            list.push(product);
            product = { name: "Product 2" , price: 40.5 , discription: 'Used for commercial purpose'};
            list.push(product);
            product = { name: "Product 3" , price: 90.5 , discription: 'Used for party purpose'};
            list.push(product);
            product = { name: "Product 4" , price: 100.5 , discription: 'Used for party purpose'};
            list.push(product);
        },
        viewProducts: function(list,type){
            type = type ?? "product";
            //Rendering the products available in list along with search option
            console.log("View product list : " + list);
            header = document.getElementById("h1");
            header.innerText = type=="cart" ? "Cart Page : " : " Products Page : ";

            let div,textNode,count = 0;
            divElements = document.querySelectorAll("div.product");
            divElements.forEach(ele => ele.remove());
            divElements = document.querySelectorAll("div.cart");
            divElements.forEach(ele => ele.remove());
            checkout=document.querySelector("button.checkout");
            if(checkout) checkout.remove();
            total=document.querySelector("#total");
            if(total) total.remove();

            list.forEach( v => {
                div = document.createElement("div");
                div.setAttribute("class",type);
                textNode = document.createTextNode("Name: " + v.name );
                div.appendChild(textNode);
                textNode = document.createElement("br");
                div.appendChild(textNode);
                textNode = document.createTextNode("Discription: "+ v.discription );
                div.appendChild(textNode);
                textNode = document.createElement("br");
                div.appendChild(textNode);
                textNode = document.createTextNode("Price: " + v.price);
                div.appendChild(textNode);
                textNode = document.createElement("br");
                div.appendChild(textNode);
                button = document.createElement('button');
                button.setAttribute("id",v.name);
                
                if(type == "product"){
                    buttonText = document.createTextNode("Add to Cart");
                    button.appendChild(buttonText);
                    div.appendChild(button);
                    textNode = document.createElement("br");
                    div.appendChild(textNode);
                    productsElement.appendChild(div);
                    //Add EventListener
                    button.addEventListener("click", (e) => {
                        this.addToCart(list[this.searchProduct(e.currentTarget.getAttribute("id"))]);
                    });
                }else{
                    buttonText = document.createTextNode("Remove from Cart");
                    button.appendChild(buttonText);
                    div.appendChild(button);
                    textNode = document.createElement("br");
                    div.appendChild(textNode);
                    productsElement.appendChild(div);
                    //Add EventListener
                    button.addEventListener("click", (e) => {
                        this.removeFromCart( this.searchCart(e.currentTarget.getAttribute("id")) ) ;
                    });
                }
            });
            button = document.createElement('button');
            button.setAttribute("class","checkout");
            if(type == "cart" && cart.length != 0){
                buttonText = document.createTextNode("Checkout");
                button.appendChild(buttonText);
                productsElement.appendChild(button);
                
                p = document.createElement("p");
                p.setAttribute("id","total");
                productsElement.appendChild(p);

                this.updateTotalAmount(cart);
               
            }
        },
        viewCart: function(cart){
            console.log(cart);
            this.viewProducts(cart,"cart");

        },
        searchProduct: function(name){
            return list.findIndex( p => p.name === name );
        },
        searchCart: function(name){
            return cart.findIndex( p => p.name === name );
        },
        addToCart: function(value){
            console.log("addToCart" + value);
            cart.push(value); 
            this.updateCartItems(cart);
       },
       removeFromCart: function(index){
            cart.splice(index,1);
            this.viewCart(cart);
            this.updateCartItems(cart);
            if(cart.length == 0) this.viewProducts(list);
       },
       updateCartItems: function(cart){
           let cartElement = document.getElementById('cart');
           cartElement.innerText = " Cart Items : "+ cart.length;
       },
       updateTotalAmount: function(cart){
           total = document.getElementById('total');
           total.appendChild(document.createTextNode("Total Amount: " + cart.reduce( (acc, p) => acc += p.price, 0 )));

           
       }

    }
    obj.init();
})();
