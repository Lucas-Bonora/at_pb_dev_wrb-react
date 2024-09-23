import "./globals.css";


export const metadata = {
  title: "Siscomp",
  description: "Projeto final da disciplina PB desenvolvimento Web com React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
