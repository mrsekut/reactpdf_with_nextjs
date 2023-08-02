"use client";
import { Page, View, Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";

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
	const data = useFetchData("https://jsonplaceholder.typicode.com/posts/1");

	return (
		<View>
			<Text>child</Text>
			{data && <Text>Data: {JSON.stringify(data)}</Text>}
		</View>
	);
};

const useFetchData = (url: string) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				setTimeout(() => setData(json), 3000);
			});
	}, [url]);

	return data;
};
