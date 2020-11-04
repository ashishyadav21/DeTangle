import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import CardsRender from "../Cards/CardsRender";
import axios from "../../axios-detangle";
import "./EventsContainer.css";
import Calender from "../Calender/Calender";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class EventContainer extends Component {
  constructor() {
    super();
    this.state = {
      crads: [],
      date: "",
      numberOfCardsToLoad: 10,
    };
  }

  componentDidMount() {
    this.onLoadCard();
  }

  onLoadCard = () => {
    axios
      .get("/events")
      .then((response) => this.setState({ cards: response.data }))
      .catch((error) => console.log(error));
  };

  onDeleteHandler = (cardId) => {
    axios
      .delete(`/events/${cardId}`)
      .then((response) => {
        if (response.statusText === "OK") this.onLoadCard();
      })
      .catch((error) => console.log(error));
  };

  onUpdateHandler = (event, cardId) => {
    const body = { destination: event.target.value };
    axios
      .put(`/events/${cardId}`, body)
      .then((response) => {
        if (response.statusText === "OK") this.onLoadCard();
      })
      .catch((error) => console.log(error));
  };

  onDateHandler = (travelDate) => {
    this.setState({ date: travelDate });
  };

  updateNumberOfLoadedCard = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        numberOfCardsToLoad: prevState.numberOfCardsToLoad + 10,
      };
    });
  };

  render() {
    return (
      <div style={{ display: "flex", flex: 1, width: "100%" }}>
        <div
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {!!this.state.cards &&
            this.state.cards
              .slice(0, this.state.numberOfCardsToLoad)
              .map((card) => {
                return (
                  <div key={card.id} className="DisplayCards">
                    <CardsRender
                      card={card}
                      deleteCard={this.onDeleteHandler}
                      updateCard={this.onUpdateHandler}
                      dateHandler={this.onDateHandler}
                    />
                  </div>
                );
              })}

          <div style={{ padding: "30px 30px", textAlign: "center" }}>
            <button onClick={this.updateNumberOfLoadedCard}>Load More</button>
          </div>
        </div>
        <div
          style={{
            padding: "20px 20px",
            width: "80%",
            alignItems: "center",
            justifyContent: "space-around",
            background: "#cecece",
          }}
        >
          <Calender destinationDate={this.state.date} />
        </div>
      </div>
    );
  }
}

export default withErrorHandler(EventContainer, axios);
