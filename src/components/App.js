import React, { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

import "@wordpress/components/build-style/style.css";
import "@icon/dashicons/dashicons.css";

import { Button } from "@wordpress/components";

import { Header } from "./Header";
import { AcceptReservations } from "./AcceptReservations";
import { OpeningDays } from "./OpeningDays";
import { OpeningExceptions } from "./OpeningExceptions";
import { OpeningTimes } from "./OpeningTimes";

import { Logger } from "./atoms/logger";

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

  const validate = (options) => {
    if (options.acceptReservations === true) {
      if (options.openingTimes.length === 0) {
        // alert("Aggiungere almeno un orario di apertura");
        return false;
      }
      const hasEmptyOpeningTime = options.openingTimes.some(
        (time) => time.on_days.length === 0
      );
      if (hasEmptyOpeningTime) {
        //alert("Selezionare almeno un giorno per ogni fascia oraria");
        return false;
      }
    }
    return true;
  };

  const updateShopStatus = async () => {
    const options = {
      acceptReservations,
      checkedDays,
      openingTimes,
      openingExceptions,
    };

    if (!validate(options)) {
      return;
    }

    setIsLoading(true);

    try {
      await apiFetch({
        path: `${API_URL}/update-shop-status`,
        method: "POST",
        data: options,
      });
      alert("Salvataggio effettuato");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    updateShopStatus();
  };

  return isLoading ? (
    <div className="loader">Loading...</div>
  ) : (
    <>
      <div className="App">
        <Header>
          <h1>Shop Status</h1>
          <Button
            describedBy="shop-status-save"
            showTooltip={true}
            text="Salva"
            shortcut="Salva le impostazioni"
            variant="secondary"
            onClick={handleSave}
          />
        </Header>
        <AcceptReservations
          title="Accetta Prenotazioni"
          acceptReservations={acceptReservations}
          setAcceptReservations={setAcceptReservations}
        />
        <OpeningDays
          title="Giorni di apertura"
          checkedDays={checkedDays}
          setCheckedDays={setCheckedDays}
        />
        <OpeningTimes
          title="Orari di apertura"
          openingTimes={openingTimes}
          setOpeningTimes={setOpeningTimes}
        />
        <OpeningExceptions
          title="Eccezioni"
          openingExceptions={openingExceptions}
          setOpeningExceptions={setOpeningExceptions}
        />
      </div>
      <Logger />
    </>
  );
};

export default App;

