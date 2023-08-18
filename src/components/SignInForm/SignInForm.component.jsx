import { useState } from "react";
import { 
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import FormInput from "../FormInput/FormInput.component";
import Button from "../Button/Button.component";

import "./SignInForm.styles.scss";

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: ""
  }

  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
      
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        alert("Either email or password is incorrect");
      } else {
        alert(`There was an error signing in. ${error.message}`);
      }
    }

  }

  const signInWithGoogle = async () => {

    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("Google popup closed by user");
      } else {
        alert(`There was an error signing in Google. ${error.message}`);
      }
    }
  }

  return(
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Email"
          type="email" 
          name="email" 
          value={email}
          onChange={handleInputChange}
          required
        />

        <FormInput 
          label="Password"
          type="password" 
          name="password" 
          value={password}
          onChange={handleInputChange}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
        
      </form>
    </div>
  );
}

export default SignInForm;