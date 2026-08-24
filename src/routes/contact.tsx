import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/neu";
import { Page } from "@/components/page";
import { contactMeta, profile } from "@/data/portfolio";
import { useStagger } from "@/hooks/use-motion-prefs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gaurav Khetwal" },
      {
        name: "description",
        content:
          "Send a message to full-stack developer Gaurav Khetwal about a project, a problem or a collaboration.",
      },
      { property: "og:title", content: "Contact — Gaurav Khetwal" },
      {
        property: "og:description",
        content: "Tell me what you are building and where it is stuck.",
      },
    ],
  }),
  component: ContactScreen,
});

function ContactScreen() {
  const { container, item } = useStagger();

  return (
    <Page>
      <SectionHeading eyebrow="Contact" title={contactMeta.heading} lead={contactMeta.body} />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="rounded-3xl bg-background p-6 neu sm:p-8"
        >
          <ContactForm />
        </motion.div>

        <motion.aside variants={container} initial="hidden" animate="show" className="space-y-4">
          {contactMeta.details.map((detail) => (
            <motion.div
              key={detail.label}
              variants={item}
              className="rounded-2xl bg-background p-5 neu-sm"
            >
              <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                {detail.label}
              </p>
              {detail.href ? (
                <a
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mt-1.5 block rounded text-sm font-medium text-primary underline-offset-4 hover:underline neu-focus"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="mt-1.5 text-sm font-medium">{detail.value}</p>
              )}
            </motion.div>
          ))}

          <motion.div variants={item} className="rounded-2xl bg-background p-5 neu-inset">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-1 py-1 text-sm transition-colors hover:text-primary neu-focus"
                  >
                    <span>{social.label}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.aside>
      </div>
    </Page>
  );
}
