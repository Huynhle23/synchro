import React,{useEffect} from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import {useDispatch,useSelector} from 'react-redux'
import { getAllWishList } from '../features/users/userSlice';
import { addToWishList } from '../features/products/productSlice';

const Wishlist = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllWishList())
    },[])

    const wishlist = useSelector(state=>state?.auth?.getWishList?.wishlist)// auth duoc tao ra o ben authSlice 

    const removeWishList =(id)=>{
        dispatch(addToWishList(id))
        setTimeout(()=>{
            dispatch(getAllWishList())
        },300)
    }
    return (
        <>
            <Meta title="Wish List"/>
            <BreadCrumb title="Wish List"/> 
            <div className="wishlist-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        {
                            wishlist?.length < 1 && (<div className='d-flex align-items-center justify-content-center'>No data</div>)
                        }
                        {
                            wishlist && ( 
                                wishlist?.map((e,index)=>(
                                <div key={index} className="col-3">
                                    <div className="wishlist-card position-relative">
                                        <img src="images/cross.svg" alt="cross" onClick={()=>removeWishList(e?._id)} className='position-absolute cross img-fluid' />
                                        <div className="wishlist-card-image bg-white">
                                            <img src={e?.images[0]?.url} className='img-fluid d-block mx-auto' width={160} alt="watch" />
                                        </div>
                                        <div className="py-3 px-3">
                                            <h5 className='title'>{e?.title}</h5>
                                            <h6 className='price'>$ {e?.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                            ) 
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;
