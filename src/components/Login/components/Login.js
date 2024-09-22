import React, { useState, useEffect } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Shares/ContextFile";
import Loader from "../../Loader";
import { validate } from "./validate";

const Login = () => {
  const { setIsLogIn, setName, setEmail, setMobile, loading, setLoading } =
    useAppContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      if (!data.email) {
        toast("Email is required", { type: "warning" });
      }
      if (!data.password) {
        toast("Password is required", { type: "warning" });
      }
      return;
    }

    setLoading(true);

    try {
      const response = await Axios.post(
        "https://ecommerce-final-0fez.onrender.com/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.status === 200) {
        const { userName, userEmail, userMobile } = response.data;

        setName(userName);
        setEmail(userEmail);
        setMobile(userMobile);
        await toast.promise(Promise.resolve(), {
          success: `Welcome, ${userName}! You logged in successfully`,
          error: "Something went wrong!",
        });
        navigate("/");
        setIsLogIn(true);
      } else {
        toast("Your password or email is wrong", {
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong!", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className={styles.container}>
        <form
          className={styles.formLogin}
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <h2>Sign In</h2>
          <div className="input-container">
            <div>
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="E-mail"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              <img src={emailIcon} alt="" />
              {errors.email && touched.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Password"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              <img src={passwordIcon} alt="" />
              {errors.password && touched.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
          </div>
          <div>
            <button type="submit">Login</button>
            <span
              style={{
                color: "#a29494",
                textAlign: "center",
                display: "inline-block",
                width: "100%",
              }}
            >
              Don't have an account? <Link to="/signup">Create account</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Login;
