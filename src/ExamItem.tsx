import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import {
  ClockLoader40Icon,
  ContentPasteSearchIcon,
  GroupIcon,
  VisibilityIcon,
} from "./icons";

export interface ExamItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  statusLabel?: ReactNode;
  examTypeLabel?: ReactNode;
  examTypeIcon?: ReactNode;
  questionCount?: ReactNode;
  finishedCount?: ReactNode;
  totalCount?: ReactNode;
  completionPercent?: ReactNode;
  publishedLabel?: ReactNode;
  publishedDate?: ReactNode;
  onPreview?: () => void;
  onMore?: () => void;
}

export const ExamItem = forwardRef<HTMLElement, ExamItemProps>(function ExamItem(
  {
    title,
    statusLabel,
    examTypeLabel = "Egzamin",
    examTypeIcon,
    questionCount,
    finishedCount,
    totalCount,
    completionPercent,
    publishedLabel = "Opublikowano",
    publishedDate,
    onPreview,
    onMore,
    className,
    ...rest
  },
  ref
) {
  const classes = ["ds-card", "ds-card--interactive", "ds-exam-item"];
  if (className) classes.push(className);

  return (
    <article ref={ref} className={classes.join(" ")} {...rest}>
      <div className="ds-exam-item__header">
        <h3 className="ds-exam-item__title">{title}</h3>
        {statusLabel ? (
          <Badge variant="success" className="ds-exam-item__status">
            {statusLabel}
          </Badge>
        ) : null}
      </div>

      <div className="ds-exam-item__body">
        <div className="ds-exam-item__type">
          {examTypeIcon ?? <ContentPasteSearchIcon />}
          <span>{examTypeLabel}</span>
          {questionCount ? (
            <span className="ds-exam-item__meta">{questionCount}</span>
          ) : null}
        </div>

        {(finishedCount || totalCount || completionPercent) && (
          <div className="ds-exam-item__stats">
            <GroupIcon />
            {finishedCount && totalCount ? (
              <span>
                {finishedCount}/{totalCount}
              </span>
            ) : null}
            <span className="ds-exam-item__meta">ukończyło</span>
            {completionPercent ? (
              <span className="ds-exam-item__percent">{completionPercent}</span>
            ) : null}
          </div>
        )}

        {publishedDate ? (
          <div className="ds-exam-item__published">
            <span className="ds-exam-item__meta">{publishedLabel}</span>
            <span>{publishedDate}</span>
          </div>
        ) : null}
      </div>

      <div className="ds-exam-item__actions">
        {onPreview ? (
          <IconButton
            variant="tertiary"
            aria-label="Podgląd"
            onClick={onPreview}
          >
            <VisibilityIcon />
          </IconButton>
        ) : null}
        {onMore ? (
          <IconButton variant="tertiary" aria-label="Więcej" onClick={onMore}>
            <ClockLoader40Icon />
          </IconButton>
        ) : null}
      </div>
    </article>
  );
});
