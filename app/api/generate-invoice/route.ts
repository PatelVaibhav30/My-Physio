import React from "react";
import { renderToStream, Document } from "@react-pdf/renderer";
import InvoicePdf from "@/utils/InvoicePdf";

export async function POST(req: Request) {
  const data = await req.json();

  const stream = await renderToStream(React.createElement(Document, {}, React.createElement(InvoicePdf, { data })));

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    },
  });
}