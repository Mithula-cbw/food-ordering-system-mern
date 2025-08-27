import React, { useRef } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdOutlineBrandingWatermark, MdStar } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import LinearProgress from "@mui/material/LinearProgress";
import { IoPricetags } from "react-icons/io5";
import { SiZenn } from "react-icons/si";
import { RiPriceTag2Fill } from "react-icons/ri";
import { RiStockFill } from "react-icons/ri";
import { MdOutlineReviews } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import UserAvatar from "../../components/UserAvatar";
import logo2 from "../../assets/images/thumbnail.png";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaReply } from "react-icons/fa";

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
  const productSliderBig = useRef();
  const productSliderSml = useRef();

  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var productSlidersmlOptions = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const goToSlide = (index) => {
    productSliderBig.current.slickGoTo(index);
    productSliderSml.current.slickGoTo(index);
  };
  return (
    <>
      <div className="right-contentt w-100">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="cardd shadow border-0 w-100"
        >
          <h5 className="m-3 p-2">Product View</h5>
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
              href="/product/list"
            />
            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </Box>
        <div className="card productDetailSection">
          <div className="row">
            <div className="col-md-4 pb-3 pl-4 pr-4">
              <div className="sliderWrapper p-4">
                <h6 className="mb-4">Product Gallery</h6>
                <Slider
                  {...productSliderOptions}
                  ref={productSliderBig}
                  className="sliderBig"
                >
                  <div className="item">
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                </Slider>
                <Slider
                  {...productSlidersmlOptions}
                  ref={productSliderSml}
                  className="sliderSml"
                >
                  <div className="item" onClick={() => goToSlide(0)}>
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(1)}>
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>

                  <div className="item" onClick={() => goToSlide(2)}>
                    <img
                      src="https://adminsc.pizzahut.lk//images/mainmenu/9a4b439b-c193-49a0-a946-1a3d6e8f6dd5.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-md-8 ml-3">
              <div className="pt-4 pb-3 pl-4 pr-4 hlo">
                <h6 className="mb-3">Product Details</h6>
                <h4>
                  A pizza topped with Spicy Chicken, Green Chillies, Onions &
                  Mozzarella
                </h4>
                <div className="productInfo">
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <MdOutlineBrandingWatermark />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-md-8">
                      : <span>Pizza</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <BiSolidCategory />
                      </span>
                      <span className="name">Type</span>
                    </div>
                    <div className="col-md-8">
                      : <span>Vegetarian</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <IoPricetags />
                      </span>
                      <span className="name">Tags</span>
                    </div>
                    <div className="col-md-8">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list list-inline">
                            <span>Pizza</span>
                          </li>
                          <li className="list list-inline">
                            <span>vegetarian</span>
                          </li>
                          <li className="list list-inline">
                            <span>special</span>
                          </li>
                          <li className="list list-inline">
                            <span>Mozzarella</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <SiZenn />
                      </span>
                      <span className="name">Size</span>
                    </div>
                    <div className="col-md-8">
                      :{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list list-inline">
                            <span>Small</span>
                          </li>
                          <li className="list list-inline">
                            <span>Medium</span>
                          </li>
                          <li className="list list-inline">
                            <span>Large</span>
                          </li>
                          <li className="list list-inline">
                            <span>Supreme</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <RiPriceTag2Fill />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-md-8">
                      : <span>$13.00</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <RiStockFill />
                      </span>
                      <span className="name">Stock</span>
                    </div>
                    <div className="col-md-8">
                      : <span>IN Stock</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <MdOutlineReviews />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div className="col-md-8">
                      : <span>(03)Reviews</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 d-flex align-items-center">
                      <span className="icon">
                        <MdDescription />
                      </span>
                      <span className="name">Description</span>
                    </div>
                    <div className="col-md-8">
                      :{" "}
                      <span>
                        {" "}
                        A pizza topped with Spicy Chicken, Green Chillies,
                        Onions & Mozzarella
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h5 className="mt-4 mb-3">Product Description</h5>
            <p
              style={{
                fontWeight: "500",
                fontSize: "15px",
                lineHeight: "25px",
              }}
            >
              Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent
              aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc
              sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum
              sit amet eros sit amet, ultricies cursus ipsum. Sed consequat
              luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam
              ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in
              vestibulum vulputate, lorem orci convallis quam, sit amet
              consequat nulla felis pharetra lacus. Duis semper erat mauris, sed
              egestas purus commodo vel.
            </p>

            <h5 className="mt-4 mb-3">Rating Analytics</h5>
            <div className="ratingSection">
              <div className="ratingBreakdown">
                {[
                  { star: 5, percentage: "85%", count: 22 },
                  { star: 4, percentage: "65%", count: 6 },
                  { star: 3, percentage: "40%", count: 5 },
                  { star: 2, percentage: "20%", count: 3 },
                  { star: 1, percentage: "10%", count: 2 },
                ].map((rating, index) => (
                  <div className="ratingrow" key={index}>
                    <span className="col1">{rating.star} Star</span>
                    <div className="col2">
                      <div
                        className="progress-bar"
                        style={{ width: rating.percentage }}
                      ></div>
                    </div>
                    <span className="col3">({rating.count})</span>
                  </div>
                ))}
              </div>

              {/* Right section for overall rating summary */}
              <div className="summary mt-4">
                <p>Total Review (38)</p>
                <h3>4.9</h3>
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <MdStar key={index} />
                  ))}
                </div>
                <p>Your Average Rating Star</p>
              </div>
            </div>
            <h5 className="mt-4 mb-3">Customer Reviews</h5>
            <div className="reviewSection">
              <div className="reviewRow">
                <div className="row">
                  <div className="col-md-10">
                    <div className="w-100 d-flex">
                      <div className="userInfo d-flex align-items-center">
                        <UserAvatar img={logo2} lg={true} />
                        <div
                          className="info ml-3"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          <h6>Dasun sandeepa</h6>
                          <span style={{ fontSize: "13px" }}>
                            25 minutes ago!
                          </span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                        className="pl-3 ml-3 rat"
                      />
                    </div>
                    <p className="pt-4 w-100" style={{ color: "white" }}>
                      Sed consequat luctus ligula. Curabitur laoreet rhoncus
                      blandit. Aenean vel diam ut arcu pharetra dignissim ut sed
                      leo. Vivamus faucibus, ipsum in vestibulum vulputate,
                      lorem orci convallis quam, sit amet consequat nulla felis
                      pharetra lacus. Duis semper erat mauris, sed egestas purus
                      commodo vel.
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Button className="btn-blue btn-lg ml-auto btnn">
                      <FaReply />
                      &nbsp; Reply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-md-9">
                    <div className="w-100 d-flex">
                      <div className="userInfo d-flex align-items-center">
                        <UserAvatar img={logo2} lg={true} />
                        <div
                          className="info ml-3"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          <h6>Dasun sandeepa</h6>
                          <span style={{ fontSize: "13px" }}>
                            25 minutes ago!
                          </span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                        className="pl-3 ml-3 rat"
                      />
                    </div>
                    <p className="pt-4 w-100" style={{ color: "white" }}>
                      Sed consequat luctus ligula. Curabitur laoreet rhoncus
                      blandit. Aenean vel diam ut arcu pharetra dignissim ut sed
                      leo. Vivamus faucibus, ipsum in vestibulum vulputate,
                      lorem orci convallis quam, sit amet consequat nulla felis
                      pharetra lacus. Duis semper erat mauris, sed egestas purus
                      commodo vel.
                    </p>
                  </div>
                  <div className="col-md-3">
                    <Button className="btn-blue btn-lg ml-auto btnn">
                      <FaReply />
                      &nbsp; Reply
                    </Button>
                  </div>
                </div>
              </div>
              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-md-9">
                    <div className="w-100 d-flex">
                      <div className="userInfo d-flex align-items-center">
                        <UserAvatar img={logo2} lg={true} />
                        <div
                          className="info ml-3"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          <h6>Dasun sandeepa</h6>
                          <span style={{ fontSize: "13px" }}>
                            25 minutes ago!
                          </span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                        className="pl-3 ml-3 rat"
                      />
                    </div>
                    <p className="pt-4 w-100" style={{ color: "white" }}>
                      Sed consequat luctus ligula. Curabitur laoreet rhoncus
                      blandit. Aenean vel diam ut arcu pharetra dignissim ut sed
                      leo. Vivamus faucibus, ipsum in vestibulum vulputate,
                      lorem orci convallis quam, sit amet consequat nulla felis
                      pharetra lacus. Duis semper erat mauris, sed egestas purus
                      commodo vel.
                    </p>
                  </div>
                  <div className="col-md-3">
                    <Button className="btn-blue btn-lg ml-auto btnn">
                      <FaReply />
                      &nbsp; Reply
                    </Button>
                  </div>
                </div>
              </div>
              <div className="reviewRow">
                <div className="row">
                  <div className="col-md-10">
                    <div className="w-100 d-flex">
                      <div className="userInfo d-flex align-items-center">
                        <UserAvatar img={logo2} lg={true} />
                        <div
                          className="info ml-3"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          <h6>Dasun sandeepa</h6>
                          <span style={{ fontSize: "13px" }}>
                            25 minutes ago!
                          </span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                        className="pl-3 ml-3 rat"
                      />
                    </div>
                    <p className="pt-4 w-100" style={{ color: "white" }}>
                      Sed consequat luctus ligula. Curabitur laoreet rhoncus
                      blandit. Aenean vel diam ut arcu pharetra dignissim ut sed
                      leo. Vivamus faucibus, ipsum in vestibulum vulputate,
                      lorem orci convallis quam, sit amet consequat nulla felis
                      pharetra lacus. Duis semper erat mauris, sed egestas purus
                      commodo vel.
                    </p>
                  </div>
                  <div className="col-md-2">
                    <Button className="btn-blue btn-lg ml-auto btnn">
                      <FaReply />
                      &nbsp; Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="mt-4 mb-3">Review Reply Form</h5>

            <form className="reviewForm mb-4">
              <textarea placeholder="Write here"></textarea>
              <Button
                className="btn-blue btn-lg ml-auto w-100 mt-3"
                style={{ overflow: "hidden" }}
              >
                DROP YOUR REPLIES
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
