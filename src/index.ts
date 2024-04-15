import { v4 as uuidv4 } from 'uuid';

class Item {
    private _id: string;
    public _name: string;
    public _price: number;
    public _description: string;

    public constructor(name: string, price: number, description: string) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    // Getters & Setters
    public get itemid(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    // Methods

    public itemElement(): HTMLElement {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-card');
        itemDiv.innerHTML = `
            <h3>${this._name}</h3>
            <p>${this._description}</p>
            <p>Price: $${this._price.toFixed(2)}</p>
            <button id="add-${this._id}" class="add-to-cart">Add to Cart</button>
        `;
        // Add event listener to add button
        const addButton = itemDiv.querySelector(`#add-${this._id}`) as HTMLButtonElement | null;
        if (addButton) {
            addButton.addEventListener('click', () => {
                this.addToCart();
            });
        } else {
            console.error('Add button not found.');
        }
        return itemDiv;
    }

    public addToCart(): void {
        const user = User.myUser;
        if (user) {
            user.addToCart(this);
            user.updateCartDisplay();
        } else {
            console.error('User not found.');
        }
    }
}

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];

    constructor(name: string, age: number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
    }

    // Getters
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }

    public get cart(): Item[] {
        return this._cart;
    }

    public addToCart(item: Item): void {
        this._cart.push(item);
    }

    public removeFromCart(item: Item): void {
        const index = this._cart.findIndex(cartItem => cartItem.itemid === item.itemid);
        if (index !== -1) {
            this._cart.splice(index, 1); // Remove only one instance of the item
        }
    }

    public addRemoveEventListeners(): void {
        const cartDiv = document.getElementById('cart') as HTMLElement;

        cartDiv.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('remove-one')) {
                const itemId = target.dataset.itemId;
                if (itemId) {
                    const itemToRemove = this.cart.find(item => item.itemid === itemId);
                    if (itemToRemove) {
                        this.removeFromCart(itemToRemove);
                        this.updateCartDisplay();
                    }
                }
            } else if (target.classList.contains('remove-all')) {
                this._cart = []; // Clear cart
                this.updateCartDisplay(); // Update cart display after removing all items
            }
        });
    }

    public updateCartDisplay(): void {
        const cartDiv = document.getElementById('cart') as HTMLElement;
        cartDiv.innerHTML = ''; // Clear previous cart content
        cartDiv.appendChild(this.cartHTMLElement()); // Rebuild cart display
    }

    public cartHTMLElement(): HTMLElement {
        
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-items');
        this._cart.forEach(item => {
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - Quantity: 1 - Price: $${item.price.toFixed(2)}</p>
                <button id="remove-one-${item.itemid}" class="remove-one" data-item-id="${item.itemid}">Remove One</button>
                <button id="remove-all-${item.itemid}" class="remove-all" data-item-id="${item.itemid}">Remove All</button>
            `;
            
            const removeOneButton = itemDiv.querySelector(`#remove-one-${item.itemid}`) as HTMLButtonElement | null;
            if (removeOneButton) {
                removeOneButton.addEventListener('click', () => {
                    // Handle remove one logic here
                    this.removeFromCart(item);
                    this.updateCartDisplay();
                });
            } else {
                console.error('Remove one button not found.');
            }
            
            const removeAllButton = itemDiv.querySelector(`#remove-all-${item.itemid}`) as HTMLButtonElement | null;
            if (removeAllButton) {
                removeAllButton.addEventListener('click', () => {
                    // Handle remove all logic here
                    this._cart = [];
                    this.updateCartDisplay();
                });
            } else {
                console.error('Remove all button not found.');
            }
            cartDiv.appendChild(itemDiv);
        });
        return cartDiv;
    }

    static loginInUser(): User | null {
        const nameInput = document.getElementById('name') as HTMLInputElement | null;
        const ageInput = document.getElementById('age') as HTMLInputElement | null;
        if (nameInput && ageInput) {
            const name = nameInput.value.trim();
            const age = parseInt(ageInput.value.trim());
            if (name && !isNaN(age)) {
                return new User(name, age);
            }
        }
        return null;
    }

    static myUser: User | undefined;

    static loginUser(event: Event): void {
        event.preventDefault();
        const user = User.loginInUser();
        if (user) {
            User.myUser = user;
            const shop = new Shop();
            const cart = User.myUser.cartHTMLElement();
            const shopDiv = document.getElementById('shop') as HTMLElement | null;
            const cartDiv = document.getElementById('cart') as HTMLElement | null;
            if (shopDiv && cartDiv) {
                shopDiv.appendChild(shop.showItems());
                cartDiv.appendChild(cart);
                User.myUser.addRemoveEventListeners(); // Add event listeners after adding cart elements
            } else {
                console.error('Shop div or cart div not found.');
            }
        } else {
            alert('Please provide valid name and age.');
        }
    }
}


class Shop {
    private _items: Item[];

    constructor() {
        this._items = [];
        const lembas_bread = new Item( `Lembas Bread`, 10, `A few bites of this elven waybread sustain a traveler for days. It’s lightweight, nutritious, and perfect for long journeys.`);
        const the_one_ring = new Item( `The One Ring`, 100, `Grants the wearer invisibility and has absolutely no foreseen ill effects whatsoever.`);
        const wizards_staff = new Item( `Some Wizard's Staff`, 150, `A staff with magical powers.`);
        const palantir_eyelids = new Item( `Eyelids of the Palantír`, 50, `Magical eyelids that allow you to see into distant lands.`);
        const rohirrim_blowhorn = new Item( `Blowhorn from the Rohirim`, 80, `A horn used by the Rohirrim to call for aid.`);
        const mithril_ear_rings = new Item( `Mithril Ear Rings`, 200, `Elegant ear rings made of mithril, the rare and precious metal.`);
        const hobbits_pipe = new Item( `Hobbit's Pipe`, 20, `A pipe used by hobbits to smoke pipe weed.`);

        this._items.push(lembas_bread, the_one_ring, wizards_staff, palantir_eyelids, rohirrim_blowhorn, mithril_ear_rings, hobbits_pipe);
    }

    showItems(): HTMLElement {
        const shopDiv = document.createElement('div');
        shopDiv.classList.add('shop-items');
        this._items.forEach(item => {
            const itemElement = item.itemElement();
            shopDiv.appendChild(itemElement);
        });
        return shopDiv;
    }

    updateCart(): void {
        const cartDiv = document.getElementById('cart') as HTMLElement;
        if (User.myUser && User.myUser.cart.length > 0) {
            cartDiv.innerHTML = '';
            cartDiv.appendChild(User.myUser.cartHTMLElement());
            User.myUser.addRemoveEventListeners();
        } else {
            cartDiv.innerHTML = '<p>Cart is empty.</p>';
        }
    }
}

document.getElementById('login-button')?.addEventListener('click', User.loginUser);

// Create an instance of Shop and initialize the shop and cart elements on the page
const shop = new Shop();
const shopDiv = document.getElementById('shop') as HTMLElement;
const cartDiv = document.getElementById('cart') as HTMLElement;
shopDiv.appendChild(shop.showItems());
cartDiv.appendChild(User.myUser?.cartHTMLElement() || document.createElement('div'));
