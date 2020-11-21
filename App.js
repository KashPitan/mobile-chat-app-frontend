import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import axios from "axios";

const App = () => {
  const [messageInput, setMessageInput] = useState("");
  useEffect(() => {
    fetch("http://192.168.0.62:8080/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Server Error");
        console.log(err);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Omon chat</Text>
        <StatusBar style="auto" />
      </View>
      <TextInput
        style={styles.messageBox}
        placeholder="enter a message..."
        onChange={(text) => setMessageInput(text)}
        value={messageInput}
      ></TextInput>
      <Button title="Send"></Button>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  messageBox: {
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
  },
});
