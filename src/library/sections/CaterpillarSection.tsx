import { useState } from "react";
import { ChevronRight, Leaf, Sparkles } from "lucide-react";
import {
  msg,
  SectionConfig,
  YextComponentConfig,
  YextFields,
} from "@yext/visual-editor";
import { VisibilityWrapper } from "../shared/sectionSupport/atoms/visibilityWrapper.tsx";
import { ComponentErrorBoundary } from "@yext/visual-editor/section-library-support";
import "../shared/sectionSupport/pageSections/CaterpillarSection/caterpillarSection.css";

interface CaterpillarFact {
  label: string;
  title: string;
  description: string;
}

export interface CaterpillarSectionProps {
  /** @propCategory Data Props */
  data: {
    eyebrow: string;
    heading: string;
    introduction: string;
    badge: string;
    illustrationAlt: string;
    illustrationCaption: string;
    fieldNoteLabel: string;
    facts: CaterpillarFact[];
  };
  /** Whether the section is visible on the live page. */
  liveVisibility: boolean;
}

const caterpillarSectionFields: YextFields<CaterpillarSectionProps> = {
  data: {
    type: "object",
    label: msg("fields.data", "Data"),
    objectFields: {
      eyebrow: {
        type: "text",
        label: msg("caterpillarSection.eyebrow", "Eyebrow"),
      },
      heading: {
        type: "text",
        label: msg("caterpillarSection.heading", "Heading"),
      },
      introduction: {
        type: "text",
        label: msg("caterpillarSection.introduction", "Introduction"),
      },
      badge: {
        type: "text",
        label: msg("caterpillarSection.badge", "Badge"),
      },
      illustrationAlt: {
        type: "text",
        label: msg(
          "caterpillarSection.illustrationAlt",
          "Illustration description"
        ),
      },
      illustrationCaption: {
        type: "text",
        label: msg(
          "caterpillarSection.illustrationCaption",
          "Illustration caption"
        ),
      },
      fieldNoteLabel: {
        type: "text",
        label: msg("caterpillarSection.fieldNoteLabel", "Field note label"),
      },
      facts: {
        type: "array",
        label: msg("caterpillarSection.facts", "Discover cards"),
        min: 1,
        max: 3,
        defaultItemProps: {
          label: "Discover",
          title: "A little wonder",
          description: "Add a surprising caterpillar fact here.",
        },
        arrayFields: {
          label: {
            type: "text",
            label: msg("caterpillarSection.cardLabel", "Tab label"),
          },
          title: {
            type: "text",
            label: msg("caterpillarSection.cardTitle", "Card title"),
          },
          description: {
            type: "text",
            label: msg(
              "caterpillarSection.cardDescription",
              "Card description"
            ),
          },
        },
        getItemSummary: (item: CaterpillarFact) => item.label || item.title,
      },
    },
  },
  liveVisibility: {
    label: msg("fields.visibleOnLivePage", "Visible on Live Page"),
    type: "radio",
    options: [
      { label: msg("fields.options.show", "Show"), value: true },
      { label: msg("fields.options.hide", "Hide"), value: false },
    ],
  },
};

function CaterpillarIllustration({ alt }: { alt: string }) {
  return (
    <svg
      className="caterpillar-section__illustration"
      viewBox="0 0 640 470"
      role="img"
      aria-label={alt}
    >
      <circle cx="326" cy="227" r="202" fill="#d9edaa" />
      <circle cx="326" cy="227" r="166" fill="#e9f3cb" />
      <path
        d="M74 362c91-105 256-129 466-96-67 117-233 167-466 96Z"
        fill="#51924c"
      />
      <path
        d="M74 362c127-40 266-68 466-96"
        fill="none"
        stroke="#c7e69c"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="m207 326-29-57m87 43-16-66m79 54 2-65m53 59 28-55m-208 96-14 38m77-55-1 57m73-70 20 51m57-71 32 37"
        fill="none"
        stroke="#9dc976"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M93 361c-22 9-40 24-53 44"
        fill="none"
        stroke="#447b40"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g className="caterpillar-section__creature">
        <g fill="none" stroke="#397b38" strokeWidth="11" strokeLinecap="round">
          <path d="m185 260-9 49m24-46 4 53m70-64-8 65m27-67 11 62m60-74-1 64m29-69 14 62m50-78 7 55" />
        </g>
        <g fill="#73b853" stroke="#3e813b" strokeWidth="5">
          <ellipse
            cx="158"
            cy="228"
            rx="45"
            ry="55"
            transform="rotate(-25 158 228)"
          />
          <ellipse
            cx="212"
            cy="215"
            rx="48"
            ry="62"
            transform="rotate(-15 212 215)"
          />
          <ellipse
            cx="273"
            cy="205"
            rx="50"
            ry="68"
            transform="rotate(-6 273 205)"
          />
          <ellipse
            cx="338"
            cy="202"
            rx="51"
            ry="70"
            transform="rotate(7 338 202)"
          />
          <ellipse
            cx="401"
            cy="203"
            rx="48"
            ry="66"
            transform="rotate(16 401 203)"
          />
          <ellipse
            cx="460"
            cy="209"
            rx="51"
            ry="61"
            transform="rotate(24 460 209)"
          />
        </g>
        <g fill="#b7de75" opacity=".95">
          <ellipse
            cx="150"
            cy="196"
            rx="21"
            ry="11"
            transform="rotate(-29 150 196)"
          />
          <ellipse
            cx="202"
            cy="174"
            rx="24"
            ry="12"
            transform="rotate(-16 202 174)"
          />
          <ellipse
            cx="267"
            cy="158"
            rx="27"
            ry="13"
            transform="rotate(-6 267 158)"
          />
          <ellipse
            cx="338"
            cy="152"
            rx="28"
            ry="13"
            transform="rotate(7 338 152)"
          />
          <ellipse
            cx="404"
            cy="159"
            rx="25"
            ry="12"
            transform="rotate(15 404 159)"
          />
          <ellipse
            cx="467"
            cy="172"
            rx="24"
            ry="12"
            transform="rotate(24 467 172)"
          />
        </g>
        <g fill="#3e813b">
          <circle cx="202" cy="216" r="7" />
          <circle cx="270" cy="213" r="7" />
          <circle cx="341" cy="211" r="7" />
          <circle cx="405" cy="211" r="7" />
        </g>
        <path
          d="M451 156c-5-33 8-51 27-60m-13 61c8-32 26-43 45-44"
          fill="none"
          stroke="#397b38"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="487" cy="194" r="8" fill="#193b2b" />
        <circle cx="490" cy="191" r="2.5" fill="white" />
        <path
          d="M501 222c8 5 16 4 22-2"
          fill="none"
          stroke="#193b2b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="506" cy="212" r="10" fill="#e79a83" opacity=".75" />
      </g>
      <g fill="#f8d979">
        <circle cx="104" cy="149" r="5" />
        <circle cx="546" cy="90" r="7" />
        <circle cx="558" cy="358" r="5" />
      </g>
    </svg>
  );
}

