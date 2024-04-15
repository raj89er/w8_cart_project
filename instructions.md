
# TypeScript Shopping Cart Page

Using the OOP Cart designed in the previous night's homework, create a webpage. The webpage will first create a user by retrieving the name and age of the user from the web front end. It will then create Shop and Cart elements on the page. The Shop will show all the items in the shop and allow you to add them to the cart. The Cart portion will display the contents of the cart and display at a minimum the price and quantity of each item in the cart. Each Item in the cart will have a button to remove one of those items or remove all of those items from the cart. It should also display the total price of all the items in the cart. The Cart should update automatically whenever an item is added or removed from the cart. This project will require the use of Webpack.

## Step 1: Create A Typescript Project
- Create a node project by initializing npm in your project's folder.
- Make it a Typescript Project by installing TypeScript.
- Configure your .tsconfig to align with our recommended options for this project.
- Configure and install Webpack including your webpack.conf.js and be sure to update the package.json to work with webpack.
- Use npm to install uuid and the uuid types.

## Step 2: Create an HTML File
- In the dist folder create an index.html file also you can add any images/css files you plan to use to this folder.
- Your HTML File should:
    - Have Some sort of Title bar/Image.
    - a Div area for the "login"
        - This area will contain a form with two input fields used to create a User: Name and Age with a button to create the user/"login" the user.
        - an empty div to contain the shop area of the page.
        - an empty div to contain the cart area of the page.
        - a script tag linking to your bundle.js (made from the webpack).
        - any CSS/Script tags you need to link your own sheet or CSS Frameworks (like Bootstrap/Tailwind/Material etc.).

## Step 3: Modify our Classes
- Note: These method additions rely on one another so please read through all the content before trying to create these methods.

### Modify the User Class
- static loginInUser(): Create a Static function that will retrieve the information from the HTML input field for name and age. The function should return a new User created with the name and age if a new and age was provided; otherwise, it can return null or undefined. Note: This method is static because it doesn't need to work with a User instance. And to call this static method somewhere else in code, it would look like User.createUser().
- cartHTMLElement(): This will return an HTML Div Element. This function will loop over your cart and create some HTML Code to layout your cart items in a formatted way to have the Name, Quantity and price of each item shown. You will also create a button to Remove All or Remove Just One of these items from the cart. The event listeners for these buttons will be created in a different function. Remember: You'll need to devise a way that each add and remove element is tied to a particular item (an easy way to do this is to give every button an id based off the item's UUID and precede/follow the UUID with a tag that says whether the button is a remove one or remove all button).
- addRemoveEventListeners(): This function adds event listeners to your cart's Remove One/Remove All Buttons. They will use the previously built removeQuantityFromCart and removeFromCart functions built in the previous night's homework.

### Modify the Item Class
- itemElement(): This will return an HTML Div Element. This element will be something like a card that represents all the information about one item. It will show the Item's Name, Description, and Price, and have an add to cart button. You can attempt to add the Eventlistener for add to cart here (as I will assume you did in the rest of this outline) Or you can make a separate function that adds the event listener like we did in the User Class.

### Modify the Shop Class
- showItems(): This method will loop over all the shop items and add each item's itemElement to the shop div of the HTML.
- updateCart(): This method will create the cart contents and display them to the cart div in the HTML. If the Cart is empty, it should say the cart is empty; if the cart contains Items, it will list all the cart items using the cartHTMLElement method and the addRemoveEventListeners function.
- static myUser property. This property will be either undefined (before the user "logs in" or an actual User Object). This will represent the person shopping at our store.
- static loginUser(event): This will be a static function. This will be attached to our "login/create user" button to be run when the user logs in. This method should create a user and save it to the myUser static property. If that user was created successfully, it should then create the shop and cart elements on the page.
- constructor(): This should now create SIX (6) items for your shop to sell. It will also build out the shop div using the showItems() method; it will build out the cart section using the updateCart method.

## Driver Code
- We will need a little bit of code to run on page load. We can do this simply by writing this code outside of our classes and functions. This code will add the loginUser method to the login/create user Button.

### Tips:
- With TypeScript, if you have an input field with the id of email, you can retrieve information for it like so: `<HTMLInputElement>document.getElementById("email")).value`
- JavaScript has a Set, just like in Python, that removes duplicates. You can create a set from an array like so: `const mySet = new Set(myArray)`
- You can use querySelector to search for elements within a node Element even when that element hasn't been attached to the DOM (the webpage). i.e.:
```javascript
const div = createElement("div");
div.innerHTML = "<span id='test-span'>hello</span>";
const span = div.querySelector('#test-span');
