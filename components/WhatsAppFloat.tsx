import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        `Hello ${site.name}, I would like to know more about your products.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 ring-4 ring-[#25D366]/20 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
