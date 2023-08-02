"use client";
import { PDFViewer, Document } from "@react-pdf/renderer";
import { Sample } from "./sample";
import { trpc } from "./trpc";

export default function Home() {
	const { data } = trpc.hello.useQuery();
	return (
		<main className="min-h-screen bg-red-100 p-10">
			{data && <h1>{data.greeting}</h1>}
			<PDFViewer className="min-h-[90vh] w-full">
				<Document>
					<Sample />
				</Document>
			</PDFViewer>
		</main>
	);
}
