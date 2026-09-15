import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  Leaf,
  Factory,
  Droplets,
  Recycle,
  Truck,
  PackageSearch,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Users,
  Building2,
  Quote,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Factory,
    title: 'Pressmud Export',
    desc: 'High-grade pressmud sourced from sugar mills, ideal for composting, bio-fertilizer production, and soil enrichment applications.',
    points: ['Rich organic content', 'Consistent moisture levels', 'Bulk export ready'],
  },
  {
    icon: Droplets,
    title: 'Molasses Supply',
    desc: 'Premium cane molasses for distilleries, animal feed, and industrial fermentation — supplied in flexible quantities to meet demand.',
    points: ['Distillery-grade quality', 'Custom tank logistics', 'Global shipping'],
  },
  {
    icon: Recycle,
    title: 'Ethanol Waste Yeast Sludge',
    desc: 'Nutrient-dense yeast sludge from ethanol production, widely used as protein-rich animal feed and organic fertilizer.',
    points: ['High protein content', 'Sustainable by-product', 'Cost-effective supply'],
  },
  {
    icon: Leaf,
    title: 'Biomass Substrate',
    desc: 'Reliable biomass substrate supply for biogas plants, pellet manufacturing, and renewable energy applications.',
    points: ['Calorific consistency', 'Season-round availability', 'Industrial volumes'],
  },
  {
    icon: PackageSearch,
    title: 'General Order Supply',
    desc: 'A dependable procurement partner for industrial goods, equipment, and consumables — tailored to client specifications.',
    points: ['Sourcing & logistics', 'Quality-assured deliverables', 'On-time fulfilment'],
  },
  {
    icon: Truck,
    title: 'Logistics & Freight',
    desc: 'End-to-end export logistics covering documentation, customs clearance, and multimodal freight to global destinations.',
    points: ['Door-to-port delivery', 'Export documentation', 'Real-time tracking'],
  },
];

const STATS = [
  { icon: Globe2, value: '15+', label: 'Countries Served' },
  { icon: TrendingUp, value: '50K+', label: 'Tonnes Delivered' },
  { icon: Users, value: '40+', label: 'Industry Partners' },
  { icon: ShieldCheck, value: '100%', label: 'Quality Assurance' },
];

const PROCESS = [
  { step: '01', title: 'Sourcing', desc: 'We partner with certified sugar mills and ethanol plants to procure high-quality by-products directly from origin.' },
  { step: '02', title: 'Quality Control', desc: 'Every batch is tested for moisture, purity, and nutrient profile to meet international export standards.' },
  { step: '03', title: 'Processing & Packaging', desc: 'Material is processed, dried, and packaged in weather-grade containers suitable for long-haul shipping.' },
  { step: '04', title: 'Export & Delivery', desc: 'We handle documentation, customs, and freight — delivering to your destination port with full transparency.' },
];

