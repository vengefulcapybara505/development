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
    summer: false
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
    if(item.sale && sale)
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

  const filteredItems = () =>
  {
    setsortCheap(!sortCheap);
   
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
    //filteredItems();
    return(Object.keys(list).filter((x) => styles["winter"] == x.winter).map((key) => {
      return (<CartItem updateCart = {updateCart} item = {list[key]} index = {key}/>)
      }))
      
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
        <h1>Test</h1>
        <h1>Cart</h1>
      </div>

      <div class = "display-box">
        <div class = "options">
          <h2>
            {Math.abs(cost).toFixed(2)}
          </h2>
          <TestComponent handleSelect = {handleSelect} />
          <Checkbox label="Winter Colors" value= "winter" onChange = {checked} checked = {styles.winter}/>
          <Checkbox label="Fall Colors" value= "fall" onChange = {checked} checked = {styles.fall}/>
          <Checkbox label="Spring Colors" value= "spring" onChange = {checked} checked = {styles.spring}/>
          <Checkbox label="Summer Colors" value= "summer" onChange = {checked} checked = {styles.summer}/>
          
          
        </div>
        <div class = "items-list">
          
            {
             productList()
            }

        </div>
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
return(<select onChange = {props.handleSelect} name = "sort" id = "sort">
<option value = "default">Default</option>
<option value =  "cheap">Price Low -&gt; High</option>
<option value =  "expensive">Price High -&gt; Low</option>
</select>)
}

function CartItem(props)
{

  const change = (id, item) =>
  {
    
    if(!item.cartAdded)
    {
      document.getElementById(id).textContent = "Remove from cart";
      props.updateCart(item, true);
      item.cartAdded = !item.cartAdded;
    }
    else if(item.cartAdded)
    {
      document.getElementById(id).textContent = "Add to cart";
      props.updateCart(item, false);
      item.cartAdded = !item.cartAdded;
    }
      
  }
  const getButtonMessage = (item) =>
  {
    if(item.cartAdded)
    {
      return "Remove from Cart"
    }
    else
    {
      return "Add to Cart"
    }
  }

  return(
    
    <div class = "cart-item">
      <img src = {props.item.image} alt = {props.alt}></img>
      <h3>{props.item.name}</h3>
      <p>{props.item.price}</p>
      <p>Fall {props.item.fall.toString()}</p>
      <p>Winter {props.item.winter.toString()}</p>
      <p>Spring {props.item.spring.toString()}</p>
      <p>Summer {props.item.summer.toString()}</p>
      <p>Sale {props.item.sale.toString()}</p>
      <button id = {props.item.name + "button"} onClick = {()=> change((props.item.name + "button"), props.item)}>{getButtonMessage(props.item)}</button>
      
    </div>

  )
}



export default App;
