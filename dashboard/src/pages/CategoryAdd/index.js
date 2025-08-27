import React, { useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { FaCloudArrowUp } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../../utils/Api";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress
import { useNavigate } from "react-router-dom";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    color: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addimgurl = (e) => {
    setFormFields((prevState) => ({
      ...prevState,
      images: [...prevState.images, e.target.value],
    }));
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (
      !formFields.name ||
      !formFields.description ||
      !formFields.images.length
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/category/create", formFields);
      console.log("API Response:", res);

      if (res?.success) {
        toast.success("Category added successfully!");
        navigate("/category/list");
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error while adding category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Top loading bar */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1201, // Higher than most UI elements
          }}
        >
          <LinearProgress />
        </Box>
      )}

      <div className="right-contentt w-100">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="cardd shadow border-0 w-100"
        >
          <h5 className="m-3 p-2">Add a Category</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Category" component="a" href="/category" />
            <StyledBreadcrumb label="Add a Category" />
          </Breadcrumbs>
        </Box>

        <form className="form mt-4 formform" onSubmit={addCategory}>
          <div className="row ml-3">
            <div className="col-md-12 ml-3">
              <div className="card p-4 mt-0">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group">
                  <h6>Category Name</h6>
                  <input
                    type="text"
                    name="name"
                    onChange={inputChange}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="form-group">
                  <h6>Description</h6>
                  <textarea
                    name="description"
                    onChange={inputChange}
                    placeholder="Enter category description"
                  />
                </div>

                <div className="form-group">
                  <h6>Image URL</h6>
                  <input
                    type="text"
                    name="images"
                    onChange={addimgurl}
                    placeholder="Enter category image URL"
                  />
                </div>

                <div className="form-group">
                  <h6>Color</h6>
                  <input
                    type="text"
                    name="color"
                    onChange={inputChange}
                    placeholder="Enter category color"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-blue btn-lg btn-big"
                  disabled={isLoading}
                >
                  <FaCloudArrowUp /> &nbsp;{" "}
                  {isLoading ? (
                    <CircularProgress size={24} color="#ffffff" />
                  ) : (
                    "Publish Category"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductDetails;
