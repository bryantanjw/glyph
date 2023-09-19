import Link from "next/link";
import { Row } from "@/components/ui/row";
import { H4, Span } from "@/components/ui/typography";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export default async function Footer() {
  return (
    <footer className="flex items-center justify-between w-full md:px-12 p-4 border-t border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Row className="w-auto flex-col gap-1">
          <Link href={"/"}>
            <H4>Glyph</H4>
          </Link>
          <Row className="w-auto items-center gap-4">
            <Span className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold">Vercel</span>,{" "}
              <span className="font-semibold">Supabase</span>, and{" "}
              <span className="font-semibold">Stripe</span>
            </Span>
          </Row>
        </Row>
        <Row className="justify-end items-center w-auto gap-6 text-slate-600">
          <Link href={"https://github.com/bryantanjw"} target="_blank">
            <GitHubLogoIcon className="h-6 w-6 hover:text-slate-800" />
          </Link>
          <Link href={"https://twitter.com/bryantanjw"} target="_blank">
            <TwitterLogoIcon className="h-6 w-6 hover:text-slate-800" />
          </Link>
        </Row>
      </div>
    </footer>
  );
}
