export default function ErrorState({ title, message, href }: { title: string; message: string; href?: string }) {
  return (
    <div role="alert" className="max-w-md rounded-md border border-line p-5">
      <h1 className="text-base font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-muted">{message}</p>
      {href && <a href={href} className="mt-3 inline-block text-sm text-accent underline underline-offset-4">Try again</a>}
    </div>
  );
}
