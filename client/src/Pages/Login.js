import { useState, useContext } from "react";
import { Context } from "../ContextStore";
import { loginUser } from "../services/userData";
import { Link } from "react-router-dom";
import SimpleSider from "../components/Siders/SimpleSider";

function Login({ history }) {
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setUserData } = useContext(Context);

  const handleChanges = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser(user)
      .then((res) => {
        if (!res.error) {
          setUserData(res.user);
          history.push("/");
        } else {
          setLoading(false);
          setError(res.error.message);
          setAlertShow(true);
        }
      })
      .catch((err) => console.error("error from login: ", err));
  };

  return (
    <>
      <SimpleSider />
      <div className="container auth-form">
        <h1 className="auth_heading">Մուտք</h1>
        <form className="login_form_wrapper" onSubmit={handleSubmitLogin}>
          {alertShow && (
            <div
              variant="danger"
              onClose={() => setAlertShow(false)}
              dismissible
            >
              <p>{error}</p>
            </div>
          )}
          <div className="login_input_wrapper">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChanges}
              required
            />
          </div>
          <div className="password_wrapper">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChanges}
              required
            />
          </div>
          {loading ? (
            <button className="wait_btn">Please wait...</button>
          ) : (
            <button className="login_sign_btn">Մուտք</button>
          )}
          <p className="bottom-msg-paragraph">
            եթե գրանցված չեք <Link to="/auth/register">Գրանցվել</Link>!
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
