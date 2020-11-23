import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MessageItem = ({ message }) => {
  return (
    <>
      <View style={styles.message}>
        <Text style={{ fontWeight: "bold" }}>user:{message.item.user}</Text>
        <Text>{message.item.message}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
    fontWeight: "bold",
    backgroundColor: "#add8e6",
  },
});

export default MessageItem;
