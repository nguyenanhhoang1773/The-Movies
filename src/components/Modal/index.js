import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInforSelector, signInSelector } from "~/redux/Selector";
import fireBaseSlice from "~/redux/Slice/fireBaseSlice";
import { db, auth } from "~/firebase/config";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
function ModalLogIn() {
  const isSingIn = useSelector(signInSelector);
  return (
    <div className="fixed justify-center items-center z-50 top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex">
      <div className=" w-[600px] h-[500px] bg-green-400 rounded-md">
        <h3 className="text-center text-white  text-shadow pt-[40px] text-[40px] font-[600] ">
          Log In
        </h3>
        {!isSingIn && (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    </div>
  );
}

export default ModalLogIn;
