let _categories = [{
  id: 1,
  name: 'Sports',
  products: [
    { id: 1, name: 'pickleball racket' },
    { id: 2, name: 'racketball racket' }
  ]
}];

const newID = function(workArr) {
  return workArr.reduce((max, product) => {
    return (product.id > max) ? product.id : max;
  }, 0) + 1;
};

const getProductArr = function(id) {
  let workArr = _categories.filter(category => {
      return category.id === id * 1;
  });
  if (!workArr[0].products) workArr[0].products = [];
  return workArr[0].products;
}

const get = () => _categories;

const getCatByID = function(id) {
  return _categories.filter(category => {
    return category.id === id * 1;
  })[0];
};

const addCat = function(name) {
  let id = newID(_categories);
  _categories.push({ id, name });
  return { id, name };
};

const delCat = function(id) {
  _categories = _categories.filter(category => {
    return category.id !== id * 1;
  });
}

const addProduct = function(catID, name) {
  let workArr = getProductArr(catID * 1);
  let id = newID(workArr);
  workArr.push({ id, name });
}

const delProduct = function(catID, id) {
  let catObj = getCatByID(catID);
  catObj.products = catObj.products.filter(category => {
    return category.id !== id * 1;
  });
}



module.exports = { get, getCatByID, addCat, delCat, addProduct, delProduct };
