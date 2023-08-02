"use client";
import { PDFViewer, Document } from "@react-pdf/renderer";
import { Sample } from "./sample";

export default function Home() {
	return (
		<main className="min-h-screen bg-red-100 p-10">
			<PDFViewer className="min-h-[90vh] w-full">
				<Document>
					<Sample />
				</Document>
			</PDFViewer>
		</main>
	);
}
