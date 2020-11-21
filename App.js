import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import io from "socket.io-client";

const App = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  var socket = io("http://192.168.0.62:8080", {
    transports: ["websocket"],
    jsonp: false,
  });

  componentDidMount = () => {};
  useEffect(() => {
    // fetch("http://192.168.0.62:8080/")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("Server Error");
    //     console.log(err);
    //   });

    socket.connect();
    socket.on("connect", () => {
      console.log("connected to socket server");
    });
    socket.on("chat", (data) => {
      console.log(data);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat", messageInput);
    setMessageInput("");
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Omon chat</Text>
        <StatusBar style="auto" />
      </View>
      <TextInput
        style={styles.messageBox}
        placeholder="enter a message..."
        onChangeText={(text) => setMessageInput(text)}
        value={messageInput}
      ></TextInput>
      <Button title="Send" onPress={() => sendMessage()}></Button>
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
