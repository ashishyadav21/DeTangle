import React, { useState, useEffect } from "react";
import CardsRender from "../Cards/CardsRender";
import axios from "../../axios-detangle";
import Calender from "../Calender/Calender";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  displayCards: {
    flexDirection: "column",
    padding: "20px 20px !important",
    height: "275px",
    width: "450px",
    margin: "auto",
    marginBottom: "30px",
  },
  eventContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
  },
  view: { width: "80%",
  alignItems: "center",
  justifyContent: "space-around"
 },
 buttonContainer : {
  padding: "30px 30px",
  textAlign: "center"
 }
}));

const EventContainer = () => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [date, setDate] = useState("");
  const [numberOfCardsToLoad, setNumberOfCardsToLoad] = useState(10);

  useEffect(() => {
    onLoadCard();
  }, [cards]);

  const onLoadCard = () => {
    axios
      .get("/events")
      .then((response) => setCards(response.data))
      .catch((error) => console.log(error));
  };

  const onDeleteHandler = (cardId) => {
    axios
      .delete(`/events/${cardId}`)
      .then((response) => {
        if (response.statusText === "OK") onLoadCard();
      })
      .catch((error) => console.log(error));
  };

  const onUpdateHandler = (event, cardId) => {
    const body = { destination: event.target.value };
    axios
      .put(`/events/${cardId}`, body)
      .then((response) => {
        if (response.statusText === "OK") return;
      })
      .catch((error) => console.log(error));
  };

  const onDateHandler = (travelDate) => {
    setDate(travelDate);
  };

  const updateNumberOfLoadedCard = () => {
    setNumberOfCardsToLoad((prevState) => {
      return {
        ...prevState,
        numberOfCardsToLoad: prevState.numberOfCardsToLoad + 10,
      };
    });
  };

  return (
    <div className={classes.eventContainer}>
      <div className={classes.view}>
        {!!cards &&
          cards.slice(0, numberOfCardsToLoad).map((card) => {
            return (
              <div key={card.id} className={classes.displayCards}>
                <CardsRender
                  card={card}
                  deleteCard={onDeleteHandler}
                  updateCard={onUpdateHandler}
                  dateHandler={onDateHandler}
                />
              </div>
            );
          })}

        <div className={classes.buttonContainer}>
          <button onClick={updateNumberOfLoadedCard}>Load More</button>
        </div>
      </div>
      <div
        className={classes.view}
        style={{
          padding: "20px 20px",
          background: "#cecece",
        }}
      >
        <Calender destinationDate={date} />
      </div>
    </div>
  );
};

export default withErrorHandler(EventContainer, axios);
