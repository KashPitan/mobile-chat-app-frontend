import React from "react";
import { FlatList } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import MessageItem from "./MessageItem";

const MessageList = ({ messages }) => {
  return (
    <FlatList
      keyExtractor={() => uuidv4()}
      data={messages}
      renderItem={(item) => <MessageItem message={item}></MessageItem>}
    />
  );
};

export default MessageList;
