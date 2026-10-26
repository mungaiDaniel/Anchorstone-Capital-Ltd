import { whyUs } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function WhyChooseUs({ tone = "paper" }: { tone?: "paper" | "tint" }) {
  return (
    <section aria-labelledby="why-title" className={`py-20 sm:py-28 ${tone === "tint" ? "bg-tint" : "bg-paper"}`}>
      <Container>
        <SectionHeading id="why-title" eyebrow="Why Anchorstone" title="Why choose us" align="center" />
        <StaggerGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => (
            <StaggerItem as="li" key={item.title}>
              <Card className="h-full">
                <IconBadge name={item.icon} />
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mt-2 text-body">{item.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
