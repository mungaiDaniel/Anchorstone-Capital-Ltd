import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

/** Thin navy bar above the header: licence note, phone and email. Mobile shows only the phone and email icons. */
export function TopBar() {
  const { phone, email } = siteConfig.contact;
  return (
    <div className="on-dark bg-navy text-xs text-on-navy">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <p className="hidden sm:block">{siteConfig.topBarLicence}</p>
        <div className="flex w-full items-center justify-end gap-5 sm:w-auto">
          <a href={phone.href} className="inline-flex items-center gap-2 hover:text-white" aria-label={`Call ${phone.display}`}>
            <Phone aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{phone.display}</span>
            <span className="sm:hidden">{phone.display}</span>
          </a>
          <a href={email.href} className="inline-flex items-center gap-2 hover:text-white" aria-label={`Email ${email.display}`}>
            <Mail aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">{email.display}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
