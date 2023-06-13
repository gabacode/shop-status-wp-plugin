import React, { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

import { AcceptReservations } from "./AcceptReservations";
import { OpeningDays } from "./OpeningDays";
import { OpeningExceptions } from "./OpeningExceptions";
import { OpeningTimes } from "./OpeningTimes";

const App = () => {
  const API_URL = "/wp-json/shop-status/v1";

  const [isLoading, setIsLoading] = useState(true);

  const [acceptReservations, setAcceptReservations] = useState(false);
  const [checkedDays, setCheckedDays] = useState([]);
  const [openingTimes, setOpeningTimes] = useState([]);
  const [openingExceptions, setOpeningExceptions] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch({ path: `${API_URL}/shop-status` });
      if (data) {
        setAcceptReservations(data.acceptReservations);
        setCheckedDays(data.checkedDays);
        setOpeningTimes(data.openingTimes);
        setOpeningExceptions(data.openingExceptions);
      }
    } catch (error) {
      console.log("GET: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateShopStatus = async () => {
    const options = {
      acceptReservations,
      checkedDays,
      openingTimes,
      openingExceptions,
    };

    setIsLoading(true);

    try {
      await apiFetch({
        path: `${API_URL}/update-shop-status`,
        method: "POST",
        data: options,
      });
    } catch (error) {
      console.log("POST: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    updateShopStatus();
  };

  return isLoading ? (
    <div className="App">Loading...</div>
  ) : (
    <div className="App">
      <AcceptReservations
        title="Opzioni"
        acceptReservations={acceptReservations}
        setAcceptReservations={setAcceptReservations}
      />
      <hr />
      <OpeningDays
        title="Giorni di apertura"
        checkedDays={checkedDays}
        setCheckedDays={setCheckedDays}
      />
      <hr />
      <OpeningTimes
        title="Orari di apertura"
        openingTimes={openingTimes}
        setOpeningTimes={setOpeningTimes}
      />
      <hr />
      <OpeningExceptions
        title="Eccezioni"
        openingExceptions={openingExceptions}
        setOpeningExceptions={setOpeningExceptions}
      />
      <hr />
      <button className="float-right" onClick={handleSave}>
        Salva
      </button>
    </div>
  );
};

export default App;

