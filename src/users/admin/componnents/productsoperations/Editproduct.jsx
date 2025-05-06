import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext, useState } from "react";
import appcontext from "../../../context/appcontext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Editproduct() {
  const [updatedproduct, setupdatedproduct] = useState({
    price: "",
    title: "",
    productDescription: "",
    img: "",
    count: "",
  });

  const [error, seterror] = useState({
    priceerror: "",
    counterror: "",
    titleerror: "",
    productDescriptionerror: "",
    imgerror: "",
  });

  const { targetedproduct, refresh, setrefresh } = useContext(appcontext);

  const navigate = useNavigate();
  console.log(updatedproduct);

  const validation = () => {
    const allerrors = {};

    if (updatedproduct.price === "") {
      allerrors.priceerror = "This field is required!";
    } else if (isNaN(+updatedproduct.price)) {
      allerrors.priceerror = "Only numbers are allowed!";
    }

    if (updatedproduct.count === "") {
      allerrors.counterror = "This field is required!";
    } else if (isNaN(+updatedproduct.count)) {
      allerrors.counterror = "Only numbers are allowed!";
    }

    if (updatedproduct.title === "") {
      allerrors.titleerror = "This field is required!";
    } else if (!isNaN(+updatedproduct.title)) {
      allerrors.titleerror = "Please add some letters!";
    }

    if (updatedproduct.productDescription === "") {
      allerrors.productDescriptionerror = "This field is required!";
    } else if (!isNaN(+updatedproduct.productDescription)) {
      allerrors.productDescriptionerror = "Please add some letters!";
    }

    if (updatedproduct.img === "") {
      allerrors.imgerror = "This field is required!";
    } else if (!isNaN(+updatedproduct.img)) {
      allerrors.imgerror = "Please add a valid URL!";
    }

    seterror(allerrors);
    return Object.keys(allerrors).length === 0;
  };

  function handlingform(e) {
    e.preventDefault();
    if (validation()) {
      const confirmationfir = Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          try {
            const request = await axios.patch(
              `https://lime-horse-eyebrow.glitch.me/products/${targetedproduct.id}`,
              updatedproduct
            );

            await Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Product updated successfully.",
              confirmButtonColor: "#3085d6",
            });

            setrefresh(!refresh);
            navigate("/admin/products");
          } catch (error) {
            console.error("Error during update:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "There was an issue updating the product!",
            });
          }
        }
      });
    }
  }

  return (
    <form
      onSubmit={handlingform}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border border-gray-300">
        <CardBody className="p-8">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-6 text-center font-bold text-xl">
            Edit Product
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="text"
                value={updatedproduct.title || ""}
                onChange={(e) => {
                  setupdatedproduct({
                    ...updatedproduct,
                    title: e.target.value,
                  });
                }}
                label={error.titleerror ? error.titleerror : "Product title"}
                color={error.titleerror && "red"}
              />
            </div>
            <Input
              value={updatedproduct.count || ""}
              onChange={(e) => {
                setupdatedproduct({ ...updatedproduct, count: e.target.value });
              }}
              label={error.counterror ? error.counterror : "Count"}
              color={error.counterror && "red"}
            />
            <Input
              value={updatedproduct.price || ""}
              onChange={(e) => {
                setupdatedproduct({ ...updatedproduct, price: e.target.value });
              }}
              label={error.priceerror ? error.priceerror : "Price"}
              color={error.priceerror && "red"}
              type="number"
            />
            <Input
              type="text"
              value={updatedproduct.img || ""}
              onChange={(e) => {
                setupdatedproduct({ ...updatedproduct, img: e.target.value });
              }}
              label={error.imgerror ? error.imgerror : "Image URL"}
              color={error.imgerror && "red"}
            />
            <Textarea
              type="text"
              value={updatedproduct.productDescription || ""}
              onChange={(e) => {
                setupdatedproduct({
                  ...updatedproduct,
                  productDescription: e.target.value,
                });
              }}
              label={
                error.productDescriptionerror
                  ? error.productDescriptionerror
                  : "Description"
              }
              color={error.productDescriptionerror && "red"}
              className="h-auto"
              resize={true}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              color="blue-gray"
              className="rounded-full px-6 py-2 shadow-md hover:shadow-lg">
              Back
            </Button>
            <Button
              type="submit"
              color="blue"
              className="rounded-full px-6 py-2 shadow-md hover:shadow-lg">
              Confirm
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
