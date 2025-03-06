"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="p-8 pb-20 flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-center">
        Got a feature request? Found a bug? We&apos;d love to hear from you!
        </p>
        <a
          href="mailto:teamsokalink@gmail.com"
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Contact Us
        </a>
      </main>
    </div>
  );
}
