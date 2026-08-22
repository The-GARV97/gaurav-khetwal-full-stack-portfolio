import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";

import { NeuButton } from "@/components/neu";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { sendContactMessage } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

type FieldName = keyof ContactValues;
type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const emptyValues: ContactValues = { name: "", email: "", subject: "", message: "" };

const fields: { name: FieldName; label: string; type: "text" | "email" | "textarea"; placeholder: string }[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Ada Lovelace" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { name: "subject", label: "Subject", type: "text", placeholder: "A short summary" },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "What are you building, and where is it stuck?",
  },
];

export function ContactForm() {
  const reduced = useReducedMotion();
  const baseId = useId();
  const send = useServerFn(sendContactMessage);

  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status === "success" || status === "duplicate" || status === "error") setStatus("idle");
  };

  const validateField = (name: FieldName) => {
    const result = contactSchema.shape[name].safeParse(values[name]);
    setErrors((e) => ({ ...e, [name]: result.success ? undefined : result.error.issues[0]?.message }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    if (honeypot.trim().length > 0) {
      // Silently accept bot submissions without touching the database.
      setStatus("success");
      setFeedback("Message received. I'll get back to you.");
      return;
    }

    setStatus("loading");
    setFeedback("");
    try {
      const result = await send({ data: parsed.data });
      setStatus(result.status);
      setFeedback(result.message);
      if (result.status === "success") setValues(emptyValues);
    } catch {
      setStatus("error");
      setFeedback("The message could not be sent. Please try again shortly.");
    }
  };

  const busy = status === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${baseId}-${field.name}`;
          const error = errors[field.name];
          const isTextarea = field.type === "textarea";
          return (
            <div key={field.name} className={cn("space-y-2", isTextarea && "sm:col-span-2")}>
              <label
                htmlFor={id}
                className="block font-mono text-[11px] tracking-widest text-muted-foreground uppercase"
              >
                {field.label}
              </label>
              {isTextarea ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={6}
                  value={values[field.name]}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.name, e.target.value)}
                  onBlur={() => validateField(field.name)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                  disabled={busy}
                  className="w-full resize-y rounded-2xl bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/70 neu-inset neu-focus disabled:opacity-60"
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  placeholder={field.placeholder}
                  onChange={(e) => setField(field.name, e.target.value)}
                  onBlur={() => validateField(field.name)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                  disabled={busy}
                  className="h-12 w-full rounded-2xl bg-background px-4 text-sm placeholder:text-muted-foreground/70 neu-inset neu-focus disabled:opacity-60"
                />
              )}
              <AnimatePresence initial={false}>
                {error ? (
                  <motion.p
                    id={`${id}-error`}
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1.5 text-xs text-destructive"
                  >
                    <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* honeypot — hidden from users, visible to naive bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${baseId}-company`}>Company</label>
        <input
          id={`${baseId}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <NeuButton type="submit" variant="primary" size="lg" disabled={busy}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status === "loading" ? "loading" : status === "success" ? "sent" : "idle"}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="flex items-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Sending
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  Sent
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </NeuButton>

        <p className="font-mono text-[11px] text-muted-foreground">
          Validated on both ends. Duplicates and floods are blocked.
        </p>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence initial={false}>
          {feedback ? (
            <motion.p
              key={feedback}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={cn(
                "flex items-center gap-2 rounded-2xl bg-background px-4 py-3 text-sm neu-sm",
                status === "success" && "text-success",
                status === "duplicate" && "text-accent",
                status === "error" && "text-destructive",
              )}
            >
              {status === "success" ? (
                <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              )}
              {feedback}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
