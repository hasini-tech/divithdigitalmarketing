import Link from "next/link";
import {
  Compass,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#videos" },
  { label: "Contact", href: "#contact" },
] as const;

const BRAND = {
  name: "Divith Digital Marketing",
  short: "DDM",
  description:
    "Divith Digital Marketing creates digital success stories through strategy, content, performance marketing, branding, and visual storytelling.",
  credit: { label: "Techvaseegrah", href: "http://techvaseegrah.com/" },
} as const;

type ContactItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

const CONTACT: ContactItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "divithdigitalmarketing22@gmail.com",
    href: "mailto:divithdigitalmarketing22@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "96264 11111",
    href: "tel:+919626411111",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "58 Balaji Nagar, Vallam, Thanjavur",
  },
];

const SOCIALS: { icon: LucideIcon; href: string; label: string }[] = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/tanjore_roadside_vlog?knvt=MWM0aHZsYmt6OXR1ZA%3D%3D&utm_source=qr",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@roadsidevlog",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/people/Tanjore-Roadside-Vlog/100088610210572/?mibextid=wwXIfr&rdid=aV7JzHoj17h90Okm&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ESH8vrDqu%2F%3Fmibextid%3DwwXIfr",
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                             */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-asphalt-950";

const linkStyle = `rounded-sm transition-colors duration-200 hover:text-ember-500 ${focusRing}`;

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function ColumnHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="font-heading text-sm font-semibold uppercase leading-7 tracking-wider text-cream-50"
    >
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-cream-100/10 bg-asphalt-950 text-cream-100"
    >
      <h2 id="footer-heading" className="sr-only">
        {BRAND.name} footer
      </h2>

      {/* ------------------------------ Main grid ------------------------------ */}
      <div className="container-luxe grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            href="#home"
            aria-label={`${BRAND.short} – back to top of home page`}
            className={`inline-flex h-7 items-center gap-2 rounded-sm font-heading text-xl font-bold leading-none text-cream-50 ${focusRing}`}
          >
            <Compass className="text-ember-500" size={22} aria-hidden="true" />
            <span>
              {BRAND.short}
              <span className="text-ember-500">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/60">
            {BRAND.description}
          </p>
        </div>

        {/* Explore */}
        <nav aria-labelledby="footer-explore" className="lg:col-span-2">
          <ColumnHeading id="footer-explore">Explore</ColumnHeading>
          <ul className="mt-4 space-y-3 text-sm text-cream-100/60">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkStyle}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <section aria-labelledby="footer-contact" className="lg:col-span-4">
          <ColumnHeading id="footer-contact">Contact</ColumnHeading>
          <ul className="mt-4 space-y-3 text-sm text-cream-100/60">
            {CONTACT.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-ember-500"
                />
                <span className="sr-only">{label}:</span>
                {href ? (
                  <a href={href} className={`${linkStyle} break-all`}>
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Social */}
        <section
          aria-labelledby="footer-social"
          className="sm:col-span-2 lg:col-span-2"
        >
          <ColumnHeading id="footer-social">Follow DDM</ColumnHeading>
          <ul className="mt-4 flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors duration-200 hover:border-ember-500 hover:text-ember-500 ${focusRing}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ------------------------------ Bottom bar ----------------------------- */}
      {/* Extra bottom padding on mobile keeps the floating buttons off the text */}
      <div className="border-t border-cream-100/10 pb-24 pt-6 sm:pb-6">
        <div className="container-luxe flex flex-col gap-2 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {BRAND.name}. All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a
              href={BRAND.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND.credit.label} (opens in a new tab)`}
              className={`font-medium text-cream-100/70 ${linkStyle}`}
            >
              {BRAND.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}