import React, { useState } from 'react';

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Tak for din henvendelse! Vi vender tilbage hurtigst muligt.');
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <a href="index.html" className="text-2xl font-bold text-gray-900">Logo</a>
            </div>
            <nav className="flex space-x-8">
              <a href="om-os.html" className="text-gray-700 hover:text-blue-500">Om os</a>
              <a href="kontakt.html" className="text-blue-500">Kontakt</a>
              <a href="#" className="text-gray-700 hover:text-blue-500">Login</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Kontakt Os</h1>
          <p className="text-xl md:text-2xl">Vi er her for at hjælpe dig</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Kontakt Informationen
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vi vil gerne høre fra dig. Send os en besked, og vi vender hurtigst muligt tilbage.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Besøg Os</h3>
                  <p className="text-gray-600">
                    123 Forretningsgade<br />
                    8000 Aarhus C<br />
                    Danmark
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2"> Kontaktinformation</h3>
                  <p className="text-gray-600">
                    Email: hello@company.dk<br />
                    Telefon: +45 12 34 56 78
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Åbningstider</h3>
                  <p className="text-gray-600">
                    Mandag - Fredag: 9:00 - 17:00<br />
                    Lørdag - Søndag: Lukket
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Send os en besked</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dit navn"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Din email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Din besked"
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors font-medium"
                  >
                    Send Besked
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3f6e86d7a7a3%3A0x7c0b7b9b6a8a3a7a!2sAarhus%2C%20Denmark!5e0!3m2!1sen!2sdk!4v1642090000000!5m2!1sen!2sdk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aarhus, Denmark Location"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Vores Lokation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vi er beliggende i hjertet af Aarhus, Danmarks næststørste by og et pulserende centrum for innovation og kultur. Vores kontor er nemt tilgængeligt med offentlig transport og har praktisk parkering for besøgende.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Uanset om du planlægger et besøg eller bare vil vide, hvor vi er baseret, finder du os i denne smukke danske by, der er kendt for sin rige historie, moderne arkitektur og blomstrende forretnings-community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <p>&copy; 2025 Firmankavn. Alle rettigheder forbeholdes.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">Privatlivspolitik</a>
              <a href="#" className="text-gray-300 hover:text-white">Betingelser for brug</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Kontakt;
