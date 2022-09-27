import { useState, useEffect, useContext } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    async function handleLogInWithGoogle() {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    handleLogInWithGoogle();
  }, []);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // open Popup without go to another page and redirect
  // const logGooglePopupUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  // const logGoogleRedirectUser = async () => {
  //   // open google login page then redirect to the page that we want
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container d-flex justify-content-center">
          <div className="d-flex flex-column justify-content-between">
            <div className="card mt-3 p-5">
              <h1>Sign In Page</h1>

              <div className="card two bg-white px-5 py-4 mb-3">
                <div className="form-group">
                  <label className="form-control-placeholder">Email</label>
                  <input className="form-control" type="email" required onChange={handleChange} name="email" value={email} />
                </div>

                <div className="form-group">
                  <label className="form-control-placeholder">Password</label>
                  <input className="form-control" type="password" required onChange={handleChange} name="password" value={password} />
                </div>

                <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" type="submit">
                  Sign In <i className="fas fa-long-arrow-alt-right ml-2"></i>
                </button>
              </div>

              <button className="btn btn-secondary" onClick={signInWithGoogle}>
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
      </form>
    </>
  );
};

export default SignInForm;
