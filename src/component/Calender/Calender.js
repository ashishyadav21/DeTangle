import React from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
import "./Calender.css";

class Calender extends React.Component {
  render() {
    const startDate = new Date(this.props.destinationDate);
    const lastWeek = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 7
    );
    return (
      <div style={{ position: "sticky", top: "0" }}>
        {!!this.props.destinationDate ? (
          <InfiniteCalendar
            width={400}
            height={600}
            selected={startDate}
            disabledDays={[0, 6]}
            minDate={lastWeek}
            autoFocus={true}
            className="CalenderView"
          />
        ) : (
          <h1 style={{ textAlign: "center" }}>
            Calender View will Availale here once you click on Card
          </h1>
        )}
      </div>
    );
  }
}

export default Calender;
