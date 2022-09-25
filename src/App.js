import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Shop from "./components/shop/shop.component";
import Navigation from "./routes/navigation/navigation.component";
import SignUpForm from "./routes/sign-up/sign-up-form.component";
import SignInForm from "./routes/sign-in/sign-in-form.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Route>
    </Routes>
  );
};

export default App;
