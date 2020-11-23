import React, { useState, useEffect } from "react";
import { Appbar } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import { io } from "socket.io-client";
import MessageList from "./Components/MessageList";

const socket = io(
  /*"http://192.168.0.62:8080"*/ "http://chatserver-env.eba-htiphrhi.eu-west-2.elasticbeanstalk.com/",
  {
    transports: ["websocket"],
    jsonp: false,
  }
);

const App = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connected to socket server");
    });

    socket.on("messages", (data) => {
      setMessages((prevState) => data);
    });

    socket.on("chat", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("chat", { user: username, message: messageInput });
    setMessageInput("");
    Keyboard.dismiss();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={"chatting as: " + (isNameSet ? username : "")} />
      </Appbar.Header>
      <View style={styles.container}>
        <MessageList messages={messages}></MessageList>
      </View>
      <TextInput
        style={styles.messageBox}
        placeholder="enter a message..."
        onChangeText={(text) => setMessageInput(text)}
        value={messageInput}
      ></TextInput>
      <Button title="Send" onPress={() => sendMessage()}></Button>
      {!isNameSet && (
        <>
          <TextInput
            style={styles.messageBox}
            placeholder="enter a username..."
            value={username}
            onChangeText={(name) => setUsername(name)}
          ></TextInput>
          <Button title="Send" onPress={() => setIsNameSet(true)}></Button>
        </>
      )}
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
