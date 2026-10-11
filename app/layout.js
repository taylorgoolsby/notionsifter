import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Next.js + SQLite starter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
