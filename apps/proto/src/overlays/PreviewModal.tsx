import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  ProgressBar,
  Radio,
  ScheduleIcon,
} from "@pacurap/design-system";
import { PREVIEW_QUESTIONS } from "../mocks/questions";
import type { TestItem } from "../types";

export function PreviewModal({
  test,
  onClose,
}: {
  test: TestItem;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const question = PREVIEW_QUESTIONS[index];
  const total = PREVIEW_QUESTIONS.length;

  return (
    <div className="ds-modal-scrim proto-preview" style={{ zIndex: 30 }}>
      <Button
        variant="secondary"
        className="proto-preview__leave"
        onClick={onClose}
      >
        Opuść podgląd
      </Button>

      <div className="proto-preview__stage">
        <div className="proto-preview__meta">
          <div className="proto-preview__timer">
            <ScheduleIcon size={16} />
            <span>59:51</span>
          </div>
          <h1 className="proto-preview__title">{test.title}</h1>
          <p className="proto-preview__subtitle">
            Test wiedzy z zakresu bezpieczeństwa i higieny pracy
          </p>
          <p className="proto-preview__count">
            Pytanie {index + 1} z {total}
          </p>
          <ProgressBar
            size="s"
            value={((index + 1) / total) * 100}
            className="proto-preview__progress"
          />
        </div>

        <Modal
          title={question.text}
          onClose={onClose}
          showFooter={false}
          style={{ width: "100%" }}
        >
          <div className="proto-preview__question">
            <div className="proto-preview__question-timer">
              <ScheduleIcon size={16} />
              <span>01:51</span>
            </div>
            <div className="proto-preview__answers">
              {question.options.map((option, optionIndex) => (
                <Card
                  key={option}
                  interactive
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [index]: optionIndex,
                    }))
                  }
                >
                  <Radio
                    name={`preview-${index}`}
                    label={option}
                    checked={answers[index] === optionIndex}
                    onChange={() =>
                      setAnswers((current) => ({
                        ...current,
                        [index]: optionIndex,
                      }))
                    }
                  />
                </Card>
              ))}
            </div>
            <div className="proto-preview__nav">
              <Button
                variant="secondary"
                disabled={index === 0}
                onClick={() => setIndex((current) => current - 1)}
              >
                Poprzednie
              </Button>
              <div className="proto-preview__dots" aria-hidden>
                {PREVIEW_QUESTIONS.map((_, dotIndex) => (
                  <span
                    key={dotIndex}
                    className={
                      dotIndex === index
                        ? "proto-preview__dot proto-preview__dot--active"
                        : "proto-preview__dot"
                    }
                  />
                ))}
              </div>
              <Button
                variant="primary"
                disabled={index === total - 1}
                onClick={() => setIndex((current) => current + 1)}
              >
                Następne
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
