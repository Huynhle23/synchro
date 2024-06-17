import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../pages/Color'
import { IoIosGitCompare } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { getAProduct } from '../features/products/productSlice';
import {toast} from 'react-toastify' 
import { cart, getCart } from '../features/users/userSlice';

const SingleProduct = () => {
    const [color,setColor] = useState(null)
    const [quantity,setQuantity] = useState(1)
    const [alrealAdd,setAlrealAdd] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pru = useSelector(state=>state.product?.AProduct?.findProduct)
    const cartState = useSelector(state=>state.auth?.cartUser)
    useEffect(()=>{
        dispatch(getAProduct(id))
        dispatch(getCart())
        window.scroll(0,0)
    },[])
    useEffect(()=>{
        for(let i=0;i<cartState?.length;i++){
            if(id === cartState[i]?.productId?._id){
                setAlrealAdd(true)
            }
        }
    },[])
    const uploadCart=()=>{
        if(color === null){
            toast.error("Please choose color !")
            return false
        }else{
            dispatch(cart({productId:pru?._id,quantity,color,price:pru?.price}))
            navigate('/cart')
        }
    }
    const props = {
        width: 400, 
        height: 500, 
        zoomWidth: 500, 
        img: pru?.images[0]?.url ? pru?.images[0]?.url : "https://www.bhphotovideo.com/images/images2500x2500/apple_m02q3ll_a_watch_series_6_gps_1594609.jpg" };
    const [orderProduct,setOrderProduct] = useState(true)
    return (
        <>  
            <Meta title="Product Name"/>
            <BreadCrumb title="Product Name"/>
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div className="">
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {
                                pru?.images?.map((e,index)=>(
                                    <div className="" key={index}>
                                        <img src={e?.url} className='img-fluid' alt="product" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className='title'>{pru?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {pru?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={pru?.totalrating} 
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0 t-review'>( 2 Reviews )</p>
                                </div>
                                <a href="#review" className='review-btn'>Write a Review</a>
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='mb-0 product-heading'>Type:</h3>
                                    <p className='mb-0 product-data'>{pru?.category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='mb-0 product-heading'>Brand:</h3>
                                    <p className='mb-0 product-data'>{pru?.brand}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='mb-0 product-heading'>Category:</h3>
                                    <p className='mb-0 product-data'>{pru?.category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='mb-0 product-heading'>Tags:</h3>
                                    <p className='mb-0 product-data'>{pru?.tags}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='mb-0 product-heading'>Availablity:</h3>
                                    <p className='mb-0 product-data'>In Stock</p>
                                </div>
                                {
                                    alrealAdd === false && <>
                                        <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                            <h3 className='mb-0 product-heading'>Color:</h3>
                                            <Color setColor={setColor} colorData={pru?.color}/>
                                        </div>
                                    </>
                                }
                                <div className="d-flex gap-10 flex-row align-items-center gap-15 my-2">
                                    {
                                        alrealAdd === false && <>
                                            <h3 className='mb-0 product-heading'>Quantity:</h3>
                                                <div className="">
                                                    <input 
                                                        className='form-control' 
                                                        type="number" 
                                                        name=""  
                                                        style={{width:"70px"}} 
                                                        min={1} 
                                                        max={10} 
                                                        onChange={(e)=>setQuantity(e.target.value)}
                                                        value={quantity}
                                                        id="" />
                                                </div>
                                        </>
                                    }
                                    <div className={alrealAdd ? "ms-0":"ms-5" + "d-flex align-items-center gap-30 ms-5"}>
                                        <button 
                                            onClick={()=>{alrealAdd ? navigate('/cart') : uploadCart()}}
                                            className='button border-0' 
                                            type='submit'>
                                                {alrealAdd ? "Go to cart": "Add To Cart"}
                                        </button>
                                        {/* <button className='border-0 button signup'>Buy It Now</button> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div className="">
                                        <a href="">
                                            <IoIosGitCompare className='fs-5 me-2' />Add to Compare
                                        </a>
                                    </div>
                                    <div className="">
                                        <a href="">
                                            <FaHeart className='fs-5 me-2'/>Add to WishList
                                        </a>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <h3 className='mb-2  product-heading'>Shipping & Returns:</h3>
                                    <p className='mb-0 product-data'>
                                        Free shipping and returns available on all orders! <br/> We shipping 
                                        all us domestic orders within <b>5-10 business days!</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p className=""
                                dangerouslySetInnerHTML={{__html: pru?.description.toString()}}
                            >
                                
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container  class1="reviews-wrapper  home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4 id='review' >Review</h4>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div className="">
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className="d-flex gap-10 align-items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4} 
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {
                                    orderProduct && (
                                        <div className="">
                                            <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a review</h4>
                                <form action="" className='d-flex flex-column gap-20'>
                                    <div className="">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={1} 
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className="">
                                        <textarea placeholder='Comments' name="" id="" className='w-100 form-control' cols="30" rows="4"></textarea>
                                    </div >
                                    <div className="d-flex justify-content-end">
                                        <button className='button border-0'>
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex gap-10 align-items-center">
                                        <h6 className='mb-0'>Apple Store</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4} 
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className='mt-3'>san pham rat tot ne ! ^^</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard/>
                </div>
            </Container>
        </>
    );
}

export default SingleProduct;
