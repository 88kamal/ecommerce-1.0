import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, setDoc, startAfter, limitToLast, endBefore, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../../firebase/firebaseConfig';
import allContext from '../../../context/allContext/allContext';
import { Button } from '@material-tailwind/react';

function AddProduct() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [loading, setLoading] = useState(false);
    // product props
    // const [product, setProduct] = useState([]);

    // console.log(new Date().toLocaleString())
    // const [category, setCategory] = useState([]);
    // const [subCategory, setsubCategory] = useState([]);
    // // console.log(pots)


    // const [products, setProducts] = useState({
    //     title: null,
    //     price: null,
    //     imageUrl: null,
    //     // pots: null,
    //     // planters: null,
    //     // plantsIndoor: null,
    //     // plantsOutdoor: null,
    //     // seeds:null,
    //     // plantCareAndEssential: null,
    //     // designAndDecorNaturalProduct:null,
    //     description: null,
    //     date: new Date().toLocaleString(
    //         "en-US",
    //         {
    //             month: "short",
    //             day: "2-digit",
    //             year: "numeric",
    //         }
    //     )

    // })
    // console.log(products.title)
    function handleSelectChange(event) {
        setPots(event.target.value);
    }


    const [order, setOrder] = useState([]);
    const [addressInfo, setAddressInfo] = useState([]);

    // ********************** Modal Section  Start **********************
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    // ********************** Modal Section  End **********************

    const navigate = useNavigate()



    // ********************** Add Product Section Start **********************

    const [add, setAdd] = useState(false)
    const addHandler = () => {
        setAdd(true)
        openModal()
    }
    // const addProduct = async () => {
    //     if (products.title == null || products.price == null || products.imageUrl == null || products.description == null) {
    //         return toast.error('Please fill all fields')
    //     }
    //     const productRef = collection(fireDB, "products")
    //     setLoading(true)
    //     try {
    //         await addDoc(productRef,{
    //             products,
    //             category: {
    //                 category: category,
    //                 subCategory:subCategory
    //             },
    //             time: Timestamp.now(),
    //         }
    //         )
    //         toast.success("Product Add successfully")
    //         getProductData()
    //         setLoading(false)
    //         //   window.location.href = "/admin"
    //         // navigate('/admin')
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    //     // window.location.reload()
    //     setProducts("")
    // }
    // ****** get product
    // const getProductData = async () => {
    //     setLoading(true)
    //     try {
    //         const q = query(
    //             collection(fireDB, "products"),
    //             orderBy("time"),
    //             // limit(5)
    //         );
    //         const data = onSnapshot(q, (QuerySnapshot) => {
    //             let productsArray = [];
    //             QuerySnapshot.forEach((doc) => {
    //                 productsArray.push({ ...doc.data(), id: doc.id });
    //             });
    //             setProduct(productsArray)
    //             setLoading(false);

    //         });
    //         return () => data;
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     getProductData();
    // }, []);


    // pagination 

    // const [page, setPage] = useState(1);




    // const showNext = ({ item }) => {
    //   if (product.length === 0) {
    //     alert("Thats all we have for now !")
    //   } else {
    //     const fetchNextData = async () => {
    //       const users = await getDocs(collection(fireDB, "products"),
    //         limit(5),
    //         startAfter(item.date))
    //       const productsArray = [];
    //       users.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         // console.log(doc.id, " => ", doc.data());
    //         const obj = {
    //           id: doc.id,
    //           ...doc.data()
    //         }
    //         productsArray.push(obj);
    //       });
    //       setProduct(productsArray);
    //       setPage(page + 1)
    //     };
    //     fetchNextData();
    //   }
    // };


    // const showPrevious = ({ item }) => {
    //   const fetchPreviousData = async () => {
    //     const users = await getDocs(collection(fireDB, "products"),
    //       endBefore(item.date),
    //       limitToLast(10)
    //     )
    //     const productsArray = [];
    //     users.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       // console.log(doc.id, " => ", doc.data());
    //       const obj = {
    //         id: doc.id,
    //         ...doc.data()
    //       }
    //       productsArray.push(obj);
    //     });
    //     setProduct(productsArray);
    //     setPage(page - 1)
    //   };
    //   fetchPreviousData();
    // };











    // ********************** Add Product Section  End **********************

    // ********************** Update Product Section  Start **********************
    const edithandle = (item) => {
        setProducts(item)
        setIsOpen(true)
        setAdd(false)
    }
    // update product
    const updateProduct = async (item) => {
        setLoading(true)
        try {
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully")
            getProductData();
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setProducts("")
    }
    // ********************** Update Product Section  End **********************

    // ********************** Delete Product Section  Start **********************

    // const deleteProduct = async (item) => {
    //   try {
    //     setLoading(true)
    //     await deleteDoc(doc(fireDB, "products", item.id));
    //     // toast.success("Product Deleted successfully")
    //     setLoading(false)
    //     getProductData();
    //   } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    //   }
    // }

    const deleteProduct = async (item) => {

        try {
            setLoading(true)
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success('Product Deleted successfully')
            setLoading(false)
            getProductData()
        } catch (error) {
            // toast.success('Product Deleted Falied')
            setLoading(false)
        }
    }

    // ********************** Delete Product Section  End **********************




    // order

    const context = useContext(allContext)
    const { toggleMode, mode ,  addProduct,
        product,
        products, setProducts} = context



    const getOrdersData = async () => {
        const q = query(
            collection(fireDB, "orders"),
            orderBy("date"),
            // limit(50)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let orderArray = [];
            QuerySnapshot.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setOrder(orderArray)
        });

        return () => data;

    }


    useEffect(() => {
        getOrdersData()
    }, [])




    // user

    const userData = async () => {
        const q = query(
            collection(fireDB, "orders"),
            orderBy("date"),
            // limit(50)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let userArray = [];
            QuerySnapshot.forEach((doc) => {
                userArray.push({ ...doc.data(), id: doc.id });
            });
            setAddressInfo(userArray)
        });

        return () => data;

    }

    useEffect(() => {
        userData()
    }, []);
    return (
        <div className='flex justify-center items-center h-screen px-2'>
            <div className="w-full  container mx-auto  transform overflow-hidden rounded-2xl   text-left align-middle  transition-all bg-gray-100 border  max-w-4xl border-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                <section className="">
                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0 ">

                        <div className="w-full  rounded-lg ">

                            <div className="px-6 py-6  ">
                                <h1 className=' text-center mb-4 font-semibold text-2xl underline'>{'Add Product'}</h1>
                                <form>
                                    <div className="mb-3">

                                        <input type="text" onChange={(e) => setProducts({ ...products, title: e.target.value })} value={products.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-0 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] block w-full p-2.5 " placeholder="Product Title" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} />
                                    </div>
                                    <div className="mb-3">

                                        <input type="text" onChange={(e) => setProducts({ ...products, price: e.target.value })} value={products.price} name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-0 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] block w-full p-2.5 " placeholder="Product price" required style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} />
                                    </div>
                                    <div className="mb-3">

                                        <input type="text" onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl} name='imageurl' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-0 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] block w-full p-2.5 " placeholder="Product image url" required style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} />
                                    </div>
                                    {/* <div className="mb-3">

                                          <input type="text" onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category} name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-0 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] block w-full p-2.5 " placeholder="Product Category" required style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} />
                                        </div> */}
                                    <div className=" bg-gray-50 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] p-2 mb-5 rounded-xl">
                                        <label htmlFor="countries" className="block mb-2 text-center text-sm font-bold text-gray-600 ">Select your product categories
                                        </label>
                                        <div className="">
                                        <div className='mb-2'>
                                               <select value={products.category} onChange={(e) => setProducts({ ...products, category: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                   <option selected>Select category</option>
                                                   <option value="Pots">Pots</option>
                                                   <option value="Planters">Planters</option>
                                                   <option value="Plants Indoor">Plants Indoor</option>
                                                   <option value="Plants Outdoor">Plants Outdoor</option>
                                                   <option value="Seeds">Seeds</option>
                                                   <option value="Plant care & Essentials">Plant care & Essentials</option>
                                                   <option value="Design & Decor">Design & Decor</option>

                                               </select>
                                           </div>
                                            <div className='mb-2'>
                                                <select value={products.subCategory}  onChange={(e) => setProducts({ ...products, subCategory: e.target.value })}id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Select sub category</option>
                                                    <option value="ceramic">Ceramic</option>
                                                    <option value="plastic">Plastic</option>
                                                    <option value="wooden">Wooden</option>
                                                    <option value="metal">Metal</option>
                                                    <option value="hydroponics">Hydroponics</option>
                                                    <option value="groBags">Gro Bags</option>
                                                    <option value="improve your vastu">Improve Your Vastu</option>
                                                    <option value="purify your living space">Purify your living space</option>
                                                    <option value="aromatic">Aromatic</option>
                                                    <option value="medicinal">Medicinal</option>
                                                    <option value="easy to maintain">Easy to Maintain</option>
                                                    <option value="evergreen">Evergreen</option>
                                                    <option value="sun loving">Sun loving</option>
                                                    <option value="fruiting">Fruiting</option>
                                                    <option value="flowering">Flowering</option>
                                                    <option value="aromatic">Aromatic</option>
                                                    <option value="medicinal">Medicinal</option>
                                                    <option value="landscaping">Landscaping</option>
                                                    <option value="flower">Flower</option>
                                                    <option value="vegetable">Vegetable</option>
                                                    <option value="fruit">Fruit</option>
                                                    <option value="herbs">Herbs</option>
                                                    <option value="bulbs">Bulbs</option>
                                                    <option value="microgreen">Microgreen</option>
                                                    <option value="seeds kit">Seeds Kit</option>       
                                                    <option value="pesticide">Pesticide</option>
                                                    <option value="fertilisers">Fertilisers</option>
                                                    <option value="potting media">Potting Media</option>
                                                    <option value="garden accessories">Garden Accessories</option>        
                                                    <option value="jute">Jute</option>
                                                    <option value="wooden">Wooden</option>
                                                    <option value="wax">Wax</option>
                                                </select>
                                            </div>
                                            {/* <div className=' mb-5 w-1/6'>
                                               
                                                <select value={products.planters} onChange={(e) => setProducts({ ...products, planters: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Planters</option>
                                                    <option value="Hydroponics">Hydroponics</option>
                                                    <option value="Gro Bags">Gro Bags</option>
                                                </select>
                                            </div>

                                            <div className=' mb-5 w-1/6'>
                                                <select value={products.plantsIndoor} onChange={(e) => setProducts({ ...products, plantsIndoor: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Plants Indoor</option>
                                                    <option value="Improve Your Vastu">Improve Your Vastu</option>
                                                    <option value="Purify your living space">Purify your living space</option>
                                                    <option value="Aromatic">Aromatic</option>
                                                    <option value="Medicinal">Medicinal</option>
                                                    <option value="Easy to Maintain">Easy to Maintain</option>
                                                    <option value="Evergreen">Evergreen</option>
                                                    <option value="Sun loving">Sun loving</option>
                                                </select>
                                            </div>

                                            <div className=' mb-5 w-1/6'>
                                                <select value={products.plantsOutdoor} onChange={(e) => setProducts({ ...products, plantsOutdoor: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Plants Outdoor</option>
                                                    <option value="Fruiting">Fruiting</option>
                                                    <option value="Flowering">Flowering</option>
                                                    <option value="Aromatic">Aromatic</option>
                                                    <option value="Medicinal">Medicinal</option>
                                                    <option value="Landscaping">Landscaping</option>
                                                </select>
                                            </div>

                                            <div className=' mb-5 w-1/6'>
                                                <select value={products.seeds} onChange={(e) => setProducts({ ...products, seeds: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Plants Outdoor</option>
                                                    <option value="Flower">Flower</option>
                                                    <option value="Vegetable">Vegetable</option>
                                                    <option value="Fruit">Fruit</option>
                                                    <option value="Herbs">Herbs</option>
                                                    <option selected>Plants Outdoor</option>
                                                    <option value="Bulbs">Bulbs</option>
                                                    <option value="Microgreen">Microgreen</option>
                                                    <option value="Seeds Kit">Seeds Kit</option>                                                    
                                                </select>
                                            </div>

                                            <div className=' mb-5 w-1/6'>
                                                <select value={products.plantCareAndEssential} onChange={(e) => setProducts({ ...products, plantCareAndEssential: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Plant care & Essentials</option>
                                                    <option value="Pesticide">Pesticide</option>
                                                    <option value="Fertilisers">Fertilisers</option>
                                                    <option value="Potting Media">Potting Media</option>
                                                    <option value="Garden Accessories">Garden Accessories</option>                
                                                </select>
                                            </div>

                                            <div className=' mb-5 w-1/6'>
                                                <select value={products.designAndDecorNaturalProduct} onChange={(e) => setProducts({ ...products, designAndDecorNaturalProduct: e.target.value })} id="countries" className="bg-gray-50 border  shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5 ">
                                                    <option selected>Natural Product</option>
                                                    <option value="Jute">Jute</option>
                                                    <option value="Wooden">Wooden</option>
                                                    <option value="Wax">Wax</option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                     <div className="mb-3">
                                            <textarea id="message" name='description' onChange={(e) => setProducts({ ...products, description: e.target.value })} value={products.description} rows={4} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-0 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] block w-full p-2.5 " placeholder="Product message" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} />
                                        </div>
                                </form>

                                <Button onClick={() => { addProduct() }} type="button" className="focus:outline-none w-full text-white bg-pink-600 shadow-[inset_0_0_6px_rgba(0,0,0,0.6)] border hover:bg-pink-700  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Add Product</Button>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddProduct