# MARCELUS WebFoundry — from brief to a real website

**A portable Agent Skill + dependency-free Python engine for generating five-page websites with repeatable structural QA.**

[**Read the SKILL**](webfoundry/SKILL.md) · [**Run the generator**](webfoundry/scripts/multipage.py) · [**Explore five sector blueprints**](webfoundry/examples/studio/) · [**Run the tests**](webfoundry/tests/) · [**Release notes**](RELEASE_NOTES_v0.3.md)

**What is actually working?** A validated JSON brief → five separate HTML pages with linked navigation → shared CSS/JS → an offline report. Templates support education, hospitality, compliance, tourism, and creators/music. A source-level audit checks page structure, internal links and some safety conventions. No third-party Python package or paid API is required.

## See it for yourself

```bash
# From the root of the MARCELUS repository
cd WEBFOUNDRY/webfoundry
python3 scripts/multipage.py new \
  --blueprint examples/studio/education.json \
  --out ../../webfoundry-education-demo
python3 scripts/multipage.py audit --site ../../webfoundry-education-demo
python3 -m unittest discover -s tests -v
```

On macOS:

```bash
open ../../webfoundry-education-demo/index.html
```

**What you get:** Home, Percorsi, Metodo, Risorse, Contatti — real pages linked by navigation, with local CSS/JS. Four other examples are bundled. You can review the source, edit it and test how the generator handles invalid inputs.

## Why it is different

- **Architecture first:** MARCELUS WebFoundry defines the schema, generator, audit and quality gates.
- **Design without generic templates:** approved brand, sector requirements, memorable visual direction and clear interfaces.
- **Advisory specialist skills:** `design-taste-frontend`, `impeccable` and `apple-design` guide art direction, usability and interaction; they **do not override or execute** WebFoundry.
- **Traceable results:** 40 Python regression tests passed in the local prototype; five five-page demonstrators produced and structurally audited.
- **No fabricated capabilities:** a deterministic local site builder, not an autonomous LLM agent, hosted SaaS or WCAG certification.

## Next: MANZO AI Platform

The next iteration provides a browser UI around this same Python engine: a local form, five-page generation, preview and ZIP download, without writing shell commands. Its first local prototype is separate from the public MANZO AI Academy, which remains unchanged.

## Get involved

A **GitHub star** helps others discover this work. For reproducible bug reports or feedback on generated pages, open an [issue on MARCELUS](https://github.com/manzo8b/marcelus/issues/new) and include your Python version, the example sector and expected vs actual result. Do not include personal/client data.

**Status:** public technical demonstration. Generated content is synthetic and requires human review before publication. Full browser/device QA, copyright review, accessibility verification and deployment checks remain separate. The code's redistribution license is not yet specified; do not assume that public source availability grants a commercial reuse license. Full third-party skills or binaries are not bundled.

[**MARCELUS AI LAB portfolio**](https://manzo8b.github.io/marcelus/it/) · [**MANZO AI Academy**](https://manzo8b.github.io/manzo-ai/it/)
