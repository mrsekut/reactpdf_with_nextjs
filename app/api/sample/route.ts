import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
		next: { revalidate: 60 },
	});
	const data = await res.json();

	return NextResponse.json({
		hoge: "hoge",
		...data,
	});
}
