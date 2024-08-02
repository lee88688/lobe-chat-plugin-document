import pdf2md from "@/lib/pdf2md";

self.addEventListener("message", async (event) => {
  console.log(event);
  const pdf = event.data;
  const text = await pdf2md(pdf);
  self.postMessage(text);
});