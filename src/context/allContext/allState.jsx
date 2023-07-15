import React, { useEffect, useState } from 'react'
import AllContext from './allContext'
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
function allState(props) {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#202124';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [filterType, setFilterType] = useState('')
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);
  // const [category, setCategory] = useState([]);
  // const [subCategory, setsubCategory] = useState([]);
  // console.log(pots)



  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    subCategory: null,
    // pots: null,
    // planters: null,
    // plantsIndoor: null,
    // plantsOutdoor: null,
    // seeds:null,
    // plantCareAndEssential: null,
    // designAndDecorNaturalProduct:null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef,
        products,
    
      )
      toast.success("Product Add successfully")
      getProductData()
      setLoading(false)
        window.location.href = "/admin"
      // navigate('/admin')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    // window.location.reload()
    setProducts("")
  }

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);

      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);


  return (
    <AllContext.Provider value={{
       mode, toggleMode, filterType, setFilterType,
       addProduct,
       product,
       products,setProducts,
       loading, setLoading,getProductData
       
       }}>
      {props.children}
    </AllContext.Provider>
  )
}

export default allState