function CaterpillarSectionContent({
  data,
}: Pick<CaterpillarSectionProps, "data">) {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = Math.min(activeIndex, data.facts.length - 1);
  const activeFact = data.facts[selectedIndex];

  return (
    <section className="caterpillar-section" aria-label={data.eyebrow}>
      <div className="caterpillar-section__inner">
        <div className="caterpillar-section__copy">
          <span className="caterpillar-section__eyebrow">
            <Leaf size={17} aria-hidden="true" />
            {data.eyebrow}
          </span>
          <h2 className="caterpillar-section__heading">{data.heading}</h2>
          <p className="caterpillar-section__intro">{data.introduction}</p>
          <div className="caterpillar-section__marker">
            <Sparkles size={19} aria-hidden="true" />
            <span>{data.badge}</span>
          </div>
        </div>
        <div className="caterpillar-section__art">
          <span className="caterpillar-section__orbit caterpillar-section__orbit--one" />
          <span className="caterpillar-section__orbit caterpillar-section__orbit--two" />
          <CaterpillarIllustration alt={data.illustrationAlt} />
          <span className="caterpillar-section__art-label">
            {data.illustrationCaption}
          </span>
        </div>
        {activeFact && (
          <div className="caterpillar-section__discover">
            <div
              className="caterpillar-section__tabs"
              role="group"
              aria-label={data.fieldNoteLabel}
            >
              {data.facts.map((fact, index) => (
                <button
                  className={`caterpillar-section__tab${index === selectedIndex ? " caterpillar-section__tab--active" : ""}`}
                  key={index}
                  type="button"
                  aria-pressed={index === selectedIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="caterpillar-section__tab-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{fact.label}</span>
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="caterpillar-section__fact" aria-live="polite">
              <span className="caterpillar-section__fact-kicker">
                {data.fieldNoteLabel}{" "}
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <h3>{activeFact.title}</h3>
              <p>{activeFact.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export const CaterpillarSection: YextComponentConfig<CaterpillarSectionProps> =
  {
    label: msg("caterpillarSection.label", "Caterpillar Field Guide"),
    fields: caterpillarSectionFields,
    defaultProps: {
      data: {
        eyebrow: "THE CATERPILLAR CHRONICLES",
        heading: "Small creature. Wild transformation.",
        introduction:
          "Meet the leaf-loving larva with a very big future. Explore the little moments behind one of nature’s most remarkable makeovers.",
        badge: "Nature’s tiny marvel",
        illustrationAlt:
          "Illustration of a green caterpillar resting on a leaf",
        illustrationCaption: "LEAF LOVER / LITTLE WONDER",
        fieldNoteLabel: "FIELD NOTE",
        facts: [
          {
            label: "Eat",
            title: "A very hungry beginning",
            description:
              "Caterpillars spend much of their larval life feeding, turning leaves into the energy they need to grow.",
          },
          {
            label: "Grow",
            title: "Outgrow the old skin",
            description:
              "As their bodies expand, many caterpillars shed their outer skin several times before they are ready for the next stage.",
          },
          {
            label: "Transform",
            title: "The grand reveal",
            description:
              "After the larval stage, they pupate. Inside, the adult butterfly or moth takes shape.",
          },
        ],
      },
      liveVisibility: true,
    },
    render: (props) => (
      <ComponentErrorBoundary
        isEditing={props.puck.isEditing}
        resetKeys={[props]}
      >
        <VisibilityWrapper
          liveVisibility={props.liveVisibility}
          isEditing={props.puck.isEditing}
        >
          <CaterpillarSectionContent data={props.data} />
        </VisibilityWrapper>
      </ComponentErrorBoundary>
    ),
  };

export const config: SectionConfig = {
  id: "CaterpillarSection",
  displayName: "Caterpillar Field Guide",
  description:
    "An illustrated, interactive field guide to caterpillars with editable facts.",
  pageSetTypes: ["ENTITY", "DIRECTORY", "LOCATOR"],
  category: "Page Sections",
};
