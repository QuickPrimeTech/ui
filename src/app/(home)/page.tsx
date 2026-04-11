import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Grid background - uses foreground with low opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 -z-3"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in oklab, var(--muted-foreground) 30%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--muted-foreground) 30%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* Primary glow - uses your green-teal primary */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--primary) 30%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <span className="mb-9 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-3.5 py-1.5 font-mono text-xs tracking-wider text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_oklch(var(--primary))]" />
        v2.0 · now available
      </span>

      {/* Headline */}
      <h1 className="mb-6 text-center text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
        Build faster with{" "}
        <em className="font-serif text-lg font-normal not-italic text-primary sm:not-italic">
          PrimeUI
        </em>
      </h1>

      {/* Subheading */}
      <p className="mb-12 max-w-[480px] text-center text-[1.05rem] font-light leading-relaxed text-muted-foreground">
        Everything you need to integrate, extend, and ship — clean APIs,
        complete references, and real-world guides.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-md">
        <Button asChild size={"xl"} className="sm:flex-1">
          <Link href="/docs">
            <DocIcon />
            Check Docs
          </Link>
        </Button>
        <Button
          variant={"outline"}
          size={"xl"}
          className="max-sm:flex-1"
          asChild
        >
          <Link href="#sandbox">
            <SandboxIcon />
            Open in Sandbox
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M2 4.5h11M2 7.5h11M2 10.5h7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SandboxIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect
        x="2"
        y="2"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5 7.5h5M7.5 5v5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
