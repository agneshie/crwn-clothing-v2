import { useState } from "react";

import FormInput from "../FormInput/FormInput.component";
import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button.component";


import { 
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./SignInForm.styles";

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
      await signInAuthUserWithEmailAndPassword(email, password);
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
      await signInWithGooglePopup();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("Google popup closed by user");
      } else if (error.code === "auth/cancelled-popup-request") {
        alert("Google cancelled popup by user");
      } else {
        alert(`There was an error signing in Google. ${error.message}`);
      }
    }
  }

  return(
    <SignInContainer>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
        
      </form>
    </SignInContainer>
  );
}

export default SignInForm;