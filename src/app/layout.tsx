import "./globals.css";

export const metadata = {
  title: "Woodcraft Sounds",
  description: "Projects and releases by Micah Arvey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
