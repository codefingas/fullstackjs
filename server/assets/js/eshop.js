/*
    BUGS I NEED TO FIX:
    1. you have to clear cart before purchasing an item in other words the  cart variable is not empty or has not been set
    when you start the server. I have added a temporary lear cart button to control this for the meantime be sure to remove it,
     from line 168 & 263 including html after solving this
    2.the tag keeps adding repeatedly everytime you  click an item for purchase this should only happen once. then maybe another kind
    of animate.css wll appear to let you know that it has been increased, to solve this i thought of this:
     for the tag in Eshop i am thinkng of using do loop to monitor the buyers number of times he has purchased an i tem and 
     if it is more than once, i will just put the number of times close to the cart.
*/
var app = {
    cartCtrl: function () {
     //empty cart...
        'use strict';
    
        
     //an object constructor that we can use to create items...
        function Item(name, price, count, unit, img) {
            this.name = name;
            this.price = price;
            this.count = count;
            this.unit = unit;
            this.img = img;
        }
        var cart = [],
            removedItem;


     //adding items to cart .....
        function addItemToCart(name, price, count, unit, img) {
            var item = new Item(name, price, count, unit, img), i;
            for (i in cart) {
                if (cart[i].name === name) {
                    cart[i].count += count;
                    cart[i].price += price;
                    saveOurCart();
                    return;
                }
             }
             
             cart.unshift(item);
             saveOurCart();
             console.log(cart);
         }


     //removes an item from cart
     function removeAnItemFromCart(name) {
         for(var i in cart){
             if(cart[i].name === name){
                 cart[i].count--;
                 cart[i].price--;
                 if(cart[i].count === 0){
                     cart.splice(i, 1);
                 }
                 break; 
             }
         }
         saveOurCart();
     }

    
    //removeItemFromCartAll, all items....
    function removeItemFromCartAll(name){
        for(var i in cart){
            if(cart[i].name === name){
                /*assigning the removed item to undo variable*/
                removedItem = cart[i];
                /*End of assigning the removed item to undo variable*/
                cart.splice(i, 1);
                break;
            }
        }
        return removedItem;
     }

     //clear cart....
     function clearAllItemsFromCart(){
         cart = [];
         saveOurCart();
         console.log(cart);    
     }


     //clear totalCountOfItems
     function totalCountOfItems(){
         var total = 0;
         for(var i in cart){
             total += cart[i].count
         }
         return total;
     }


     function totalAmount(){
         var amount = 0;
         for(var i in cart){
             amount += cart[i].price * cart[i].count;
         }
         return amount;
     }

     //deliveryFee
     function deliveryFee(){
        var fee = 0;
         return fee;
     }


     //serviceCharge
     function serviceCharge(percent){
         var service = 0;
         service = (percent/100) * totalAmount();
         return service;
     }


     //grandTotal...fee and percent was passed cos they were passed intially
     function grandTotal(fee, percent){
         var grandTotal = 0;
         grandTotal = (totalAmount(0) + deliveryFee(0) + serviceCharge(10));

         return grandTotal;
     }


     //duplicateCart
     function duplicateCart(){
         var cartCopy = [];
         for(var i in cart){
             var item = cart[i];
             var itemCopy = {};
             for(var p in item){
                 itemCopy[p] = item[p];
             }
             cartCopy.push(itemCopy);
         }
         return cartCopy;
     }
     
    /*function for calculating the total amount of items bought without the extra charges*/
        function purchasedItemsAmount() {
            var amount = 0, cartArray = duplicateCart();
            for (var i in cartArray) {
                amount += cartArray[i].price * cartArray[i].count;
            }
            return amount;
        }
    
       

     //displayCartChanges....changes made in the cart
     function displayCartChanges() {

         var cartArray = duplicateCart();
         var output = '';

         if (cartArray.length == 0) {
             document.getElementById('checkout_buttons').style.display ="none";
            output = `<br/>
                        <li class="text-center"><h5 class="text-center"><b>You have not yet added an item</b></h5>
                            <button href="#products_showcase" class="checkout_btn" onclick="closeCartMenu();">
                            add an item.
                            </button>
                        </li>
                      <br/>`
        } else {
            document.getElementById('checkout_buttons').style.display ="block";
            document.getElementById('clear_cart1').style.display ="none";//removing the second clear cart button, this will be removed premernetly whne i figure out how things to debugg 1.
            for (var i in cartArray){
                /*replacing all the hypens with spaces*/
                var name = cartArray[i].name.replace(/-/g, " ");
                 /*End of replacing all the hypens with spaces*/
                //  amount += cartArray.price * cartArray.count;

                output += `<br/>
                <li class = "added_item">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-1 col-sm-1 col-xs-1">
                                <span>${cartArray[i].count}</span><span>X</span>
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3">
                                <img class="cart_image" src="${cartArray[i].img}"> 
                            </div>
                            <div  class="col-md-5 col-sm-5 col-xs-5">
                                <span class="item_cart_name"> ${name}</span>
                            </div>
                            <div  class="col-md-2 col-sm-2 col-xs-2">
                                <span>$${cartArray[i].price}</span>
                            </div>
                            <div  class="col-md-1 col-sm-1 col-xs-1">
                                <span class="remove fa fa-trash" data-action = ${cartArray[i].name}></span>
                            </div>
                        <div>
                    </div>
                </li>
                <div class="text-center hidden_items"><span  style="color: #D00">DELETED</span> <b class="float_right undo">undo</b></div>
                <br/>`;  //ES6 syntax
            };
 
         };
        var cartItems = document.getElementById('cartItems'),
            payoutCart = document.getElementById('payout_cart'),
            counter = document.getElementById('count'),
            checkout_count = document.getElementById('checkout_count'),
            totalAmount = document.getElementById('totalAmount'),
            checkout_totalAmount = document.getElementById('checkout_totalAmount'),
            cart_count = document.getElementById('cart_count'),
            small_cart_count = document.getElementById('small_cart_count'),
            cartList = document.getElementById("cartItems"),
            subtotal = document.getElementById('subtotal'),
            fullAmount = document.getElementById('fullAmount');


         cartItems.innerHTML = output;
         payoutCart.textContent = cartList.textContent;
         counter.innerHTML = totalCountOfItems();
         cart_count.innerHTML = totalCountOfItems();
         totalAmount.innerHTML =  grandTotal();
         checkout_count.innerHTML = totalCountOfItems();
         checkout_totalAmount.innerHTML = grandTotal();
         small_cart_count.innerHTML = totalCountOfItems();
         subtotal.innerHTML = purchasedItemsAmount();
         fullAmount.innerHTML = grandTotal();

         saveOurCart();
     };

    
     /*funtion for notifying users that they just deleted an item*/
     function cartDeleteNotification() {
         /*using jquery to show that an item has been deleted*/
            $(".deleted_class").fadeOut(3000);
         /*End of using jquery to show that an item has been deleted*/
     };
     /*End of funtion for notifying users that they just deleted an item*/

     /*function for hiding an item : it takes in the element's name then appends a class-name to it*/
     function hider(element) {
        element.classList += " hidden_items";
     };
     /*end of function for hiding an item*/


     //saveOurCart...when changes are made
     function saveOurCart(){
         localStorage.setItem("cartSystem", JSON.stringify(cart));
     }


     //loadOurCart
     function loadOurCart(){
         cart = JSON.parse(localStorage.getItem("cartSystem"));
     }


     /*getting all products and making it an array*/
     var products = Array.from(document.getElementById('products').querySelectorAll('.card'));
     /*End of getting all products and making it an array*/

     var removes = Array.from(document.querySelectorAll('.remove'));
     var clearCart = document.getElementById('clear_cart'),
         clear_cart1 = document.getElementById('clear_cart1');



     
     
     // console.log(products);

     function productHandler(){
        var name = this.getAttribute('data-name');
        var price = Number(this.getAttribute('data-price'));
        var unit = this.getAttribute('data-unit');
        var img = this.getAttribute('data-img');


       addTag(this.parentElement); 

        addItemToCart(name, price, 1, unit, img);

        displayCartChanges();

        //  console.log(this);
     }

     //removeHandler
     function removeHandler(){
         var name = this.getAttribute('data-action');
         
         removeItemFromCartAll;
     }
// 

     /*function for adding tag*/
     function addTag(element) {
         /*creating a span element and a i element and appending the i to the span*/
         var tag = document.createElement('span'),
             cartImage = document.createElement('i');
             tag.classList = "checked animated tada";
             cartImage.classList = "fa fa-shopping-cart";
             tag.appendChild(cartImage);
        /*end of creating a span element and a i element and appending the i to the span*/

        /*appending the tag to the clicked element*/
        element.insertBefore(tag, element.firstChild);
         /*End of appending the tag to the clicked element*/
     };
     /*End of function for adding tag*/

     /*function for knowing if an item has already been added*/

     /*End of function for knowing if an item has already been added*/


     products.forEach(function(product){
         product.addEventListener('click', productHandler);
     });

     removes.forEach(function(remove){
         document.addEventListener('click', remove, removeHandler)
     });

     document.addEventListener('click', function(e){
         /*setting the function to accept that the classname also includes fa fa-trash*/
         if(e.target.className !== 'remove fa fa-trash'){
             return;
         };
         /*End of setting the function to accept that the classname also includes fa fa-trash*/

         e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList += " deleted_class";/*adding a class naeme to the delete notifcation*/
         
        hider(e.target.parentElement.parentElement.parentElement);
         
         e.target.parentElement.remove();
         var name = e.target.getAttribute('data-action');

         


         removeItemFromCartAll(name);
         /*slowing down the cart change process and removing the delete notification*/
         cartDeleteNotification();
       setTimeout(displayCartChanges, 3000);
        /*End of slowing down the cart change process*/
     });


     /*adding the clearing funtionality to the clear cart button*/
     clearCart.addEventListener('click', function(){
         clearAllItemsFromCart();
         displayCartChanges();
     });

     clear_cart1.addEventListener('click', function(){
         clearAllItemsFromCart();
         displayCartChanges();
     });
     /*End of adding the clearing funtionality to the clear cart button*/


     loadOurCart();
     displayCartChanges();
     
   }
    
};