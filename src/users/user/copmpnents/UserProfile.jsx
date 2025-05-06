import React, { useState, useContext } from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import appcontext from "../../context/appcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [updteduser, setupdteduser] = useState({
    fullname: "",
    email: "",
    phone: "",
  });
  const { logeduserinfo } = useContext(appcontext);
  const [valid, setvalid] = useState({});
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const validation = () => {
    let newerrors = {};
    let newvalidators = {};
    const emailvalidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonevalidation = /^\+?[0-9]{10,15}$/;
    updteduser.fullname.trim();
    if (updteduser.fullname === "") {
      newerrors.fullname = "Please enter your full name";
    }
    if (updteduser.email === "") {
      newerrors.email = "Please enter your email";
    }
    if (!emailvalidation.test(updteduser.email)) {
      newerrors.email = "Invalid email format";
    }
    if (!phonevalidation.test(updteduser.phone)) {
      newerrors.phone = "Invalid phone format";
    }

    setvalid(newvalidators);
    seterror(newerrors);
    return Object.keys(newerrors).length === 0;
  };

  const handlingvalidation = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        await axios.patch(
          `https://lime-horse-eyebrow.glitch.me/users/${logeduserinfo.id}`,
          updteduser
        );
      } catch (error) {
        console.log("Updating error due to server issue");
      }
      navigate("/");
    }
  };

  return (
    <section className="bg-white px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1">
        Update your profile information below.
      </Typography>
      <form onSubmit={handlingvalidation} className="flex flex-col mt-8">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              Full Name
            </Typography>
            <Input
              readOnly
              value={logeduserinfo.fullname}
              size="lg"
              placeholder="Emma"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              New Full Name
              {error.fullname && (
                <span className="text-red-600"> ({error.fullname})</span>
              )}
              {valid.fullname && (
                <span className="text-blue-900"> ({valid.fullname})</span>
              )}
            </Typography>
            <Input
              value={updteduser.fullname}
              onChange={(e) =>
                setupdteduser({ ...updteduser, fullname: e.target.value })
              }
              size="lg"
              placeholder="Roberts"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              Email
            </Typography>
            <Input
              readOnly
              value={logeduserinfo.email}
              size="lg"
              placeholder="emma@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              New Email
              {error.email && (
                <span className="text-red-600"> ({error.email})</span>
              )}
              {valid.email && (
                <span className="text-blue-900"> ({valid.email})</span>
              )}
            </Typography>
            <Input
              value={updteduser.email}
              onChange={(e) =>
                setupdteduser({ ...updteduser, email: e.target.value })
              }
              size="lg"
              placeholder="emma@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              Phone Number
            </Typography>
            <Input
              readOnly
              value={logeduserinfo.phone}
              size="lg"
              placeholder="+123 0123 456 789"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium">
              New Phone Number
              {error.phone && (
                <span className="text-red-600"> ({error.phone})</span>
              )}
              {valid.phone && (
                <span className="text-blue-900"> ({valid.phone})</span>
              )}
            </Typography>
            <Input
              value={updteduser.phone}
              onChange={(e) =>
                setupdteduser({ ...updteduser, phone: e.target.value })
              }
              size="lg"
              placeholder="+123 0123 456 789"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Button size="md" type="submit">
            Update
          </Button>
          <Button size="md" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </form>
    </section>
  );
}

export default UserProfile;
