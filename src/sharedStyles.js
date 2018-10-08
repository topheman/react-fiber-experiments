export default {
  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%",
    paddingTop: "30px",
    height: 0,
    overflow: "hidden",
    "& iframe, & object, & embed": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  },
  videoWrapper: {
    width: 450,
    maxWidth: "100%",
    margin: "0 auto"
  },
  videoDescription: {
    textAlign: "center"
  }
};
