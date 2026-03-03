import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Одно из самых вкусных кофе в городе!
      </Text>
      <Text style={styles.smallText}>
        Свежие зёрна, настоящая арабика и бережная обжарка
      </Text>
      <View style={styles.button}>
        <Button title="Go to Details" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    backgroundColor: "#000000",
  },
  button: {
    marginBottom: "5%",
    marginTop: 24,
    width: 315,
    height: 62,
    borderRadius: 16,
    backgroundColor: "#C67C4E",
  },
  smallText: {
    width: 315,
    height: 44,
    fontFamily: "Sora",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "center",
    color: "#A9A9A9",
  },
  headerText: {
    width: 315,
    height: 129,
    fontFamily: "Sora",
    fontSize: 34,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 34,
    letterSpacing: 1,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
