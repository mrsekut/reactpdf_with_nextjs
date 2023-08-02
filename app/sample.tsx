"use client";
import { Page, View, Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { trpc } from "./trpc";

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
	const { data } = trpc.hello.useQuery();
	console.log({ data: d });

	return (
		<View>
			<Text>child</Text>
			{d && <Text>Data: {JSON.stringify(d)}</Text>}
			{data && <Text>{data.greeting}</Text>}
		</View>
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
