import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    background: (props) => !!props.color && props.color,
    padding: "25px 8px",
    marginBottom: "10px",
    border: "bisque",
    borderRadius: "10px",
  },
  inputContainer: {
    margin: "20px",
    padding: "10px",
  },
  comment: {
    textAlign: "center" 
  }
}));

const CardsRender = (props) => {
  const classes = useStyles({ ...props, color: props.card.color });
  const { start, id, destination, comment } = props.card;

  return (
    <Box className={classes.card} onClick={() => props.dateHandler(start)}>
      <ClearIcon onClick={() => props.deleteCard(id)} />
      {!!props.card && <h3 className={classes.comment}>{comment}</h3>}

      {!!props.card && (
        <input
          type="text"
          value={destination}
          className={classes.inputContainer}
          onChange={(event) => props.updateCard(event, id)}
        />
      )}
      {!!props.card && (
        <input
          type="text"
          className={classes.inputContainer}
          value={comment}
          onChange={(event) => props.updateCard(event, id)}
        />
      )}
    </Box>
  );
};

export default CardsRender;