const TESTIMONIALS = [
  {
    quote: 'AWD Global has been a reliable molasses supplier for our distillery for over two years. Their consistency in quality and timely delivery is unmatched.',
    name: 'Rajesh Kumar',
    role: 'Procurement Head, GreenFuel Distilleries',
  },
  {
    quote: 'Their pressmud quality exceeded our expectations. We use it for large-scale composting and the results have been excellent across every batch.',
    name: 'Sandra Mueller',
    role: 'Operations Director, AgroCycle GmbH',
  },
  {
    quote: 'Professional, transparent, and dependable. AWD handled everything from sourcing to shipping documentation without a single hiccup.',
    name: 'Ahmed Al-Farsi',
    role: 'Supply Chain Manager, BioEnergy MENA',
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const PRODUCTS = [
  {
    name: 'Pressmud',
    image: 'https://images.pexels.com/photos/31190668/pexels-photo-31190668.jpeg?auto=compress&cs=tinysrgb&w=1000',
    desc: 'Nutrient-rich organic by-product of sugar cane juice clarification, ideal for composting and bio-fertilizer production.',
    specs: [
      { label: 'Moisture', value: '50–60%' },
      { label: 'Organic Carbon', value: '25–30%' },
      { label: 'NPK', value: '1.5–2.5%' },
      { label: 'Packaging', value: 'Loose / Jumbo bags' },
    ],
    uses: ['Composting', 'Bio-fertilizer', 'Soil amendment'],
  },
  {
    name: 'Cane Molasses',
    image: 'https://images.pexels.com/photos/37014729/pexels-photo-37014729.jpeg?auto=compress&cs=tinysrgb&w=1000',
    desc: 'Thick, dark syrup by-product of sugar refining — used in distillation, animal feed, and industrial fermentation.',
    specs: [
      { label: 'Brix', value: '80–85°' },
      { label: 'Total Sugars', value: '48–52%' },
      { label: 'Density', value: '1.4–1.5 kg/L' },
      { label: 'Packaging', value: 'Tank / Drum / IBC' },
    ],
    uses: ['Distilleries', 'Animal feed', 'Fermentation'],
  },
  {
    name: 'Ethanol Waste Yeast Sludge',
    image: 'https://images.pexels.com/photos/36029500/pexels-photo-36029500.jpeg?auto=compress&cs=tinysrgb&w=1000',
    desc: 'Protein-rich sludge from ethanol fermentation, widely used as animal feed supplement and organic fertilizer.',
    specs: [
      { label: 'Crude Protein', value: '35–45%' },
      { label: 'Moisture', value: '15–25%' },
      { label: 'Ash Content', value: '8–12%' },
      { label: 'Packaging', value: 'Loose / Bagged' },
    ],
    uses: ['Animal feed', 'Organic fertilizer', 'Protein supplement'],
  },
  {
    name: 'Biomass Substrate',
    image: 'https://images.pexels.com/photos/15869686/pexels-photo-15869686.jpeg?auto=compress&cs=tinysrgb&w=1000',
    desc: 'Processed biomass substrate for biogas plants, pellet manufacturing, and renewable energy applications.',
    specs: [
      { label: 'Calorific Value', value: '3,000–4,000 kcal/kg' },
      { label: 'Moisture', value: '10–15%' },
      { label: 'Ash', value: '5–8%' },
      { label: 'Packaging', value: 'Bales / Pellet bags' },
    ],
    uses: ['Biogas plants', 'Pellet manufacturing', 'Renewable energy'],
  },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0e1a]/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30">
            <Globe2 className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-semibold tracking-[0.18em] text-white">
            AWD<span className="text-emerald-400"> GLOBAL</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-xl hover:shadow-emerald-500/30 md:block"
        >
          Get a Quote
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-white/80 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#0a0e1a]/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-emerald-600/20 blur-[120px] animate-float-slow" />
        <div className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-teal-500/15 blur-[130px] animate-float-slower" />
        <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[120px] animate-float-slow" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300 backdrop-blur"
            style={{ animationDelay: '0ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Global Export &amp; Industrial Supply
          </div>

          <h1
            className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
            style={{ animationDelay: '100ms' }}
          >
            Powering global trade in
            <br />
            <span className="shimmer-text bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-300 bg-clip-text">
              bio-based industrial products
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 mx-auto max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            style={{ animationDelay: '200ms' }}
          >
            AWD Global exports pressmud, molasses, ethanol waste yeast sludge, and
            biomass substrate — and serves as a trusted general order supplier for
            industries worldwide.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#services"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl hover:shadow-emerald-500/40"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Request a Quote
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div
          className="animate-fade-up mt-16 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          style={{ animationDelay: '400ms' }}
        >
          <img
            src="https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Cargo port at sunrise — global export logistics"
            className="h-[280px] w-full object-cover sm:h-[460px]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="reveal flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wider text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="reveal relative">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.pexels.com/photos/36825977/pexels-photo-36825977.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Industrial pipelines at a processing facility"
                className="h-[320px] w-full object-cover sm:h-[440px]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-white/10 bg-[#0a0e1a]/90 px-6 py-5 backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-emerald-400" />
                <div>
                  <div className="text-2xl font-bold text-white">Est.</div>
                  <div className="text-sm text-white/50">Trusted Export Partner</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              About AWD Global
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              A trusted partner in industrial export &amp; supply
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              AWD Global specializes in the export of sugar industry by-products and
              renewable biomass substrates. We bridge the gap between mills, distilleries,
              and global industries that rely on organic and bio-based raw materials.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Beyond our core export portfolio, we operate as a general order supplier —
              procuring and delivering industrial goods, equipment, and consumables with
              a commitment to quality, transparency, and on-time delivery.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Direct sourcing from certified mills',
                'Stringent quality control protocols',
                'Full export documentation support',
                'Reliable global logistics network',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const [active, setActive] = useState(0);
  const selected = PRODUCTS[active];

  return (
    <section id="products" className="relative border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Our Products
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Quality-assured industrial exports
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Explore our core product portfolio with technical specifications,
            applications, and packaging options.
          </p>
        </div>

        {/* Product selector tabs */}
        <div className="reveal mb-10 flex flex-wrap justify-center gap-3">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                i === active
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30'
                  : 'border border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Product detail card */}
        <div className="reveal grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={selected.image}
              alt={selected.name}
              className="h-[300px] w-full object-cover sm:h-[440px]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{selected.name}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/60">{selected.desc}</p>

            {/* Specs grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {selected.specs.map((spec) => (
                <div key={spec.label} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                    {spec.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Applications */}
            <div className="mt-6">
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">
                Common Applications
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.uses.map((use) => (
                  <span
                    key={use}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl hover:shadow-emerald-500/40"
            >
              Request Quote for {selected.name}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Comprehensive export &amp; supply solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            From sugar mill by-products to biomass substrates and general industrial
            procurement — we deliver quality-assured products to clients worldwide.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1a] p-7 transition hover:border-emerald-500/30 hover:bg-white/[0.03]"
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl transition group-hover:bg-emerald-500/10" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{service.desc}</p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="reveal mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            How We Work
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            A streamlined export supply chain
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            From origin to destination port, we manage every step to ensure product
            integrity and delivery reliability.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <div
              key={p.step}
              className="reveal relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 text-5xl font-bold text-emerald-500/20">{p.step}</div>
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
              {i < PROCESS.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-emerald-500/30 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <div className="reveal mb-12 text-center">
          <Quote className="mx-auto mb-4 h-10 w-10 text-emerald-400/40" />
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Trusted by partners worldwide
          </h2>
        </div>

        <div className="reveal relative min-h-[200px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-500 ${
                i === active ? 'opacity-100' : 'pointer-events-none opacity-0 translate-y-4'
              }`}
            >
              <blockquote className="text-center">
                <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-emerald-400">{t.role}</div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-emerald-400' : 'w-2 bg-white/20'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!valid) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      message: form.message.trim(),
    });
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — info */}
          <div className="reveal">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Get in Touch
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Let's discuss your supply needs
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Whether you need a reliable pressmud exporter, molasses supplier, or a
              general order procurement partner — our team is ready to help. Reach out
              for quotes, product specifications, or partnership inquiries.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/40">Email</div>
                  <a href="mailto:info@awdglobal.com" className="text-white transition hover:text-emerald-400">
                    info@awdglobal.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/40">Phone</div>
                  <a href="tel:+920000000000" className="text-white transition hover:text-emerald-400">
                    +92 300 0000000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/40">Headquarters</div>
                  <span className="text-white">Pakistan &middot; Serving Global Markets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#0a0e1a] p-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Company (optional)</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/60">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-emerald-400/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl hover:shadow-emerald-500/40 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Thank you. Our team will get back to you shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="text-center text-sm text-rose-400">{errorMsg}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="reveal relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[100px]" />
          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ready to source with confidence?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
              Partner with AWD Global for reliable, quality-assured industrial exports
              and procurement solutions tailored to your business.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl hover:shadow-emerald-500/40"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#06080f] py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30">
                <Globe2 className="h-5 w-5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-lg font-semibold tracking-[0.18em] text-white">
                AWD<span className="text-emerald-400"> GLOBAL</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Exporting pressmud, molasses, ethanol waste yeast sludge, and biomass
              substrate. General order supplier for industries worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Services</h4>
            <ul className="mt-4 space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-white/40 transition hover:text-emerald-400">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" className="text-sm text-white/40 transition hover:text-emerald-400">About Us</a></li>
              <li><a href="#process" className="text-sm text-white/40 transition hover:text-emerald-400">Our Process</a></li>
              <li><a href="#contact" className="text-sm text-white/40 transition hover:text-emerald-400">Contact</a></li>
              <li><a href="mailto:info@awdglobal.com" className="text-sm text-white/40 transition hover:text-emerald-400">Get a Quote</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/30 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} AWD Global. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="transition hover:text-white/60">Privacy Policy</a>
            <a href="#" className="transition hover:text-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */

function App() {
  useReveal();
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-hidden bg-[#06080f] text-white">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Products />
        <Services />
        <Process />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
