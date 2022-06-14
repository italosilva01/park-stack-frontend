import React, { useState } from "react";
import { View, TextInput, Switch, StyleSheet } from "react-native";

export default function RegisterAttraction() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={style.container}>
      <TextInput placeholder="Nome da atração" />
      <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        accessibilityLabel="Status"
      />
      <TextInput placeholder="descrição" />
      <TextInput placeholder="duração" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
