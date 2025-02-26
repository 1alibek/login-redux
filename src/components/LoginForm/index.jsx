import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button, Typography } from "@mui/material";
import { Divider } from "antd";
import img from "../../assets/1.png"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
      } else {
        toast.error(result.payload);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className=" rounded-lg p-8 w-full max-w-md">
        <Typography variant="h5" className="mb-4 !font-semibold text-[15px]">
          Login
        </Typography>
        <p className=" opacity-75">Login to access your travelwise account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {/* 🔹 Forgot Password */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <input className="mt-1" type="checkbox" />
            <p>Remember me</p>
          </div>
          <Link to="/forgot-password" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="!mt-4 hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-center py-2">
          Don’t have an account?{" "}
          <span className="text-red-500 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
        <Divider textAlign="center" className="my-4 text-gray-400">
          <p className="text-gray-400 font-normal"> Or login with</p>
        </Divider>
        <img src={img} alt="" />
      </div>
      <img
        src="https://s3-alpha-sig.figma.com/img/f031/e5b1/caa0632b7cb3d2dc29294fc91b0a771f?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lkMc1ji7osOpBKnA8PR8I5Yew6cxS3aVV5GJBOL5V91DzOTL7ne3OTHkg8uTyNTvm7PMao7wVuTq7ziSPrvGKamQHDR40gvhrkzOOOFxOderqcR0pCBi7WurJfWiGMg0tRbB8VkQQxDynnqYPMFMUQaWmI~VZhEQ2mU0Q0-dSur6MyWY4qYQxXvBDwtBLwKoYBMDL1G60L86rJVWUkvbcBuTLP7LGfmWfTnvkOzZZYd-6uyK-9QFCUbmE3p-Sar0VKzZ3ox6yi08NBiMUDPY44cTUkM6gF9mckCOrhvu69ZWdnu~nuBR5V4tIYWBVB3vy1XElzO2sQBj-LDs0xOAZg__"
        alt=""
      />
    </div>
  );
};

export default LoginForm;
