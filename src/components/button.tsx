import { Colors, Fonts, FontSizes, Radius } from "@/constants/theme";
import { Pressable, PressableProps, View, Text, StyleSheet } from "react-native";

export default function Button({ text, ...props }: PressableProps & { text: string }) {
    return (
		<Pressable {...props}>
			<View style={styles.button}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 315,
        paddingVertical: 21,
		backgroundColor: Colors.main.button,
		borderRadius: Radius.r16,
	},
	text: {
		color: Colors.main.textWhite,
		fontSize: FontSizes.f16,
	}
})