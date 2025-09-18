import { ImageWithFallback } from './figma/ImageWithFallback';

export default function OmOs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a vision to transform the way businesses operate, we've been at the forefront of innovation for over a decade. Our journey began in a small office with big dreams and an unwavering commitment to excellence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to serve clients worldwide, delivering cutting-edge solutions that drive growth and success. Our passion for technology and dedication to our customers remains the cornerstone of everything we do.
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NjIxNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern office workspace"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1690264421892-46e3af5c3455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTc2MTI3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                Our Team
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're a diverse group of passionate professionals who believe in the power of collaboration. Our team brings together expertise from various fields, creating a dynamic environment where innovation thrives.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From creative minds to technical experts, each team member contributes their unique perspective to deliver exceptional results. We foster a culture of continuous learning, mutual respect, and shared success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
