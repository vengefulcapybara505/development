# Development

### Link to Deployed Website
https://vengefulcapybara505.github.io/development/

### Goal and Value of the Application
This site was designed to be an online store for authentic Kenyan bracelets. The site allows users to browse bracelets in various
seasonal colors and add them their cart. They can sort and filter by different colors, sales, and price.

### Usability Principles Considered
All of the filters and sorting methods are sorted on the left side of the screen in a clearly defined heirarchy. The items are listed on the right side in
several columns.
Each of the images has an alt tag to account for accessibility. The name of the item, price, and categories are clearly shown.
The cart total is clearly can be seen and clicked on for further breakdown of the contents.

### Organization of Components
Each of the product list items are a component that includes an image, name, price, categories, and add to cart button.
The checkboxes and dropdown menu are components that call upon special methods to enable sorting and filtering.
When the cart button is clicked, there is a component for the cart popup that displays all the items in the cart along with the total cost.

### How Data is Passed Down Through Components
For filtering there is a state object that shows whether each filter is enabled or disabled so it can properly show the correct list of items.
The product list imported from a json file is filtered into the correct list and then using that information, item components are show and rendered.
The cart state uses a unique identifier to measure whether the product clicked on is in the cart or not. This state is then passed on to the 
Cart popup component so the items and total prices can be shown. 

### How the User Triggers State Changes
The user triggers a state change by using any of the checkboxes, dropdown, add/remove cart button, and cart button. Each of these onChange change the state
of the state variable and then the render is updated after processing the updated state.

