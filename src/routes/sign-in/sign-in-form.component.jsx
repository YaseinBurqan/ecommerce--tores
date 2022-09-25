import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  useEffect(() => {
    async function handleLogInWithGoogle() {
      // You can await here
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    handleLogInWithGoogle();
  }, []);

  // open Popup without go to another page and redirect
  const logGooglePopupUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   // open google login page then redirect to the page that we want
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // };

  const navigate = useNavigate();

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-between">
          <div className="card mt-3 p-5">
            <h1>Sign In Page</h1>

            <form className="card two bg-white px-5 py-4 mb-3">
              <div className="form-group">
                <label className="form-control-placeholder">Email</label>
                <input className="form-control" type="email" required />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder">Password</label>
                <input className="form-control" type="password" required />
              </div>

              <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" type="submit">
                Sign In <i className="fas fa-long-arrow-alt-right ml-2"></i>
              </button>
            </form>

            <button className="btn btn-secondary" onClick={logGooglePopupUser}>
              Sign in with Google Popup
            </button>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <small>You Do Not Have An Account?</small>
              <span>&nbsp;Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
