"use client";
import { Page, View, Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { trpcVanilla } from "./trpc";

export const Sample: React.FC = () => {
	return (
		<Page size="A4" orientation="landscape">
			<View>
				<Text>parent</Text>
				<Child />
			</View>
		</Page>
	);
};

const Child: React.FC = () => {
	const d = useFetchData("/api/sample");

	return (
		<View>
			<Text>child</Text>
			{d && <Text>Data: {JSON.stringify(d)}</Text>}
		</View>
	);
};

export const useFetchData = (url: string) => {
	const [data, setData] = useState("");

	useEffect(() => {
		trpcVanilla.hello.query().then((res) => {
			setData(res.greeting);
		});
	}, [url]);

	return data;
};
