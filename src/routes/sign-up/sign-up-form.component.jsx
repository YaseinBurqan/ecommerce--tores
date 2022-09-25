import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import Home from "../home/home.component";

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      alert("User Created Successfully");
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("Cannot create user, Password should be at least 6 characters", error);
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-between">
          <div className="card mt-3 p-5">
            <h2>Sign Up </h2>
            <form className="card two bg-white px-5 py-4 mb-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-placeholder">Display Name</label>
                <input className="form-control" type="text" required onChange={handleOnChange} name="displayName" value={displayName} />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder">Email</label>
                <input className="form-control" type="email" required onChange={handleOnChange} name="email" value={email} />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder">Password</label>
                <input className="form-control" type="password" required onChange={handleOnChange} name="password" value={password} />
              </div>

              <div className="form-group">
                <label className="form-control-placeholder">Confirm Password</label>
                <input className="form-control" type="password" required onChange={handleOnChange} name="confirmPassword" value={confirmPassword} />
              </div>

              <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" type="submit">
                Sign Up <i className="fas fa-long-arrow-alt-right ml-2"></i>
              </button>
            </form>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                navigate("/signin");
              }}
            >
              <small>Already signed up?</small>
              <span>&nbsp;Log in</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
