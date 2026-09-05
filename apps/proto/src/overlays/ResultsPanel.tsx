import { useState } from "react";
import {
  ChevronForwardIcon,
  ClockLoader40Icon,
  LibraryAddCheckIcon,
  Panel,
  Tab,
  Tabs,
} from "@pacurap/design-system";
import { PARTICIPANTS, RESULT_STATS } from "../mocks/results";
import type { Participant } from "../mocks/results";
import type { ResultsTab, TestItem } from "../types";

function scoreColor(score?: number) {
  if (score == null) return undefined;
  if (score >= 90) return "var(--color-foreground-success)";
  if (score >= 70) return "var(--color-foreground-warning)";
  return "var(--color-foreground-error)";
}

function ParticipantRow({ person }: { person: Participant }) {
  return (
    <div className="proto-results__person">
      {person.status === "done" ? (
        <LibraryAddCheckIcon size={16} />
      ) : (
        <ClockLoader40Icon size={16} />
      )}
      <div className="proto-results__person-copy">
        <p className="proto-results__name">{person.name}</p>
        <p className="proto-results__email">{person.email}</p>
        <p className="proto-results__meta">{person.meta}</p>
      </div>
      <div className="proto-results__score">
        {person.score != null ? (
          <span style={{ color: scoreColor(person.score) }}>{person.score}%</span>
        ) : null}
        <ChevronForwardIcon size={16} />
      </div>
    </div>
  );
}

export function ResultsPanel({
  test,
  onClose,
}: {
  test: TestItem;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ResultsTab>("status");

  return (
    <div
      className="ds-modal-scrim proto-results-scrim"
      style={{ zIndex: 20 }}
      onClick={onClose}
    >
      <Panel
        title="Wyniki testu"
        onClose={onClose}
        showFooter={false}
        className="proto-results"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="proto-results__subtitle">{test.title}</p>
        <Tabs>
          <Tab active={tab === "status"} onClick={() => setTab("status")}>
            Status uczestników
          </Tab>
          <Tab active={tab === "scores"} onClick={() => setTab("scores")}>
            Rozkład wyników
          </Tab>
        </Tabs>

        {tab === "status" ? (
          <>
            <div className="proto-results__chart" aria-hidden>
              <div className="proto-results__pie" />
            </div>
            <div className="proto-results__legend">
              <div>
                <span className="proto-results__swatch proto-results__swatch--done" />
                <p>Ukończono</p>
                <strong>{RESULT_STATS.done.count}</strong>
                <span>{RESULT_STATS.done.percent}%</span>
              </div>
              <div>
                <span className="proto-results__swatch proto-results__swatch--progress" />
                <p>W trakcie</p>
                <strong>{RESULT_STATS.progress.count}</strong>
                <span>{RESULT_STATS.progress.percent}%</span>
              </div>
              <div>
                <span className="proto-results__swatch proto-results__swatch--idle" />
                <p>Nie rozpoczęto</p>
                <strong>{RESULT_STATS.idle.count}</strong>
                <span>{RESULT_STATS.idle.percent}%</span>
              </div>
            </div>
          </>
        ) : (
          <div className="proto-results__legend">
            <div>
              <span className="proto-results__swatch proto-results__swatch--done" />
              <p>90–100%</p>
              <strong>2</strong>
              <span>33%</span>
            </div>
            <div>
              <span className="proto-results__swatch proto-results__swatch--progress" />
              <p>70–89%</p>
              <strong>3</strong>
              <span>50%</span>
            </div>
            <div>
              <span className="proto-results__swatch proto-results__swatch--idle" />
              <p>poniżej 70%</p>
              <strong>1</strong>
              <span>17%</span>
            </div>
          </div>
        )}

        <p className="proto-results__section">UCZESTNICY ({PARTICIPANTS.length})</p>
        <div>
          {PARTICIPANTS.map((person) => (
            <ParticipantRow key={person.email} person={person} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
