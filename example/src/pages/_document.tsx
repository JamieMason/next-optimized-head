import { Html, Main, NextScript } from 'next/document';
import { Head } from 'next-optimized-head';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
