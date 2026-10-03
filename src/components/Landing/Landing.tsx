import { cx } from "@/lib/cx";
import type { Content } from "@/content/types";
import { ContactForm } from "../ContactForm/ContactForm";
import { Hero } from "../Hero/Hero";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { Severity } from "../Severity/Severity";
import { Terminal } from "../Terminal/Terminal";
import { Shell } from "../Page/Shell";
import styles from "./Landing.module.css";

const idx = (i: number) => String(i).padStart(2, "0");

export function Landing({ content: c }: { content: Content }) {
  const { hero, services, method, contact } = c;
  return (
    <Shell content={c}>
      <Hero
        eyebrow={hero.eyebrow}
        title={
          <>
            {hero.title[0]}
            <em>{hero.title[1]}</em>
          </>
        }
        lede={hero.lede}
        primary={hero.primary}
        secondary={hero.secondary}
        note={hero.note}
        aside={
          <Terminal
            title={hero.terminal.title}
            status={hero.terminal.status}
            label={hero.terminal.label}
            lines={hero.terminal.lines}
            lang={c.lang}
          />
        }
      />

      <section id={services.id} className={styles.section} aria-labelledby={`${services.id}-title`}>
        <div className={styles.container}>
          <SectionHeader id={`${services.id}-title`} index="00" eyebrow={services.eyebrow} title={services.title} lede={services.lede} />
          <div className={styles.cards}>
            {services.cards.map((card, i) => (
              <ServiceCard key={card.title} index={idx(i)} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section id={method.id} className={styles.section} aria-labelledby={`${method.id}-title`}>
        <div className={styles.container}>
          <SectionHeader id={`${method.id}-title`} index="01" eyebrow={method.eyebrow} title={method.title} lede={method.lede} />
          <div className={styles.method}>
            <ol className={styles.steps}>
              {method.steps.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={cx(styles.stepIndex, "label")}>{idx(i)}</span>
                  <div>
                    <h3 className={cx(styles.stepTitle, "title")}>{step.title}</h3>
                    <p className={cx(styles.stepBody, "body")}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <figure className={styles.report}>
              <figcaption className={styles.reportHead}>
                <span className={cx(styles.reportLabel, "label")}>{method.report.label}</span>
                <span className={cx(styles.reportTitle, "title")}>{method.report.title}</span>
              </figcaption>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {method.report.columns.map((col) => (
                      <th key={col} scope="col" className="label">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {method.report.findings.map((f) => (
                    <tr key={f.title}>
                      <td>
                        <Severity level={f.level} lang={c.lang} />
                      </td>
                      <td className="small">{f.title}</td>
                      <td className={cx("label", f.remediated ? styles.remediated : styles.status)}>
                        {f.remediated ? <Icon name="check" size={14} /> : null}
                        {f.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
        </div>
      </section>

      <section id={contact.id} className={cx(styles.section, styles.contactSection)} aria-labelledby={`${contact.id}-title`}>
        <div className={cx(styles.container, styles.contact)}>
          <SectionHeader id={`${contact.id}-title`} index="02" eyebrow={contact.eyebrow} title={contact.title} lede={contact.lede} />
          <div className={styles.formCard}>
            <ContactForm copy={contact.form} lang={c.lang} />
          </div>
        </div>
      </section>
    </Shell>
  );
}
