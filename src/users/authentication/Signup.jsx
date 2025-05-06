import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp = () => {
  const [user, setuser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    role: "user",
  });

  const [error, seterror] = useState({});

  const navigate = useNavigate();

  const isArabic = (text) => {
    const firstChar = text.trim().charAt(0);
    const code = firstChar.charCodeAt(0);
    return code >= 0x0600 && code <= 0x06ff;
  };

  const handlingformsubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const isUserArabic = isArabic(user.fullname);

    // Full Name
    if (!user.fullname.trim()) {
      newErrors.fullname = isUserArabic
        ? "من فضلك أدخل الاسم."
        : "Please enter your full name.";
    } else if (user.fullname.trim().length < 6) {
      newErrors.fullname = isUserArabic
        ? "الاسم يجب أن يكون 6 حروف على الأقل."
        : "Name must be at least 6 characters.";
    } else if (!nameRegex.test(user.fullname)) {
      newErrors.fullname = isUserArabic
        ? "الاسم يجب أن يحتوي على حروف عربية أو إنجليزية فقط."
        : "Name must contain only Arabic or English letters.";
    }

    // Email
    if (!user.email.trim()) {
      newErrors.email = isUserArabic
        ? "من فضلك أدخل البريد الإلكتروني."
        : "Please enter your email.";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = isUserArabic
        ? "البريد الإلكتروني غير صالح."
        : "Invalid email format.";
    }

    // Password
    if (!user.password.trim()) {
      newErrors.password = isUserArabic
        ? "من فضلك أدخل كلمة المرور."
        : "Please enter a password.";
    } else if (!passwordRegex.test(user.password)) {
      newErrors.password = isUserArabic
        ? "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز، وألا تقل عن 8 حروف."
        : "Password must include uppercase, lowercase, number, special character, and be at least 8 characters.";
    }

    // Phone
    if (!user.phone.trim()) {
      newErrors.phone = isUserArabic
        ? "من فضلك أدخل رقم الهاتف."
        : "Please enter your phone number.";
    } else if (!phoneRegex.test(user.phone)) {
      newErrors.phone = isUserArabic
        ? "رقم الهاتف غير صالح. يجب أن يكون من 10 إلى 15 رقم."
        : "Invalid phone number. Must be between 10 and 15 digits.";
    }

    // Birth Date
    if (!user.birthDate.trim()) {
      newErrors.birthDate = isUserArabic
        ? "من فضلك أدخل تاريخ الميلاد."
        : "Please enter your birth date.";
    }

    seterror(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", user);

      try {
        const res = await axios({
          method: "post",
          url: "https://lime-horse-eyebrow.glitch.me/users",
          data: user,
        });

        console.log("User created successfully:", res.data);

        Swal.fire({
          icon: "success",
          title: isUserArabic
            ? "تم إنشاء الحساب بنجاح!"
            : "Sign up successful!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setuser({
            fullname: "",
            email: "",
            password: "",
            phone: "",
            birthDate: "",
          });

          navigate("/Login");
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        Swal.fire({
          icon: "error",
          title: isUserArabic
            ? "حدث خطأ أثناء إنشاء الحساب!"
            : "An error occurred during sign up!",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 py-12">
      <form
        onSubmit={handlingformsubmit}
        className="z-20 w-full mt-10 max-w-md bg-white shadow-md rounded-lg px-8 py-4">
        <Typography
          variant="h4"
          className="text-center mb-4 bg-yellow-400 shadow-lg text-black p-3 rounded-lg">
          Create account
        </Typography>

        {/* Full Name */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <Input
            onChange={(e) => setuser({ ...user, fullname: e.target.value })}
            value={user.fullname}
            size="lg"
            type="text"
            placeholder="Your full name"
            className="mt-1"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {error.fullname && (
            <p className="text-red-500 text-sm mt-2">{error.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            value={user.email}
            size="lg"
            type="email"
            placeholder="you@example.com"
            className="mt-1"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-2">{error.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            value={user.password}
            type="password"
            size="lg"
            placeholder="********"
            className="mt-1"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-2">{error.password}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <Input
            onChange={(e) => setuser({ ...user, phone: e.target.value })}
            value={user.phone}
            size="lg"
            type="tel"
            placeholder="Phone number"
            className="mt-1"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {error.phone && (
            <p className="text-red-500 text-sm mt-2">{error.phone}</p>
          )}
        </div>

        {/* Birth Date */}
        <div className="mb-3">
          <label className="text-sm font-medium text-gray-700">
            Birth Date
          </label>
          <Input
            onChange={(e) => setuser({ ...user, birthDate: e.target.value })}
            value={user.birthDate}
            type="date"
            size="lg"
            className="mt-1"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {error.birthDate && (
            <p className="text-red-500 text-sm mt-2">{error.birthDate}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full text-[1.2em] font-extrabold bg-yellow-400 hover:bg-yellow-500 text-black">
          Sign Up
        </Button>

        <Typography className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default SignUp;
