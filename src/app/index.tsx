import Button from "@/components/button";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/splash-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Одно из самых вкусных кофе в городе!
        </Text>
        <Text style={styles.smallText}>
          Свежие зёрна, настоящая арабика и бережная обжарка
        </Text>
        <Button text="Начать" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
