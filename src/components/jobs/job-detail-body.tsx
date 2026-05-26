type Props = {
  about: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  tags: string[];
};

export function JobDetailBody(props: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700">
      <Block title="About the role" body={props.about} />
      <List title="Responsibilities" items={props.responsibilities} />
      <List title="What we're looking for" items={props.requirements} />
      <List title="Perks" items={props.perks} />
      <div>
        <h3 className="mb-2 text-base font-semibold text-slate-900">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {props.tags.map((t) => (
            <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
      <p>{body}</p>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
      <ul className="ml-5 list-disc space-y-1">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}
