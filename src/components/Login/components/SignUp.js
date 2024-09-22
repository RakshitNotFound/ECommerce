import React, { useEffect, useState } from "react";
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import { AiFillPhone } from "react-icons/ai";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Shares/ContextFile";
import Loader from "../../Loader";

const SignUp = () => {
  const { setIsLogIn, setName, setEmail, setMobile, loading, setLoading } =
    useAppContext();
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
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

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !data.name ||
      !data.email ||
      !data.number ||
      !data.password ||
      !data.confirmPassword
    ) {
      if (!data.name) {
        notify("Name is required", "warning");
      }
      if (!data.email) {
        notify("Email is required", "warning");
      }
      if (!data.number) {
        notify("Mobile Number is required", "warning");
      }
      if (!data.password) {
        notify("Password is required", "warning");
      }
      if (!data.confirmPassword) {
        notify("Confirm Password is required", "warning");
      }
      return;
    }

    setLoading(true);
    Axios.post("https://ecommerce-final-0fez.onrender.com/signup", {
      name: data.name,
      email: data.email,
      number: data.number,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        navigate("/");
        setName(data.name);
        setMobile(data.number);
        setEmail(data.email);
        setIsLogIn(true);
        notify("You signed up successfully", "success");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400 && err.response.data.message) {
          notify(err.response.data.message, "warning");
        } else {
          notify("Something went wrong!", "error");
        }
        setLoading(false);
      });
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
          <h2>Sign Up</h2>
          <div>
            <div
              className={
                errors.name && touched.name
                  ? styles.unCompleted
                  : !errors.name && touched.name
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder="Name"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              <img src={userIcon} alt="" />
            </div>
            {errors.name && touched.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>
          <div>
            <div
              className={
                errors.email && touched.email
                  ? styles.unCompleted
                  : !errors.email && touched.email
                  ? styles.completed
                  : undefined
              }
            >
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
            </div>
            {errors.email && touched.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div>
            <div
              className={
                errors.number && touched.number
                  ? styles.unCompleted
                  : !errors.number && touched.number
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="number"
                name="number"
                value={data.number}
                placeholder="Mobile Number"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              <AiFillPhone className={styles.mobileIcon} />
            </div>
            {errors.number && touched.number && (
              <span className={styles.error}>{errors.number}</span>
            )}
          </div>

          <div>
            <div
              className={
                errors.password && touched.password
                  ? styles.unCompleted
                  : !errors.password && touched.password
                  ? styles.completed
                  : undefined
              }
            >
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
            </div>
            {errors.password && touched.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <div>
            <div
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? styles.unCompleted
                  : !errors.confirmPassword && touched.confirmPassword
                  ? styles.completed
                  : !errors.confirmPassword && touched.confirmPassword
                  ? styles.completed
                  : undefined
              }
            >
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                placeholder="Confirm Password"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              <img src={passwordIcon} alt="" />
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          <div>
            <div className={styles.terms}>
              <input
                type="checkbox"
                name="IsAccepted"
                value={data.IsAccepted}
                id="accept"
                onChange={changeHandler}
                onFocus={focusHandler}
              />
              <label htmlFor="accept">I accept terms of privacy policy</label>
            </div>
            {errors.IsAccepted && touched.IsAccepted && (
              <span className={styles.error}>{errors.IsAccepted}</span>
            )}
          </div>
          <div>
            <button type="submit">Create Account</button>
            <span
              style={{
                color: "#a29494",
                textAlign: "center",
                display: "inline-block",
                width: "100%",
              }}
            >
              Already have a account? <Link to="/login">Sign In</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default SignUp;
