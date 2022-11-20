import { useState } from "react";
import './App.css';
import products from './items.json'

function App() {
  const [list, setList] = useState(products);
  const [cart, setCart] = useState({})
  const [cost, setCost] = useState(0);
  const [winter, setWinter] = useState(false);


  const [styles, setStyles] = useState({
    fall: false,
    winter: false,
    spring: false,
    summer: false,
    sale: false
  })

  const [fall, setFall] = useState(false);
  const [spring, setSpring] = useState(false);
  const [summer, setSummer] = useState(false);
  const [sale, setSale] = useState(false);
  const [sortCheap, setsortCheap] = useState(false);

  const [sort, setSort] = useState({
    default: true,
    cheap: false,
    expensive: false
  })
  
  /*
  function filteredItems() {
    let newList = list;
    
    newList = newList.sort((a, b) => b.price - a.price)
    newList= newList.slice(0, 2);

    setList({...newList})
  }

  function updateCart()
  {

  }
*/
  /*
  return(
    <div>
      <div>
      <TestComponent filteredItems = {filteredItems}/>
      </div>
     

      {Object.keys(list).map((key)=>
      {
       return(<CartItem updateCart = {updateCart} item = {products[key]} index = {key}/>)
      })}

      {/*list.map((item, index) => 
              (<CartItem updateCart = {updateCart} item = {item} index = {index}/>))
    }
    </div>
  );
*/



  const updateCart = (uid, add) =>
  {
    let newCart = cart;
    if(!newCart[uid.name] && add)
    {
      newCart[uid.name] = true;
      setCost(cost + uid.price);
    }
    else if (newCart[uid.name] && !add)
    {
      newCart[uid.name] = null;
      setCost(cost - uid.price);
    }
    setCart({...newCart})
    console.log(cost);
  }

  function cheapCart(y)
  {
    
    if(sortCheap)
    {
      return (y.sort((a, b) => b.price - a.price))
    }
    else{
      return y;
    }
    
  }


  const color = (item) =>
  {
      if((!item.fall && styles["fall"]) || (!item.winter && styles["winter"]) || (!item.spring && styles["spring"]) || (!item.summer && styles["summer"]))
      {
        return false;
      }
      else{
        return true;
      }
  }

  const saleItem = (item) =>
  {
    if(!item.sale && styles["sale"])
    {
      return false;
    }
    else{
      return true;
    }
  }
  
  const filterItems = (item) =>
  {
    return(
      color(item) && saleItem(item)
    )
  }

 

  const checked = (e) =>
  {
    setStyles({...styles, [e.target.value]: e.target.checked})
  }
  
  const productList = () =>
  {
    
  return(
    products.filter((x) => filterItems(x)).sort((a, b) => {
      if (sort["cheap"])
      {
        return a.price - b.price;
      }
      else if (sort["expensive"])
      {
        console.log("hit");
        return b.price - a.price;
      }
      else{
        return;
      }
    }).map((x) => {
      return (<CartItem updateCart = {updateCart} item = {x}/>)
    })
    
  )
   
  }
    
  function handleSelect(e)
  {
    if(e.target.value == "cheap")
    {
      setSort({...sort, ["default"]: false, ["cheap"]: true, ["expensive"]: false})
    }
    else if(e.target.value == "expensive")
    {
      setSort({...sort, ["default"]: false, ["cheap"]: false, ["expensive"]: true})
    }
    else{
      setSort({...sort, ["default"]: true, ["cheap"]: false, ["expensive"]: false})
    }
    
  }
    
  
  return (
    <div className="App">
      <div class = "header">
        <h1>ARTIKEN Hand Bracelets</h1>
        <h1>Cart Total ${Math.abs(cost).toFixed(2)} </h1>
      </div>
      <div class = "spacer">
      
      </div>
      <div class = "display-box">
        
        <div class = "options">
        <div class = "spacer"></div>
          <h3>Sort by</h3>
          
          <ul class = "option-list">
            <li><TestComponent handleSelect = {handleSelect} /></li>
          </ul>
          <div class = "spacer"></div>
          <h3>Filter by colors</h3>
          <ul class = "option-list">
          <li><Checkbox label=" Winter Colors" value= "winter" onChange = {checked} checked = {styles.winter}/></li>
          <li><Checkbox label=" Fall Colors" value= "fall" onChange = {checked} checked = {styles.fall}/></li>
          <li><Checkbox label=" Spring Colors" value= "spring" onChange = {checked} checked = {styles.spring}/></li>
          <li><Checkbox label=" Summer Colors" value= "summer" onChange = {checked} checked = {styles.summer}/></li>
          </ul>
          <div class = "spacer"></div>
          <h3>Filter by Sale</h3>
          <ul class = "option-list">
            <li><Checkbox label=" Sale" value= "sale" onChange = {checked} checked = {styles.sale}/></li>
          </ul>
          
        </div>
        <div class = "items-list">
          
            {
             productList()
            }

        </div>
      </div>

      <div>
      </div>
    </div>
  );
  
}

function Checkbox(props)
{
  return(
    <label>
      <input type = "checkbox" value = {props.value} checked = {props.checked} onChange = {props.onChange}/>
      {props.label}
    </label>
  );
}

function TestComponent(props)
{
return(<div class = "dropdown-div">
<select class = "dropdown" onChange = {props.handleSelect} name = "sort" id = "sorter">
<option value = "default">Default</option>
<option value =  "cheap">Price Low -&gt; High</option>
<option value =  "expensive">Price High -&gt; Low</option>
</select>
</div>
)
}

function CartItem(props)
{

  const change = (id, item) =>
  {
    
    if(!item.cartAdded)
    {
      document.getElementById(id).textContent = "REMOVE FROM CART";
      document.getElementById(id).style ="width: 80%;"
      props.updateCart(item, true);
      item.cartAdded = !item.cartAdded;
    }
    else if(item.cartAdded)
    {
      document.getElementById(id).textContent = "ADD TO CART";
      document.getElementById(id).style ="width: 60%;"
      props.updateCart(item, false);
      item.cartAdded = !item.cartAdded;
    }
      
  }
  const getButtonMessage = (item, id) =>
  {
    if(item.cartAdded)
    {
      
      return "REMOVE FROM CART"
    }
    else
    {
      
      return "ADD TO CART"
    }
  }

  const getStyle = (item) =>
  {
    if(item.cartAdded)
    {
      return {width: 80 + "%"};
    }
    else
    {
      return {width: 60 + "%"};
    }
  }

  const getColors = (fall, winter, spring, summer) =>
  {
    let x = " ";
    if (fall) x += "Fall";
    if (winter) x += " " + "Winter";
    if (spring) x += " " + "Spring";
    if (summer) x += " " + "Summer";
    return x;
  }

  return(
    
    <div class = "cart-item">
      <img src = {props.item.image} class = "item-image" alt = {props.alt}></img>
      <h2>{props.item.name}</h2>
      <p class = "price">${props.item.price}</p>
      <p class = "colors">{getColors(props.item.fall, props.item.winter, props.item.spring, props.item.summer)}</p>
      <button id = {props.item.name + "button"} style = {getStyle(props.item)} class = "item-button ripple" onClick = {()=> change((props.item.name + "button"), props.item)}>{getButtonMessage(props.item)}</button>
      
    </div>

  )
}



export default App;
