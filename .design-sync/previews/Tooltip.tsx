import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "business-management-app";

export function IconButtonHint() {
  return (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon-sm" aria-label="Archive invoice">
          <span aria-hidden>&#128451;</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Archive invoice</TooltipContent>
    </Tooltip>
  );
}

export function DisabledActionExplanation() {
  return (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline" disabled>
          Send reminder
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Client has no email on file — add one to send reminders.
      </TooltipContent>
    </Tooltip>
  );
}
