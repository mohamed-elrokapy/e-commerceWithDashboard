import React, { useContext, useState } from "react";
import appcontext from "../../context/appcontext";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Fragment } from "react";

const Userstable = () => {
  const { refresh, setrefresh, allusers, settargeteduser } =
    useContext(appcontext);
  const navigate = useNavigate();

  function navigattouserview(id) {
    const user = allusers.find((user) => user.id === id);
    settargeteduser(user);
    navigate("/admin/userview");
  }

  function navigattouseredit(id) {
    const user = allusers.find((user) => user.id === id);
    settargeteduser(user);
    navigate("/admin/useredit");
  }

  const deleteuser = async function deleteuser(id) {
    const user = allusers.find((user) => user.id === id);
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            await axios.delete(
              `https://lime-horse-eyebrow.glitch.me/users/${user.id}`
            );
            setrefresh(!refresh);
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "User deleted successfully.",
              confirmButtonColor: "#3085d6",
            });
          } catch (error) {
            console.log("server error", error);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Something went wrong while deleting the user.",
            });
          }
        }
      });
    }
  };

  const changerole = async (id) => {
    const user = allusers.find((user) => user.id === id);
    if (user) {
      const newRole = user.role === "admin" ? "user" : "admin";
      try {
        await axios.patch(
          `https://lime-horse-eyebrow.glitch.me/users/${user.id}`,
          {
            role: newRole,
          }
        );
        setrefresh(!refresh);
        Swal.fire({
          icon: "success",
          title: "Role Changed",
          text: `User role changed to ${newRole}`,
          confirmButtonColor: "#3085d6",
        });
      } catch (error) {
        console.log("Error updating role:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong while changing the role.",
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col w-[95%] h-full mx-auto text-gray-300 bg-gray-800 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  User Name
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Role
                </p>
              </th>
              <th className="p-4 border-b border-gray-600 bg-gray-700">
                <p className="text-sm font-normal leading-none text-gray-300">
                  Operations
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((user) => (
              <Fragment key={user.id}>
                <tr className="border-b hover:bg-gray-700">
                  <td className="p-4 border-gray-700">
                    <p className="text-sm text-gray-100 font-semibold">
                      {user.fullname}
                    </p>
                  </td>
                  <td className="p-4 border-gray-700">
                    <p className="text-sm text-gray-300">{user.role}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-300 flex justify-between">
                      <Button
                        onClick={() => navigattouserview(user.id)}
                        className="p-2 w-[19%]">
                        View
                      </Button>
                      <Button
                        onClick={() => navigattouseredit(user.id)}
                        className="p-2 w-[19%]">
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteuser(user.id)}
                        className="p-2 w-[23%]">
                        Delete
                      </Button>
                      <Button
                        onClick={() => changerole(user.id)}
                        className="p-2 w-[36%]">
                        {user.role === "admin" ? "Set to User" : "Set to Admin"}
                      </Button>
                    </p>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userstable;
