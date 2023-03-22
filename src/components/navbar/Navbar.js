import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { addSearch } from "../../features/filters/filterSlice";
import logo from "../../images/logo.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const match = useMatch("/");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (!match) {
      navigate("/");
    }
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch(addSearch(input));
  }, [dispatch, input]);

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            value={input}
            onChange={handleChange}
          />
        </div>
      </div>
    </nav>
  );
}
