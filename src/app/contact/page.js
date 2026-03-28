import ContactForm from "@/components/portfolio/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-neutral-400">Have a project in mind or just want to say hi?</p>
        </header>
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
