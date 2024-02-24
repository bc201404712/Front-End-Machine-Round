const search = document.getElementById("search");
const sugetionList = document.getElementById("sugetionList");

const getSuggetion = () => {
 
  let inputValue = search.value;
  // santize input value to prevent xss attack
  let santizedValue = escapeHTML(inputValue);
   // call search API
   
  productList(santizedValue);
};

const escapeHTML = (value) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(value));
  return div.innerHTML;
}

const productList = async (searchValue) => {
  try {
    const getProduct = await fetch(
      "https://dummyjson.com/products/search?q=" + searchValue
    );
    const res = await getProduct.json();

    const handleListItem = (e) => {

      console.log(e.target.textContent)
    }
    if(!searchValue) {
      sugetionList.innerHTML = '';
      sugetionList.style.display = "none";

      return;
    }
    
    if(res.products.length > 0 ) {
      // removed previoues items from ul
       sugetionList.innerHTML = '';
       
       res.products.map((result) => {
        
        let li = document.createElement("li");

        // atteched event on each list item
        li.addEventListener('click',handleListItem);

        // change style none to block

        sugetionList.style.display = "block";

        // add product value on each items

        li.textContent = result.title;

        // append all list item to ul

        sugetionList.append(li);
      });

    }
   
  } catch (error) {
    console.log(`Error from productList ${error}`);
  }
};

const debounce = (fun, delay) => {
  let timerid;
  return function (...args) {
    clearTimeout(timerid);
    timerid = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
};

betterFunction = debounce(getSuggetion, 100);

// always use input event when you need to trigger elements without losing focus
search.addEventListener("input", betterFunction);
