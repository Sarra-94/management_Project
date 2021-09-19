import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DemandeCard from "../../Components/DemandCard/DemandeCard";

import {
  getDemandesChef,
  getDemandesClient,
  isEdit,
} from "../../Redux/actions/demandes";

import { CircularProgress } from "@mui/material";
import "./ListDemandes.css";

const ListDemande = () => {
  const demandes = useSelector((state) => state.demandeReducer.demandes);
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);
  const loadDemandes = useSelector(
    (state) => state.demandeReducer.loadDemandes
  );
  const errors = useSelector((state) => state.demandeReducer.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isEdit(true));
    if (user && user.role == "client") {
      dispatch(getDemandesClient());
    } else {
      dispatch(getDemandesChef());
    }
  }, [dispatch]);

  return (
    <div>
      {loadDemandes ? (
        <CircularProgress />
      ) : errors ? (
        <h1>error to fetch the demandes</h1>
      ) : demandes && demandes.length == 0 ? (
        <h1 className="demande-title">You have no demande yet</h1>
      ) : (
        <div className="list-demandes">
          {demandes &&
            demandes.map((el) => <DemandeCard demande={el} key={el._id} />)}
        </div>
      )}
    </div>
  );
};

export default ListDemande;