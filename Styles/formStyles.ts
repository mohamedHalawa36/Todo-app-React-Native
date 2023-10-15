import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 25,
    paddingVertical: 40,
    width: "100%",
    backgroundColor: "white",
    gap: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  register: {
    marginTop: "25%",
  },
  input: {
    padding: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
  serverError: {
    color: "red",
    fontSize: 14,
    backgroundColor: "#FFE5E6",
    padding: 3,
    textAlign: "center",
  },
  submitContainer: {
    gap: 5,
    marginTop: 5,
  },
  signInUpBtn: {
    marginLeft: 5,
    color: "blue",
  },
  signInUpContainer: {
    flexDirection: "row",
  },
});
