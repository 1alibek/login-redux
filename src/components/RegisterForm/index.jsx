import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { toast } from "react-toastify";
import img from "../../assets/1.png";
import img2 from "../../assets/2.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Registered successfully!");
        navigate("/login");
      } else {
        toast.error(result.payload || "Registration failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white w-full px-4">
      <img
        className="w-[400px] h-[600px] object-contain hidden md:block"
        src={img2}
        alt="Travel illustration"
      />

      <div className="rounded-lg p-8 w-full max-w-md">
        <Typography variant="h5" className="mb-4 !font-semibold text-[15px]">
          Sign up
        </Typography>
        <p className="opacity-75">
          Let’s get you all set up so you can access your personal account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Surname"
              fullWidth
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className="!mt-4 hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center py-2">
          Already have an account?{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        <Divider textAlign="center" className="my-4 text-gray-400 py-2">
          <p className="text-gray-400 font-normal"> Or sign up with</p>
        </Divider>
        <img src={img} alt="Social Login" className="mx-auto" />
      </div>
    </div>
  );
};

export default RegisterForm;
