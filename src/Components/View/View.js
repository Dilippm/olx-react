import React,{useContext,useEffect,useState} from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './View.css';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} =useContext(PostContext)
 
  const {firebase} =useContext(FirebaseContext)
  useEffect(() => {
    // console.log("daaaaata");
    //   console.log(postDetails);
      const { userId } = postDetails;
      // console.log(userId);
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    
  }, [postDetails,firebase])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt.slice(0,15)}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
