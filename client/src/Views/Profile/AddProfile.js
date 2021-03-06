import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postProfile, getChef, editProfile } from "../../Redux/actions/user";

import "./AddProfile.css";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const AddProfile = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [isEditProfile, setisEditProfile] = useState(false);
  const profile = useSelector((state) => state.userReducer.profile);
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [newProfile, setNewProfile] = useState({});

  const dispatch = useDispatch();
  const { id_chef } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getChef(user && user._id));
    if (profile) {
      setisEditProfile(true);
    }
  }, [dispatch, user, profile]);

  useEffect(() => {
    if (isEditProfile) {
      setNewProfile({
        name: user && user.name,
        lastName: user && user.lastName,
        gender: profile && profile.gender,
        phoneNumber: profile && profile.phoneNumber,
        domain: profile && profile.domain,
        adresse: profile && profile.adresse,
        departement: profile && profile.departement,
      });
      setdateOfBirth(profile && profile.dateOfBirth);
    } else {
      setNewProfile({
        name: user && user.name,
        lastName: user && user.lastName,
        gender: "female",
      });
    }
  }, [isEditProfile, user, profile]);

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (
      newProfile.adresse &&
      newProfile.domain &&
      newProfile.domain &&
      newProfile.gender &&
      newProfile.departement &&
      dateOfBirth
    ) {
      if (isEditProfile) {
        dispatch(editProfile({ ...newProfile, dateOfBirth }, profile._id));
      } else {
        dispatch(postProfile({ ...newProfile, dateOfBirth }, id_chef));
      }
      history.push("/dashbord");
    } else {
      alert("all fields are  required");
    }
  };

  return (
    <form onSubmit={(e) => handleAddProfile(e)}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="profile"
              />
              <span className="font-weight-bold">{user && user.name}</span>
              <span className="text-black-50">{user && user.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    name="name"
                    value={newProfile.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    name="lastName"
                    value={newProfile.lastName}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">phoneNumber*</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter phone number"
                    name="phoneNumber"
                    required
                    onChange={handleChange}
                    value={newProfile.phoneNumber}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">gender*</label>
                  <select name="gender" id="" onChange={handleChange}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="labels">adresse*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address "
                    onChange={handleChange}
                    value={newProfile.adresse}
                    name="adresse"
                  />
                </div>
              </div>
              <div className="col-md-12 m-3">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Birth*"
                    value={dateOfBirth}
                    onChange={(newValue) => {
                      setdateOfBirth(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>{" "}
              <br />
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={handleAddProfile}
                >
                  {isEditProfile ? "Edit Profile" : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Job Details</span>
              </div>
              <br />
              <br />
              <div className="col-md-12">
                <label className="labels">departement*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Departement"
                  name="departement"
                  required
                  value={newProfile.departement}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="col-md-12">
                <label className="labels">domain*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Domain"
                  name="domain"
                  required
                  onChange={handleChange}
                  value={newProfile.domain}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProfile;
