import { useState, useContext } from "react";
import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import FormInput from "../FormInput/FormInput.component";
import Button from "../Button/Button.component";

import { UserContext } from "../../contexts/User.context";

import "./SignUpForm.styles.scss";

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

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

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
      
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.");
      } else {
        console.log("User creation encountered an error, ", error);
      }
    }

  }

  return(
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name" 
          type="text" 
          name="displayName" 
          value={displayName}
          onChange={handleInputChange}
          required
        />

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

        <FormInput 
          label="Confirm Password"
          type="password" 
          name="confirmPassword" 
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;