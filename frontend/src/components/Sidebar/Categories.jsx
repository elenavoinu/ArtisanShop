import React, { useEffect } from "react";
import { Col, Button, Accordion, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getSidebarStatus,
  setSidebarOn,
  setSidebarOff,
} from "../../slices/sidebarSlice";
import {
  fetchAsyncCategories,
  getAllCategories,
} from "../../slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  // Function to toggle the sidebar on/off
  const toggleSidebar = () => {
    if (isSidebarOn) {
      dispatch(setSidebarOff());
    } else {
      dispatch(setSidebarOn());
    }
  };

  return (
    <Col lg={3} className={`sidebar ${isSidebarOn ? "" : "hide-sidebar"}`}>
      <Button
        variant="primary"
        className="shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
        onClick={toggleSidebar}
        style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
      >
        <h6 className="m-0">Categories</h6>
        <i
          className={`fa fa-angle-${isSidebarOn ? "up" : "down"} text-dark`}
        ></i>
      </Button>
      <Accordion id="categories-collapse" activeKey={isSidebarOn ? "0" : ""}>
        <Accordion.Collapse eventKey="0">
          <div>
            <ListGroup>
              {categories.map((category, idx) => {
                return (
                  <ListGroup.Item
                    key={idx}
                    action
                    href={`category/${category}`}
                    onClick={() => dispatch(setSidebarOff())}
                  >
                    {category.replace("-", " ")}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
};

export default Categories;