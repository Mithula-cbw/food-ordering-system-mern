import React, { useState } from "react";
import axios from "axios";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaCloudArrowUp } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosImages } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [categoryVal, setCategoryVal] = useState("");
  const [typeVal, setTypeVal] = useState("");
  const [featuredVal, setFeaturedVal] = useState("");
  const [ratingValue, setRatingValue] = useState(1);
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    color: "",
    countInStock: "",
    brand: "",
    discount: "",
  });

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
  };

  const handleChangeType = (event) => {
    setTypeVal(event.target.value);
  };

  const handleChangeFeatured = (event) => {
    setFeaturedVal(event.target.value);
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formFields.name);
    formData.append("description", formFields.description);
    formData.append("price", formFields.price);
    formData.append("oldPrice", formFields.oldPrice);
    formData.append("color", formFields.color);
    formData.append("countInStock", formFields.countInStock);
    formData.append("brand", formFields.brand);
    formData.append("discount", formFields.discount);
    formData.append("category", categoryVal);
    formData.append("type", typeVal);
    formData.append("featured", featuredVal);
    formData.append("size", size);
    formData.append("rating", ratingValue);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post("http://localhost:4000/api/category/create", formData);
      toast.success("Product uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error("Error uploading product!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="right-contentt w-100">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="cardd shadow border-0 w-100"
        >
          <h5 className="m-3 p-2">Food Item Upload</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Products"
              component="a"
              href="/product/details"
            />
            <StyledBreadcrumb label="Food Item Upload" />
          </Breadcrumbs>
        </Box>

        <form className="form mt-4 formform" onSubmit={submitForm}>
          <div className="row ml-3">
            <div className="col-md-12 ml-3">
              <div className="card p-4 mt-0">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group">
                  <h6>Food Item Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={formFields.name}
                    onChange={handleInputChange}
                    placeholder="Enter food item name"
                  />
                </div>

                <div className="form-group">
                  <h6>Description</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    value={formFields.description}
                    onChange={handleInputChange}
                    placeholder="Enter food item description"
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Category</h6>
                      <Select
                        value={categoryVal}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Meal">Meal</MenuItem>
                        <MenuItem value="Burgers">Burgers</MenuItem>
                        <MenuItem value="Dessert">Dessert</MenuItem>
                        <MenuItem value="Beverage">Beverage</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Type</h6>
                      <Select
                        value={typeVal}
                        onChange={handleChangeType}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Non-Vegetarian">
                          Non-Vegetarian
                        </MenuItem>
                        <MenuItem value="Vegan">Vegan</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Regular Price</h6>
                      <input
                        type="text"
                        name="price"
                        value={formFields.price}
                        onChange={handleInputChange}
                        placeholder="Enter regular price"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Old Price (if any)</h6>
                      <input
                        type="text"
                        name="oldPrice"
                        value={formFields.oldPrice}
                        onChange={handleInputChange}
                        placeholder="Enter old price"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Featured</h6>
                      <Select
                        value={featuredVal}
                        onChange={handleChangeFeatured}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Product Stock</h6>
                      <input
                        type="text"
                        name="countInStock"
                        value={formFields.countInStock}
                        onChange={handleInputChange}
                        placeholder="Enter stock quantity"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>Brand</h6>
                      <input
                        type="text"
                        name="brand"
                        value={formFields.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>Discount (%)</h6>
                      <input
                        type="text"
                        name="discount"
                        value={formFields.discount}
                        onChange={handleInputChange}
                        placeholder="Enter discount percentage"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <h6>Size</h6>
                      <Select
                        value={size}
                        onChange={handleChangeSize}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <h6>Rating</h6>
                  <Rating
                    name="rating"
                    value={ratingValue}
                    onChange={(event, newValue) => setRatingValue(newValue)}
                  />
                </div>
                <div className="card p-4 mt-0">
                  <div className="imageUploadSec">
                    <h5 className="mb-4">Media And Published</h5>
                    <div className="imgUploadBox d-flex align-items-center gap-3">
                      {images.map((image, index) => (
                        <div key={index} className="uploadBox">
                          <span
                            className="remove"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <IoCloseSharp />
                          </span>
                          <div className="box">
                            <LazyLoadImage
                              alt="uploaded-preview"
                              effect="blur"
                              src={URL.createObjectURL(image)}
                              className="w-100"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="uploadBox">
                        <input
                          type="file"
                          multiple
                          onChange={handleImageUpload}
                        />
                        <div className="info">
                          <IoIosImages /> &nbsp;
                          <h5>Upload Images</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="btn-blue btn-lg btn-big"
                  onClick={submitForm}
                  variant="contained"
                >
                  <FaCloudArrowUp /> &nbsp; Publish and View
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
