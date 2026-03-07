import Button from "@/components/button";
import HeaderText from "@/components/header-text";
import { Colors, FontSizes } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, ImageBackground, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const animatedValue = new Animated.Value(0);

  Animated.timing(animatedValue, {
    toValue: 82,
    duration: 2000,
    useNativeDriver: false,
  }).start();

  return (
    <ImageBackground
      source={require("@/assets/images/splash-bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000000']}
        locations={[0, 0.2367]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.titleText,
            {
              transform: [{ translateY: animatedValue }],
            },
          ]}
        >
          <HeaderText text="Одно из самых вкусных кофе в городе!" />
        </Animated.View>
        <Text style={styles.smallText}>
          Свежие зёрна, настоящая арабика и бережная обжарка
        </Text>
        <Button text="Начать" />
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 43,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  smallText: {
    width: 315,
    height: 44,
    fontFamily: "Sora",
    fontSize: FontSizes.f14,
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "center",
    color: Colors.main.textGray,
  },
  titleText: {
    marginBottom: 41,
  },
});
