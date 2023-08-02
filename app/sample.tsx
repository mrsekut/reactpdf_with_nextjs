"use client";
import { Page, View, Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";

export const Sample: React.FC = () => {
	const data = useFetchData("https://jsonplaceholder.typicode.com/posts/1");

	return (
		<Page size="A4" orientation="landscape">
			<View>
				<Text>Section #1</Text>
				{data && <Text>Data: {JSON.stringify(data)}</Text>}
			</View>
		</Page>
	);
};

export const useFetchData = (url: string) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setData(json));
	}, [url]);

	return data;
};
