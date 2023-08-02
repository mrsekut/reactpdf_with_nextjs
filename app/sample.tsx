"use client";
import { Page, View, Text } from "@react-pdf/renderer";

export const Sample: React.FC = () => {
	return (
		<Page size="A4" orientation="landscape">
			<View>
				<Text>Section #1</Text>
			</View>
		</Page>
	);
};
