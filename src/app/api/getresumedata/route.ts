import pdfParse from "pdf-parse";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return Response.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(
            await file.arrayBuffer()
        );

        const data = await pdfParse(buffer);

        return Response.json({
            text: data.text,
        });
    } catch (error) {
        return Response.json(
            {
                message: "Failed to extract PDF text",
                error: String(error),
            },
            { status: 500 }
        );
    }
}